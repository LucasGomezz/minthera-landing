"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type ClipProps = {
  src: string;
  poster?: string;
  label: string;
  className?: string;
};

/**
 * Video corto de un sitio, recortado desde arriba como las capturas. Arranca
 * solo, sin sonido y en loop; con prefers-reduced-motion queda en pausa y
 * muestra los controles para reproducirlo a mano.
 */
export function Clip({ src, poster, label, className }: ClipProps) {
  const reduced = useReducedMotion() ?? false;
  return (
    <video
      key={src}
      src={src}
      poster={poster}
      aria-label={label}
      autoPlay={!reduced}
      controls={reduced}
      muted
      loop
      playsInline
      preload="auto"
      className={cn("absolute inset-0 size-full object-cover object-top", className)}
    />
  );
}
