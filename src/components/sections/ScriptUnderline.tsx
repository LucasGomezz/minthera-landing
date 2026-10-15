"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/** Subrayado manuscrito lima que se dibuja al entrar en pantalla. */
export function ScriptUnderline({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();
  const drawn = inView || reduced;

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 300 20"
      preserveAspectRatio="none"
      fill="none"
      className={className}
    >
      <motion.path
        d="M4 14C60 6 128 4 200 7c34 1.5 66 4 94 7"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        animate={drawn ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{
          pathLength: { duration: 1.1, delay: 0.5, ease: [0.65, 0, 0.35, 1] },
          opacity: { duration: 0.01, delay: 0.5 },
        }}
      />
    </svg>
  );
}
