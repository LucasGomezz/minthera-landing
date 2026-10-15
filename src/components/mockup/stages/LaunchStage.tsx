"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { Rocket } from "lucide-react";
import { Sparkle } from "@/components/brand/Sparkle";
import { cn } from "@/lib/cn";

/** Tramos de la etapa 7. */
const T: Record<"button" | "travel" | "click" | "burst" | "cursorOut", number[]> = {
  button: [0.04, 0.16],
  travel: [0.14, 0.44],
  click: [0.46, 0.5, 0.54],
  burst: [0.5, 0.9],
  cursorOut: [0.7, 0.82],
};

/**
 * Botón "Publicar" en la barra del navegador. Después del click pasa a
 * "En línea" con un punto lima.
 */
export function PublishButton({ p7, compact }: { p7: MotionValue<number>; compact?: boolean }) {
  const opacity = useTransform(p7, T.button, [0, 1]);
  const x = useTransform(p7, T.button, [8, 0]);
  const scale = useTransform(p7, [...T.click], [1, 0.9, 1]);
  const before = useTransform(p7, [0.5, 0.56], [1, 0]);
  const after = useTransform(p7, [0.52, 0.6], [0, 1]);

  return (
    <motion.span
      className={cn(
        "relative grid shrink-0 place-items-center rounded-full bg-primary font-bold tracking-wider text-bg",
        compact ? "h-6 px-2.5 text-[0.6rem]" : "h-7 px-3 text-[0.7rem]",
      )}
      style={{ opacity, x, scale }}
    >
      <motion.span className="col-start-1 row-start-1 flex items-center gap-1.5" style={{ opacity: before }}>
        <Rocket className="size-3" strokeWidth={2.25} />
        PUBLICAR
      </motion.span>
      <motion.span
        className="col-start-1 row-start-1 flex items-center gap-1.5"
        style={{ opacity: after }}
      >
        <span className="size-1.5 rounded-full bg-lime shadow-[0_0_6px_var(--color-lime)]" />
        EN LÍNEA
      </motion.span>
    </motion.span>
  );
}

/** Pseudo-aleatorio determinístico (igual en servidor y cliente). */
const rand = (i: number, salt: number) => {
  const s = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

const PARTICLES = Array.from({ length: 34 }, (_, i) => {
  // El botón está arriba a la derecha: el confeti sale hacia abajo y la izquierda.
  const angle = (100 + rand(i, 1) * 150) * (Math.PI / 180);
  const distance = 90 + rand(i, 2) * 190;
  const color =
    i % 9 === 0 ? "var(--color-lime)" : i % 3 === 0 ? "var(--color-fg)" : i % 2 ? "var(--color-primary)" : "var(--color-violet)";
  return {
    dx: Math.cos(angle) * distance,
    dy: -Math.sin(angle) * distance,
    spin: (rand(i, 3) - 0.5) * 540,
    size: 4 + rand(i, 4) * 5,
    star: i % 5 === 0,
    delay: rand(i, 5) * 0.06,
    color,
  };
});

function Particle({ p, particle }: { p: MotionValue<number>; particle: (typeof PARTICLES)[number] }) {
  const [a, b] = [T.burst[0] + particle.delay, T.burst[1]];
  const t = useTransform(p, [a, b], [0, 1]);
  const x = useTransform(t, (v) => particle.dx * (1 - (1 - v) ** 3));
  const y = useTransform(t, (v) => particle.dy * (1 - (1 - v) ** 3) + 120 * v * v);
  const rotate = useTransform(t, (v) => particle.spin * v);
  const opacity = useTransform(t, [0, 0.05, 0.7, 1], [0, 1, 1, 0]);
  const style = { x, y, rotate, opacity, width: particle.size, height: particle.size };

  return particle.star ? (
    <motion.span className="absolute -mt-1 -ml-1" style={{ ...style, color: particle.color }}>
      <Sparkle className="h-full w-full" />
    </motion.span>
  ) : (
    <motion.span
      className="absolute -mt-0.5 -ml-0.5 rounded-[1px]"
      style={{ ...style, height: particle.size * 0.45, backgroundColor: particle.color }}
    />
  );
}

/**
 * Etapa 7 · "Soporte y lanzamiento": un cursor viaja hasta "Publicar", hace
 * click y sale un destello de confeti. Ocupa todo el marco del mockup; el
 * punto de anclaje coincide con el botón de la barra superior.
 */
/** Centro del botón Publicar respecto del borde superior derecho del marco (px). */
export const PUBLISH_ANCHOR = {
  regular: { top: 26, right: 60 },
  compact: { top: 20, right: 50 },
};

export function LaunchOverlay({ p7, compact }: { p7: MotionValue<number>; compact?: boolean }) {
  const anchor = compact ? PUBLISH_ANCHOR.compact : PUBLISH_ANCHOR.regular;
  // El contenedor mide lo mismo que el marco: x/y en % recorren el marco.
  const x = useTransform(p7, T.travel, ["-46%", "0%"]);
  const y = useTransform(p7, T.travel, ["62%", "0%"]);
  const cursorOpacity = useTransform(
    p7,
    [T.travel[0], T.travel[0] + 0.04, T.cursorOut[0], T.cursorOut[1]],
    [0, 1, 1, 0],
  );
  const press = useTransform(p7, [...T.click], [1, 0.82, 1]);
  const ring = useTransform(p7, [0.48, 0.66], [0, 1]);
  const ringScale = useTransform(ring, [0, 1], [0.3, 2.6]);
  const ringOpacity = useTransform(ring, [0, 0.2, 1], [0, 0.8, 0]);
  const flash = useTransform(p7, [0.49, 0.55, 0.75], [0, 0.55, 0]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible">
      {/* Ancla = centro del botón Publicar (barra superior, a la derecha) */}
      <div className="absolute" style={anchor}>
        <motion.span
          className="absolute -top-16 -left-16 size-32 rounded-full bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_65%)]"
          style={{ opacity: flash }}
        />
        <motion.span
          className="absolute -top-5 -left-5 size-10 rounded-full border-2 border-primary"
          style={{ scale: ringScale, opacity: ringOpacity }}
        />
        {PARTICLES.map((particle, i) => (
          <Particle key={i} p={p7} particle={particle} />
        ))}
      </div>

      <motion.div className="absolute inset-0" style={{ x, y, opacity: cursorOpacity }}>
        <motion.svg
          viewBox="0 0 24 24"
          className="absolute size-6 origin-top-left translate-x-[calc(100%-6px)] -translate-y-[3px] drop-shadow-[0_4px_8px_rgb(0_0_0/0.5)]"
          style={{ ...anchor, scale: press }}
        >
          <path
            d="M5 3l14 7.5-6.2 1.6L10 18.5 5 3z"
            fill="var(--color-fg)"
            stroke="var(--color-bg)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
