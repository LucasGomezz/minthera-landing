"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { Check, FileText, Image as ImageIcon, LayoutGrid, PenLine } from "lucide-react";
import { CMS_EDIT, HEADLINE, cmsLine } from "../parts/typing";

/** Tramos de la etapa 5. */
export const CMS = {
  scrollBack: [0, 0.16] as const,
  slideIn: [0.12, 0.32] as const,
  slideOut: [0.9, 1] as const,
};

const NAV = [
  { icon: FileText, label: "Páginas", active: true },
  { icon: ImageIcon, label: "Medios" },
  { icon: LayoutGrid, label: "Productos" },
];

/**
 * Etapa 5 · "Gestión de contenidos": un panel tipo CMS entra desde la derecha,
 * se edita el titular y el cambio se ve en vivo en la página (DesignStage lee
 * el mismo texto vía `useHeadline`).
 */
export function CmsStage({ p5 }: { p5: MotionValue<number> }) {
  const x = useTransform(
    p5,
    [CMS.slideIn[0], CMS.slideIn[1], CMS.slideOut[0], CMS.slideOut[1]],
    ["105%", "0%", "0%", "105%"],
  );
  const value = useTransform(p5, cmsLine);
  const focus = useTransform(p5, [0.34, 0.38, 0.78, 0.82], [0, 1, 1, 0]);
  const caret = useTransform(p5, (v) =>
    v > CMS_EDIT.erase[0] - 0.02 && v < CMS_EDIT.type[1] + 0.02 ? 1 : 0,
  );
  const saved = useTransform(p5, [0.8, 0.86], [0, 1]);
  const savedScale = useTransform(p5, [0.8, 0.86], [0.6, 1]);

  return (
    <motion.aside
      className="absolute inset-y-0 right-0 flex w-[38%] flex-col border-l border-line bg-surface text-fg shadow-[-24px_0_48px_-24px_rgb(0_0_0/0.6)]"
      style={{ x }}
    >
      <div className="flex items-center gap-[1cqw] border-b border-line px-[2cqw] py-[1.6cqw] text-[1.5cqw] font-semibold">
        <PenLine className="size-[1.8cqw] text-primary" strokeWidth={1.75} />
        Editor
        <span className="ml-auto rounded-full bg-bg/70 px-[1cqw] py-[0.3cqw] text-[1.15cqw] font-normal text-muted">
          Inicio
        </span>
      </div>

      <div className="flex flex-1 gap-[1.6cqw] p-[2cqw]">
        <ul className="flex flex-col gap-[1cqw] text-[1.2cqw] text-muted">
          {NAV.map(({ icon: Icon, label, active }) => (
            <li
              key={label}
              className={
                active
                  ? "flex items-center gap-[0.6cqw] rounded-[0.6cqw] bg-primary/12 px-[0.8cqw] py-[0.5cqw] text-primary"
                  : "flex items-center gap-[0.6cqw] px-[0.8cqw] py-[0.5cqw]"
              }
            >
              <Icon className="size-[1.4cqw]" strokeWidth={1.75} />
              {label}
            </li>
          ))}
        </ul>

        <div className="flex min-w-0 flex-1 flex-col gap-[1.4cqw]">
          <span className="block">
            <span className="block text-[1.15cqw] text-muted">Título · línea 1</span>
            <span className="mt-[0.5cqw] flex h-[3.6cqw] items-center rounded-[0.8cqw] border border-line bg-bg/60 px-[1cqw] text-[1.35cqw]">
              {HEADLINE.line1}
            </span>
          </span>
          <span className="block">
            <span className="block text-[1.15cqw] text-muted">Título · línea 2</span>
            <span className="relative mt-[0.5cqw] flex h-[3.6cqw] items-center rounded-[0.8cqw] border border-line bg-bg/60 px-[1cqw] text-[1.35cqw]">
              <motion.span
                className="absolute -inset-px rounded-[0.8cqw] border border-primary"
                style={{ opacity: focus }}
              />
              <motion.span className="whitespace-pre">{value}</motion.span>
              <motion.span className="ml-px inline-block" style={{ opacity: caret }}>
                <span className="inline-block h-[1.6cqw] w-[0.2cqw] translate-y-[0.2cqw] animate-blink bg-primary" />
              </motion.span>
            </span>
          </span>
          <span className="block">
            <span className="block text-[1.15cqw] text-muted">Imagen destacada</span>
            <span className="mt-[0.5cqw] block h-[6cqw] rounded-[0.8cqw] border border-dashed border-line bg-[radial-gradient(circle_at_40%_40%,color-mix(in_oklab,var(--color-violet)_45%,transparent),transparent_70%)]" />
          </span>

          <span className="mt-auto flex items-center justify-between">
            <motion.span
              className="flex items-center gap-[0.5cqw] text-[1.2cqw] text-muted"
              style={{ opacity: saved, scale: savedScale }}
            >
              <Check className="size-[1.5cqw] text-lime" strokeWidth={2.5} />
              Guardado
            </motion.span>
            <span className="rounded-full bg-primary px-[1.6cqw] py-[0.6cqw] text-[1.2cqw] font-bold text-bg">
              Guardar
            </span>
          </span>
        </div>
      </div>
    </motion.aside>
  );
}
