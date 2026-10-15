"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { Check, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { useTyped } from "../parts/typing";
import { useAppear } from "./DesignStage";

/** Cuánto "scrollea" la página del mockup para mostrar la sección de contacto (% de alto). */
export const CONTACT_SCROLL = 80;

const FIELDS = [
  { label: "Nombre", value: "Sofía Martínez", range: [0.3, 0.42] as const },
  { label: "Email", value: "sofi@estudio.com", range: [0.44, 0.56] as const },
  { label: "Mensaje", value: "¡Hola! Quiero una web para mi estudio.", range: [0.58, 0.74] as const, tall: true },
];

function Field({
  p,
  label,
  value,
  range,
  tall,
}: {
  p: MotionValue<number>;
  label: string;
  value: string;
  range: readonly [number, number];
  tall?: boolean;
}) {
  const typed = useTyped(p, range, value);
  const focus = useTransform(p, [range[0] - 0.02, range[0], range[1], range[1] + 0.02], [0, 1, 1, 0]);
  return (
    <span className="block">
      <span className="block text-[1.25cqw] text-muted">{label}</span>
      <span
        className={cn(
          "relative mt-[0.5cqw] block rounded-[0.9cqw] border border-line bg-bg/60 px-[1.2cqw] text-[1.45cqw] text-fg",
          tall ? "h-[6.4cqw] py-[0.9cqw] leading-snug" : "flex h-[3.8cqw] items-center",
        )}
      >
        <motion.span
          className="absolute -inset-px rounded-[0.9cqw] border border-primary"
          style={{ opacity: focus }}
        />
        <motion.span>{typed}</motion.span>
      </span>
    </span>
  );
}

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];
const OFFSET = 6; // noviembre 2026 arranca en domingo
const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);
const PICKED_DAY = 18;
const SLOTS = ["10:00", "11:30", "16:00"];
const PICKED_SLOT = 1;

function Calendar({ p }: { p: MotionValue<number> }) {
  const dayPick = useTransform(p, [0.6, 0.68], [0, 1]);
  const dayScale = useTransform(p, [0.6, 0.68], [0.4, 1]);
  const slotPick = useTransform(p, [0.74, 0.8], [0, 1]);

  return (
    <span className="flex flex-col rounded-[1.4cqw] border border-line bg-surface/85 p-[1.8cqw]">
      <span className="flex items-center justify-between text-[1.5cqw] font-semibold">
        <ChevronLeft className="size-[1.8cqw] text-muted" />
        Noviembre 2026
        <ChevronRight className="size-[1.8cqw] text-muted" />
      </span>
      <span className="mt-[1.2cqw] grid grid-cols-7 gap-y-[0.5cqw] text-center text-[1.15cqw] text-muted">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="font-semibold text-fg/70">
            {d}
          </span>
        ))}
        {Array.from({ length: OFFSET }, (_, i) => (
          <span key={`e${i}`} />
        ))}
        {DAYS.map((day) => (
          <span key={day} className="relative grid h-[2.3cqw] place-items-center">
            {day === PICKED_DAY && (
              <motion.span
                className="absolute inset-x-[0.6cqw] inset-y-0 rounded-full bg-primary"
                style={{ opacity: dayPick, scale: dayScale }}
              />
            )}
            <span className={cn("relative", day === PICKED_DAY && "font-bold text-bg")}>{day}</span>
          </span>
        ))}
      </span>
      <span className="mt-[1.2cqw] flex gap-[0.8cqw]">
        {SLOTS.map((slot, i) => (
          <span
            key={slot}
            className="relative flex-1 rounded-full border border-line py-[0.5cqw] text-center text-[1.2cqw] text-muted"
          >
            {i === PICKED_SLOT && (
              <motion.span
                className="absolute -inset-px rounded-full border border-primary bg-primary/15"
                style={{ opacity: slotPick }}
              />
            )}
            <span className="relative">{slot}</span>
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * Etapa 4 · "Integraciones": sección de contacto debajo del contenido.
 * Va dentro de la "página" del mockup, que scrollea para mostrarla.
 */
export function ContactSection({ p4 }: { p4: MotionValue<number> }) {
  const heading = useAppear(p4, [0.12, 0.26], 10);
  const body = useAppear(p4, [0.18, 0.32], 14);
  const press = useTransform(p4, [0.8, 0.83, 0.86], [1, 0.92, 1]);
  const sent = useTransform(p4, [0.86, 0.92], [0, 1]);
  const sentScale = useTransform(p4, [0.86, 0.92], [0.6, 1]);

  return (
    <div
      className="absolute inset-x-0 top-full px-[6.25cqw] pt-[3cqw] text-fg"
      style={{ height: `${CONTACT_SCROLL}%` }}
    >
      <motion.p className="text-[3cqw] font-semibold tracking-[-0.02em]" style={heading}>
        Hablemos de tu proyecto
      </motion.p>
      <motion.div className="mt-[2cqw] grid grid-cols-[1.15fr_1fr] gap-[2.4cqw]" style={body}>
        <span className="relative flex flex-col gap-[1.2cqw] rounded-[1.4cqw] border border-line bg-surface/85 p-[1.8cqw]">
          {FIELDS.map((f) => (
            <Field key={f.label} p={p4} {...f} />
          ))}
          <motion.span
            className="mt-[0.4cqw] self-start rounded-full bg-primary px-[2.4cqw] py-[0.8cqw] text-[1.35cqw] font-bold tracking-widest text-bg"
            style={{ scale: press }}
          >
            ENVIAR
          </motion.span>
          <motion.span
            className="absolute right-[1.8cqw] bottom-[1.8cqw] flex items-center gap-[0.6cqw] text-[1.3cqw] text-fg"
            style={{ opacity: sent, scale: sentScale }}
          >
            <Check className="size-[1.8cqw] text-lime" strokeWidth={2.5} />
            ¡Enviado!
          </motion.span>
        </span>
        <Calendar p={p4} />
      </motion.div>
    </div>
  );
}

/** Botón flotante de WhatsApp, fijo en la esquina del viewport del mockup. */
export function WhatsAppFab({ p4 }: { p4: MotionValue<number> }) {
  const opacity = useTransform(p4, [0.08, 0.2], [0, 1]);
  const scale = useTransform(p4, [0.08, 0.2], [0.3, 1]);
  const bubble = useTransform(p4, [0.22, 0.3, 0.88, 0.96], [0, 1, 1, 0]);
  const bubbleX = useTransform(p4, [0.22, 0.3], [8, 0]);

  return (
    <div className="absolute right-[3cqw] bottom-[3cqw] flex items-center gap-[1.2cqw]">
      <motion.span
        className="rounded-[1.2cqw] rounded-br-[0.3cqw] border border-line bg-surface px-[1.4cqw] py-[0.8cqw] text-[1.3cqw] text-fg shadow-lg shadow-black/30"
        style={{ opacity: bubble, x: bubbleX }}
      >
        ¿En qué te ayudamos?
      </motion.span>
      <motion.span
        className="relative grid size-[6cqw] place-items-center rounded-full bg-primary text-bg shadow-[0_8px_24px_-6px_var(--color-primary)]"
        style={{ opacity, scale }}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/40 [animation-duration:2.4s]" />
        <MessageCircle className="relative size-[3cqw]" strokeWidth={2} />
        <span className="absolute top-[0.2cqw] right-[0.2cqw] size-[1.4cqw] rounded-full border-2 border-bg bg-lime" />
      </motion.span>
    </div>
  );
}
