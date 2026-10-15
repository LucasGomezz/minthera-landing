"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { G, VIEW, stagger, type Box } from "../geometry";

type DrawProps = {
  p: MotionValue<number>;
  range: [number, number];
};

/** Rectángulo que se dibuja con stroke y después se rellena apenas. */
function DrawBox({ b, p, range, rx = 4 }: DrawProps & { b: Box; rx?: number }) {
  const pathLength = useTransform(p, range, [0, 1]);
  const opacity = useTransform(p, [range[0], range[0] + 0.01], [0, 1]);
  const fillOpacity = useTransform(p, [range[1] - 0.05, range[1] + 0.1], [0, 0.08]);
  return (
    <motion.rect
      x={b.x}
      y={b.y}
      width={b.w}
      height={b.h}
      rx={rx}
      fill="var(--color-muted)"
      stroke="var(--color-muted)"
      strokeWidth={1}
      style={{ pathLength, opacity, fillOpacity }}
    />
  );
}

function DrawLine({
  p,
  range,
  d,
  className,
}: DrawProps & { d: string; className?: string }) {
  const pathLength = useTransform(p, range, [0, 1]);
  const opacity = useTransform(p, [range[0], range[0] + 0.01], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      className={className}
      style={{ pathLength, opacity }}
    />
  );
}

const COLS = 12;
const guideXs = Array.from({ length: COLS + 1 }, (_, i) => 40 + (i * 560) / COLS);
const guideYs = [16, 50, 70, 236, 260, 376];

/**
 * Etapa 1 · "Sitios web a medida": grilla de líneas guía y bloques de
 * wireframe dibujándose. En la etapa 2 se desvanece mientras entra el diseño.
 */
export function WireframeStage({
  p1,
  p2,
}: {
  p1: MotionValue<number>;
  p2: MotionValue<number>;
}) {
  const opacity = useTransform(p2, [0.05, 0.45], [1, 0]);
  const art = G.heroArt;

  return (
    <motion.svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      className="absolute inset-0 h-full w-full"
      style={{ opacity }}
    >
      {/* Líneas guía */}
      <g stroke="var(--color-line)" strokeWidth={1}>
        {guideXs.map((x, i) => (
          <DrawLine
            key={`x${x}`}
            p={p1}
            range={stagger([0, 0.3], i, guideXs.length, 0.85)}
            d={`M${x} 0V${VIEW.h}`}
          />
        ))}
        {guideYs.map((y, i) => (
          <DrawLine
            key={`y${y}`}
            p={p1}
            range={stagger([0.05, 0.32], i, guideYs.length, 0.7)}
            d={`M0 ${y}H${VIEW.w}`}
          />
        ))}
      </g>

      {/* Header */}
      <DrawBox b={G.nav} p={p1} range={[0.15, 0.35]} rx={8} />
      <DrawBox b={G.navLogo} p={p1} range={[0.25, 0.38]} rx={3} />
      {G.navLinks.map((b, i) => (
        <DrawBox key={b.x} b={b} p={p1} range={stagger([0.28, 0.42], i, 3)} rx={3} />
      ))}
      <DrawBox b={G.navCta} p={p1} range={[0.36, 0.46]} rx={10} />

      {/* Hero */}
      {G.heroTitle.map((b, i) => (
        <DrawBox key={b.y} b={b} p={p1} range={stagger([0.35, 0.55], i, 2)} />
      ))}
      {G.heroText.map((b, i) => (
        <DrawBox key={b.y} b={b} p={p1} range={stagger([0.48, 0.62], i, 2)} rx={3} />
      ))}
      <DrawBox b={G.heroBtn} p={p1} range={[0.55, 0.66]} rx={14} />
      <DrawBox b={art} p={p1} range={[0.4, 0.65]} rx={10} />
      <g stroke="var(--color-muted)" strokeOpacity={0.5} strokeWidth={1}>
        <DrawLine
          p={p1}
          range={[0.58, 0.72]}
          d={`M${art.x} ${art.y}L${art.x + art.w} ${art.y + art.h}`}
        />
        <DrawLine
          p={p1}
          range={[0.62, 0.76]}
          d={`M${art.x + art.w} ${art.y}L${art.x} ${art.y + art.h}`}
        />
      </g>

      {/* Cards */}
      {G.cards.map((b, i) => (
        <DrawBox key={b.x} b={b} p={p1} range={stagger([0.62, 0.95], i, 3)} rx={10} />
      ))}
    </motion.svg>
  );
}
