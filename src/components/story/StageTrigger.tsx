"use client";

import { useRef, type ReactNode } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { DESKTOP_QUERY, useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";
import { REDUCED_SNAPSHOT, useStory } from "./StoryProvider";

type StageTriggerProps = {
  index: number;
  children: ReactNode;
  className?: string;
};

/**
 * Envuelve una sección del relato y publica su progreso de scroll en el
 * StoryProvider. La etapa avanza de 0 a 1 mientras la sección cruza el centro
 * de la pantalla, así que el mockup se construye en continuo y queda completo
 * cuando arranca la sección siguiente.
 */
export function StageTrigger({ index, children, className }: StageTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { progress, reduced } = useStory();
  // En mobile el mockup ocupa el tercio superior: la "línea de lectura" baja
  // al centro del área visible que queda debajo.
  const desktop = useMediaQuery(DESKTOP_QUERY, true);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: desktop ? ["start center", "end center"] : ["start 68%", "end 68%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduced) progress[index].set(v);
    else progress[index].set(v <= 0 ? 0 : v >= 1 ? 1 : REDUCED_SNAPSHOT[index]);
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      {children}
    </div>
  );
}
