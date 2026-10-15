"use client";

import { useEffect, type ReactNode } from "react";
import { animate, motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { site } from "@/lib/brand";
import { cn } from "@/lib/cn";

const DOMAIN = site.domain;

/**
 * Etapa 0 · barra de URL que tipea "minthera.dev" al cargar, con un cursor
 * parpadeante. El cursor se va cuando empieza a construirse la página.
 * `slot` queda a la izquierda del texto (ahí entra el candado en la etapa 6).
 */
export function UrlBar({
  p1,
  reduced,
  slot,
  compact,
}: {
  p1: MotionValue<number>;
  reduced: boolean;
  slot?: ReactNode;
  compact?: boolean;
}) {
  // Siempre arranca en 0 (igual que en el servidor); con reduced motion se
  // completa en el primer effect, sin desajustes de hidratación.
  const count = useMotionValue(0);
  const text = useTransform(count, (n) => DOMAIN.slice(0, Math.round(n)));
  const caret = useTransform(p1, [0, 0.08], [1, 0]);

  useEffect(() => {
    if (reduced) {
      count.set(DOMAIN.length);
      return;
    }
    const controls = animate(count, DOMAIN.length, { duration: 1.1, delay: 0.9, ease: "linear" });
    return () => controls.stop();
  }, [count, reduced]);

  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2 rounded-full border border-line bg-bg/70 text-muted",
        compact ? "h-6 px-2.5 text-[0.65rem]" : "h-7 px-3 text-xs",
      )}
    >
      {slot}
      <span className="truncate font-medium tracking-wide text-fg/90">
        <motion.span>{text}</motion.span>
        <motion.span className="ml-px inline-block" style={{ opacity: caret }}>
          <span className="inline-block h-3.5 w-px translate-y-0.5 animate-blink bg-primary" />
        </motion.span>
      </span>
    </div>
  );
}
