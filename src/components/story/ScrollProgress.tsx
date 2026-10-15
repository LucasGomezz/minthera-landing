"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { Sparkle } from "@/components/brand/Sparkle";
import { cn } from "@/lib/cn";
import { STAGE_COUNT, useStory } from "./StoryProvider";

type ScrollProgressProps = {
  className?: string;
  /** Vertical entre columnas (desktop) u horizontal debajo del mockup (mobile). */
  orientation?: "vertical" | "horizontal";
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Línea fina que se llena con el progreso global; una ✦ lima marca por dónde
 * va la construcción. Decorativa.
 */
export function ScrollProgress({ className, orientation = "vertical" }: ScrollProgressProps) {
  const { overall, active, reduced } = useStory();
  const smooth = useSpring(overall, { stiffness: 220, damping: 32, mass: 0.4 });
  const value = reduced ? overall : smooth;
  const vertical = orientation === "vertical";
  // El contenedor de la ✦ mide lo mismo que la pista: translate(%) = recorrido.
  const offset = useTransform(value, (v) => `${v * 100}%`);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center gap-3",
        vertical ? "flex-col" : "w-full",
        className,
      )}
    >
      <div className={cn("relative", vertical ? "h-[56svh] w-px" : "h-px flex-1")}>
        <div className="absolute inset-0 bg-line" />
        <motion.div
          className={cn(
            "absolute inset-0 from-primary/30 to-primary",
            vertical ? "origin-top bg-linear-to-b" : "origin-left bg-linear-to-r",
          )}
          style={vertical ? { scaleY: value } : { scaleX: value }}
        />

        {Array.from({ length: STAGE_COUNT }, (_, i) => {
          const at = `${(i / (STAGE_COUNT - 1)) * 100}%`;
          return (
            <span
              key={i}
              className={cn(
                "absolute size-1.5 -translate-1/2 rounded-full transition-colors duration-500",
                vertical ? "left-1/2" : "top-1/2",
                i <= active ? "bg-primary" : "bg-line",
              )}
              style={vertical ? { top: at } : { left: at }}
            />
          );
        })}

        <motion.div
          className="absolute inset-0"
          style={vertical ? { y: offset } : { x: offset }}
        >
          <Sparkle
            className={cn(
              "absolute size-4 -translate-1/2 text-lime drop-shadow-[0_0_8px_var(--color-lime)]",
              vertical ? "top-0 left-1/2" : "top-1/2 left-0",
            )}
          />
        </motion.div>
      </div>

      {!vertical && (
        <span className="w-12 text-right text-[0.65rem] font-semibold tracking-[0.2em] text-muted tabular-nums">
          <span className="text-primary">{pad(active)}</span>/{pad(STAGE_COUNT - 1)}
        </span>
      )}
    </div>
  );
}
