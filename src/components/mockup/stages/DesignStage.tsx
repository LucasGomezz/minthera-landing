"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Code2, LifeBuoy, PenTool } from "lucide-react";
import { Mark } from "@/components/brand/Mark";
import { cn } from "@/lib/cn";
import { G, boxStyle, stagger } from "../geometry";
import { PetalArt } from "../parts/PetalArt";
import { CMS_EDIT, useHeadline } from "../parts/typing";

export const cards = [
  { icon: PenTool, title: "Diseño", text: "Interfaces con identidad" },
  { icon: Code2, title: "Desarrollo", text: "Rápido y a medida" },
  { icon: LifeBuoy, title: "Soporte", text: "Siempre cerca" },
];

/** Aparición genérica atada a un tramo del progreso. */
export function useAppear(p: MotionValue<number>, [a, b]: [number, number], dy = 8) {
  const opacity = useTransform(p, [a, b], [0, 1]);
  const y = useTransform(p, [a, b], [dy, 0]);
  return { opacity, y };
}

function Card({
  p,
  index,
  alive,
}: {
  p: MotionValue<number>;
  index: number;
  alive: boolean;
}) {
  const style = useAppear(p, stagger([0.62, 0.95], index, 3), 12);
  const { icon: Icon, title, text } = cards[index];
  return (
    <motion.div className="absolute" style={{ ...boxStyle(G.cards[index]), ...style }}>
      <div
        className={cn(
          "flex h-full flex-col justify-between rounded-[1.6cqw] border border-line bg-surface/85 p-[2.4cqw]",
          "transition-[transform,border-color] duration-500 ease-out-expo",
          alive && "hover:translate-y-[-0.8cqw] hover:border-primary/50",
        )}
      >
        <span className="grid size-[5.6cqw] place-items-center rounded-[1.2cqw] bg-primary/12">
          <Icon className="size-[2.8cqw] text-primary" strokeWidth={1.5} />
        </span>
        <span>
          <span className="block text-[2.2cqw] font-semibold text-fg">{title}</span>
          <span className="mt-[0.6cqw] block text-[1.6cqw] text-muted">{text}</span>
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Etapa 2 · "Diseño": el wireframe se reemplaza por contenido real.
 * El fondo se tiñe de violeta, el titular se escribe letra a letra y entran
 * el botón lavanda, el pétalo y las cards. En la etapa 5 el CMS reescribe el
 * titular en vivo y en la 7 la página queda "viva".
 */
export function DesignStage({
  p2,
  p5,
  alive,
}: {
  p2: MotionValue<number>;
  p5: MotionValue<number>;
  /** Página terminada (etapa 7): activa micro-animaciones */
  alive: boolean;
}) {
  const tint = useTransform(p2, [0.1, 0.55], [0, 1]);
  const nav = useAppear(p2, [0.12, 0.32], 6);

  const { line1, line2 } = useHeadline(p2, p5);
  // Caret visible mientras se tipea (etapa 2) y mientras edita el CMS (etapa 5)
  const caret = useTransform(() => {
    const v2 = p2.get();
    const v5 = p5.get();
    if (v5 > CMS_EDIT.erase[0] - 0.02 && v5 < CMS_EDIT.type[1] + 0.02) return 1;
    return v2 > 0.17 && v2 < 0.61 ? 1 : 0;
  });
  // Recuadro de "editando" sobre el titular durante la etapa 5
  const editing = useTransform(p5, [0.34, 0.4, 0.8, 0.86], [0, 1, 1, 0]);

  const text = useAppear(p2, [0.5, 0.68]);
  const buttonOpacity = useTransform(p2, [0.55, 0.72], [0, 1]);
  const buttonScale = useTransform(p2, [0.55, 0.72], [0.85, 1]);
  const artOpacity = useTransform(p2, [0.35, 0.75], [0, 1]);
  const artScale = useTransform(p2, [0.35, 0.8], [0.7, 1]);
  const artRotate = useTransform(p2, [0.35, 0.8], [-18, 0]);

  const title = G.heroTitle[0];

  return (
    <div className="absolute inset-0 text-fg">
      {/* Tinte violeta del fondo */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_10%,var(--color-violet-deep)_0%,transparent_60%),linear-gradient(180deg,color-mix(in_oklab,var(--color-violet-deep)_35%,var(--color-bg))_0%,var(--color-bg)_100%)]"
        style={{ opacity: tint }}
      />

      {/* Nav */}
      <motion.div
        className="absolute flex items-center rounded-[1.4cqw] border border-line/70 bg-bg/40 px-[2.2cqw]"
        style={{ ...boxStyle(G.nav), ...nav }}
      >
        <span className="flex items-center gap-[1cqw] text-[1.7cqw] font-medium tracking-[0.3em]">
          <Mark className="h-[2.4cqw] w-auto text-fg" />
          MINTHERA
        </span>
        <span className="ml-auto flex items-center gap-[3cqw] text-[1.5cqw] text-muted">
          <span>Servicios</span>
          <span>Proyectos</span>
          <span>Contacto</span>
          <span className="rounded-full bg-primary px-[1.6cqw] py-[0.6cqw] font-semibold text-bg">
            Hablemos
          </span>
        </span>
      </motion.div>

      {/* Titular tipeado (y editable por el CMS) */}
      <div
        className="absolute text-[4.6cqw] leading-[1.08] font-semibold tracking-[-0.03em]"
        style={{ left: boxStyle(title).left, top: boxStyle(title).top }}
      >
        <motion.span
          className="absolute inset-x-[-1.4cqw] inset-y-[-1cqw] rounded-[1cqw] border border-dashed border-primary/70 bg-primary/5"
          style={{ opacity: editing }}
        />
        <motion.span className="relative block whitespace-pre">{line1}</motion.span>
        <span className="relative block whitespace-pre text-primary">
          <motion.span>{line2}</motion.span>
          <motion.span className="ml-[0.3cqw] inline-block" style={{ opacity: caret }}>
            <span className="inline-block h-[0.9em] w-[0.35cqw] translate-y-[0.12em] animate-blink bg-primary" />
          </motion.span>
        </span>
      </div>

      {/* Bajada */}
      <motion.p
        className="absolute text-[1.75cqw] leading-[1.45] text-muted"
        style={{ ...boxStyle({ ...G.heroText[0], h: 30 }), ...text }}
      >
        Sitios a medida, rápidos y fáciles de gestionar.
      </motion.p>

      {/* Botón lavanda */}
      <motion.span
        className="absolute flex origin-left items-center justify-center gap-[0.8cqw] overflow-hidden rounded-full bg-primary text-[1.7cqw] font-bold tracking-widest text-bg"
        style={{ ...boxStyle(G.heroBtn), opacity: buttonOpacity, scale: buttonScale }}
      >
        EMPEZAR
        <ArrowRight className="size-[1.8cqw]" strokeWidth={2.5} />
        {alive && (
          <span className="absolute inset-y-0 -left-1/2 w-1/3 animate-shine bg-linear-to-r from-transparent via-fg/45 to-transparent" />
        )}
      </motion.span>

      {/* Pétalo */}
      <motion.div
        className="absolute"
        style={{
          ...boxStyle(G.heroArt),
          opacity: artOpacity,
          scale: artScale,
          rotate: artRotate,
        }}
      >
        <PetalArt className={cn("h-full w-full", alive && "animate-float")} />
      </motion.div>

      {cards.map((card, i) => (
        <Card key={card.title} p={p2} index={i} alive={alive} />
      ))}
    </div>
  );
}
