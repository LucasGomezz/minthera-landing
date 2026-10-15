"use client";

import { motion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import type { Stage } from "@/content/site";
import { cn } from "@/lib/cn";
import { StageTrigger } from "./StageTrigger";
import { STAGE_COUNT, useStory } from "./StoryProvider";

const pad = (n: number) => String(n).padStart(2, "0");

const reveal = {
  hidden: { opacity: 0, y: 28 },
  shown: { opacity: 1, y: 0 },
};

type StorySectionProps = {
  stage: Stage;
  /** 1..7 */
  index: number;
};

/** Una etapa del relato: numeración, ícono, título, línea corta y detalle. */
export function StorySection({ stage, index }: StorySectionProps) {
  const { active } = useStory();
  const isActive = active === index;
  const titleId = `${stage.id}-title`;

  return (
    <StageTrigger index={index}>
      <section
        id={stage.id}
        aria-labelledby={titleId}
        aria-current={isActive ? "step" : undefined}
        className="flex min-h-[85svh] flex-col justify-center py-16 lg:min-h-[110svh] lg:py-24"
      >
        <motion.div
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.45 }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.p
            variants={reveal}
            className="font-semibold tracking-label text-[0.7rem] text-muted tabular-nums"
          >
            <span className="text-primary">{pad(index)}</span> / {pad(STAGE_COUNT - 1)}
          </motion.p>

          <motion.div variants={reveal} className="mt-8 flex items-center gap-4">
            <span
              className={cn(
                "grid size-12 place-items-center rounded-2xl border bg-surface transition-colors duration-500",
                isActive ? "border-primary/50" : "border-line",
              )}
            >
              <Icon name={stage.icon} className="size-5 text-primary" />
            </span>
            <h2 id={titleId} className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
              {stage.title}
            </h2>
          </motion.div>

          <motion.p
            variants={reveal}
            className="mt-6 max-w-[30rem] text-xl leading-snug text-fg text-balance"
          >
            {stage.line}
          </motion.p>

          <motion.p
            variants={reveal}
            className="mt-4 max-w-[32rem] leading-relaxed text-muted"
          >
            {stage.detail}
          </motion.p>

          <motion.ul variants={reveal} className="mt-8 flex flex-wrap gap-2">
            {stage.points.map((point) => (
              <li
                key={point}
                className="rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-sm text-muted"
              >
                {point}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </section>
    </StageTrigger>
  );
}
