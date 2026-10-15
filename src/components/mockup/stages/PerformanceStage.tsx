"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { Globe, Lock } from "lucide-react";

const COUNT = [0.25, 0.75];

/** Ícono a la izquierda de la URL: globo neutro → candado lima en la etapa 6. */
export function UrlSecurityIcon({ p6 }: { p6: MotionValue<number> }) {
  const lock = useTransform(p6, [0.05, 0.2], [0, 1]);
  const lockScale = useTransform(p6, [0.05, 0.14, 0.2], [0.4, 1.25, 1]);
  const globe = useTransform(lock, (v) => 1 - v);
  return (
    <span className="relative grid size-3.5 shrink-0 place-items-center">
      <motion.span className="absolute inset-0" style={{ opacity: globe }}>
        <Globe className="size-3.5 text-muted" strokeWidth={1.75} />
      </motion.span>
      <motion.span className="absolute inset-0" style={{ opacity: lock, scale: lockScale }}>
        <Lock className="size-3.5 text-lime" strokeWidth={2} />
      </motion.span>
    </span>
  );
}

const METRICS = [
  { label: "Carga", value: "0.8 s" },
  { label: "SEO", value: "100" },
  { label: "SSL", value: "Activo" },
];

/**
 * Etapa 6 · "Seguridad y rendimiento": indicador circular de performance que
 * cuenta de 0 a 100 en lima. Se va al arrancar la etapa 7.
 */
export function PerformanceStage({
  p6,
  p7,
}: {
  p6: MotionValue<number>;
  p7: MotionValue<number>;
}) {
  const enter = useTransform(p6, [0.1, 0.25], [0, 1]);
  const leave = useTransform(p7, [0, 0.14], [1, 0]);
  const opacity = useTransform(() => enter.get() * leave.get());
  const scale = useTransform(p6, [0.1, 0.25], [0.85, 1]);
  const ring = useTransform(p6, COUNT, [0, 1]);
  const score = useTransform(p6, COUNT, [0, 100]);
  const label = useTransform(score, (v) => String(Math.round(v)));
  const metrics = useTransform(p6, [0.7, 0.85], [0, 1]);

  return (
    <motion.div
      className="absolute top-[16%] right-[5%] flex w-[36%] flex-col items-center rounded-[2cqw] border border-line bg-bg/95 px-[2.4cqw] pt-[2.6cqw] pb-[2cqw] text-fg shadow-2xl shadow-black/50"
      style={{ opacity, scale }}
    >
      <span className="relative grid size-[15cqw] place-items-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--color-line)" strokeWidth="6" />
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="var(--color-lime)"
            strokeWidth="6"
            strokeLinecap="round"
            style={{ pathLength: ring }}
          />
        </svg>
        <motion.span className="text-[4.6cqw] font-bold tracking-[-0.03em] text-lime tabular-nums">
          {label}
        </motion.span>
      </span>
      <span className="mt-[1.4cqw] text-[1.25cqw] font-semibold tracking-[0.3em] text-muted">
        PERFORMANCE
      </span>
      <motion.span
        className="mt-[1.6cqw] grid w-full grid-cols-3 gap-[1cqw] border-t border-line pt-[1.4cqw] text-center"
        style={{ opacity: metrics }}
      >
        {METRICS.map((m) => (
          <span key={m.label}>
            <span className="block text-[1.5cqw] font-semibold">{m.value}</span>
            <span className="block text-[1.1cqw] text-muted">{m.label}</span>
          </span>
        ))}
      </motion.span>
    </motion.div>
  );
}
