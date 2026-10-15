"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Menu } from "lucide-react";
import { Mark } from "@/components/brand/Mark";
import { stagger } from "../geometry";
import { PetalArt } from "../parts/PetalArt";
import { HEADLINE } from "../parts/typing";
import { cards, useAppear } from "./DesignStage";

/**
 * Tramos de la etapa 3. El marco pasa a celular, se sostiene y vuelve.
 * `toPhone` y `toDesktop` los usa también el marco del mockup.
 */
export const RESPONSIVE = {
  toPhone: [0.08, 0.38] as const,
  toDesktop: [0.66, 0.94] as const,
};

/** Inset lateral (en % del marco) cuando el mockup es un celular. */
export const PHONE_INSET = 34;

/** 0 = navegador, 1 = celular. */
export function usePhoneAmount(p3: MotionValue<number>) {
  const { toPhone, toDesktop } = RESPONSIVE;
  return useTransform(p3, [toPhone[0], toPhone[1], toDesktop[0], toDesktop[1]], [0, 1, 1, 0]);
}

/**
 * Etapa 3 · "Diseño responsive": la misma página reacomodada en una columna,
 * dentro de la franja central que queda visible cuando el marco es un celular.
 */
export function ResponsiveStage({ p3 }: { p3: MotionValue<number> }) {
  const opacity = useTransform(p3, [0.2, 0.32, 0.7, 0.82], [0, 1, 1, 0]);
  const range: [number, number] = [0.22, 0.42];
  const nav = useAppear(p3, stagger(range, 0, 5), 10);
  const art = useAppear(p3, stagger(range, 1, 5), 14);
  const title = useAppear(p3, stagger(range, 2, 5), 14);
  const cta = useAppear(p3, stagger(range, 3, 5), 14);
  const list = useAppear(p3, stagger(range, 4, 5), 18);

  return (
    <motion.div
      className="absolute inset-y-0 overflow-hidden text-fg"
      style={{ left: `${PHONE_INSET}%`, right: `${PHONE_INSET}%`, opacity }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(140%_70%_at_80%_0%,var(--color-violet-deep)_0%,transparent_65%),linear-gradient(180deg,color-mix(in_oklab,var(--color-violet-deep)_35%,var(--color-bg))_0%,var(--color-bg)_100%)]" />

      <div className="relative flex h-full flex-col gap-[2.2cqw] px-[3cqw] pt-[2.6cqw]">
        <motion.div className="flex shrink-0 items-center justify-between" style={nav}>
          <span className="flex items-center gap-[0.9cqw] text-[1.6cqw] font-medium tracking-[0.28em]">
            <Mark className="h-[2.2cqw] w-auto text-fg" />
            MINTHERA
          </span>
          <Menu className="size-[2.6cqw] text-muted" strokeWidth={1.5} />
        </motion.div>

        <motion.div className="mx-auto h-[13cqw] w-[17cqw] shrink-0" style={art}>
          <PetalArt className="h-full w-full" />
        </motion.div>

        <motion.p
          className="shrink-0 text-[3.6cqw] leading-[1.08] font-semibold tracking-[-0.03em]"
          style={title}
        >
          {HEADLINE.line1}
          <br />
          <span className="text-primary">{HEADLINE.line2}</span>
        </motion.p>

        <motion.span
          className="flex h-[4.6cqw] shrink-0 items-center justify-center gap-[0.8cqw] rounded-full bg-primary text-[1.5cqw] font-bold tracking-widest text-bg"
          style={cta}
        >
          EMPEZAR <ArrowRight className="size-[1.6cqw]" strokeWidth={2.5} />
        </motion.span>

        <motion.div className="flex shrink-0 flex-col gap-[1.4cqw]" style={list}>
          {cards.map(({ icon: Icon, title, text }) => (
            <span
              key={title}
              className="flex items-center gap-[1.6cqw] rounded-[1.4cqw] border border-line bg-surface/85 p-[1.6cqw]"
            >
              <span className="grid size-[4.4cqw] shrink-0 place-items-center rounded-[1cqw] bg-primary/12">
                <Icon className="size-[2.2cqw] text-primary" strokeWidth={1.5} />
              </span>
              <span>
                <span className="block text-[1.8cqw] font-semibold">{title}</span>
                <span className="block text-[1.4cqw] text-muted">{text}</span>
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
