"use client";

import type { ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/cn";

type BuildStageProps = {
  /** Progreso de la etapa que hace aparecer esta capa. */
  progress: MotionValue<number>;
  children: ReactNode;
  className?: string;
};

/**
 * Capa del viewport del mockup asociada a una etapa. Mientras la etapa no
 * empezó queda con `visibility: hidden`, así el navegador no pinta capas que
 * todavía no se ven (cada etapa anima su propio contenido por dentro).
 */
export function BuildStage({ progress, children, className }: BuildStageProps) {
  const visibility = useTransform(progress, (v) => (v > 0 ? "visible" : "hidden"));
  return (
    <motion.div className={cn("absolute inset-0", className)} style={{ visibility }}>
      {children}
    </motion.div>
  );
}
