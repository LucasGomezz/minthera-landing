"use client";

import { useTransform, type MotionValue } from "motion/react";

export const HEADLINE = {
  line1: "Tu idea,",
  line2: "hecha web.",
  /** Texto que el CMS escribe en la etapa 5 */
  edited: "hecha realidad.",
} as const;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const segment = (v: number, [a, b]: readonly [number, number]) => clamp01((v - a) / (b - a));

/** Texto que se escribe letra a letra durante un tramo del progreso. */
export function useTyped(p: MotionValue<number>, range: readonly [number, number], text: string) {
  return useTransform(p, (v) => text.slice(0, Math.round(segment(v, range) * text.length)));
}

/** Tramos de la etapa 5 (CMS): borrar el texto viejo y escribir el nuevo. */
export const CMS_EDIT = {
  erase: [0.4, 0.52] as const,
  type: [0.54, 0.74] as const,
};

/** Segunda línea del titular en el estado de la etapa 5. */
export function cmsLine(v5: number) {
  if (v5 < CMS_EDIT.erase[0]) return HEADLINE.line2;
  if (v5 < CMS_EDIT.type[0]) {
    const keep = Math.round((1 - segment(v5, CMS_EDIT.erase)) * HEADLINE.line2.length);
    return HEADLINE.line2.slice(0, keep);
  }
  return HEADLINE.edited.slice(0, Math.round(segment(v5, CMS_EDIT.type) * HEADLINE.edited.length));
}

/**
 * Titular del mini sitio: se tipea en la etapa 2 y el CMS lo reescribe en la
 * etapa 5. Devuelve ambas líneas como MotionValues (sin re-renders).
 */
export function useHeadline(p2: MotionValue<number>, p5: MotionValue<number>) {
  const total = HEADLINE.line1.length + HEADLINE.line2.length;
  const typedRange = [0.18, 0.6] as const;

  const line1 = useTransform(p2, (v) =>
    HEADLINE.line1.slice(0, Math.round(segment(v, typedRange) * total)),
  );
  const line2 = useTransform(() => {
    const v5 = p5.get();
    if (v5 > 0) return cmsLine(v5);
    const n = Math.round(segment(p2.get(), typedRange) * total);
    return HEADLINE.line2.slice(0, Math.max(0, n - HEADLINE.line1.length));
  });

  return { line1, line2 };
}
