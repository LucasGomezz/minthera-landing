"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { motionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { stages } from "@/content/site";

/** Etapa 0 = hero; 1..7 = servicios. */
export const STAGE_COUNT = stages.length + 1;

/**
 * Con prefers-reduced-motion cada etapa salta directo a un estado terminado.
 * Para la mayoría es 1; en la 3 (que vuelve a desktop) y la 5 (cuyo panel se
 * retira) se muestra el fotograma que mejor la representa mientras está activa.
 */
export const REDUCED_SNAPSHOT = [1, 1, 1, 0.5, 1, 0.86, 1, 1];

type StoryContextValue = {
  /** Progreso 0→1 de cada etapa, continuo y atado al scroll. */
  progress: MotionValue<number>[];
  /** Progreso global 0→1 de las etapas 1..7 (para la barra lateral). */
  overall: MotionValue<number>;
  /** Etapa activa (discreta) para lo que cambia por pasos. */
  active: number;
  /** prefers-reduced-motion: las etapas se muestran terminadas, sin transición. */
  reduced: boolean;
};

const StoryContext = createContext<StoryContextValue | null>(null);

export function StoryProvider({ children }: { children: ReactNode }) {
  const [progress] = useState(() =>
    Array.from({ length: STAGE_COUNT }, () => motionValue(0)),
  );
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion() ?? false;

  const overall = useTransform(progress.slice(1), (values: number[]) =>
    values.reduce((sum, v) => sum + v, 0) / (STAGE_COUNT - 1),
  );

  // La etapa activa es la última que empezó a construirse.
  useEffect(() => {
    const recompute = () => {
      let current = 0;
      progress.forEach((p, i) => {
        if (p.get() > 0) current = i;
      });
      setActive(current);
    };
    const unsubscribers = progress.map((p) => p.on("change", recompute));
    recompute();
    return () => unsubscribers.forEach((off) => off());
  }, [progress]);

  return (
    <StoryContext.Provider value={{ progress, overall, active, reduced }}>
      {children}
    </StoryContext.Provider>
  );
}

export function useStory() {
  const ctx = useContext(StoryContext);
  if (!ctx) throw new Error("useStory debe usarse dentro de <StoryProvider>");
  return ctx;
}

/** Progreso 0→1 de una etapa puntual. */
export function useStageProgress(index: number) {
  return useStory().progress[index];
}
