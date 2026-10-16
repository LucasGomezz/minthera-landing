"use client";

import { useId, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { Shot } from "./Shot";

/**
 * Comparador antes/después: la captura "antes" tapa la "después" hasta la
 * posición del control. Se arrastra con el mouse o el dedo, o con las flechas
 * del teclado (es un input range nativo, invisible, encima de todo).
 */
type BeforeAfterProps = {
  before?: string;
  after?: string;
  /** Para los textos alternativos, p. ej. "Café Nómade · Inicio" */
  name: string;
};

export function BeforeAfter({ before, after, name }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const id = useId();

  return (
    <div className="absolute inset-0">
      <Shot src={after} alt={`${name}: sitio nuevo`} label="Después" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Shot src={before} alt={`${name}: sitio anterior`} label="Antes" />
      </div>

      <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-bg/85 px-3 py-1 text-[0.65rem] font-semibold tracking-label text-muted">
        ANTES
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-[0.65rem] font-semibold tracking-label text-bg">
        DESPUÉS
      </span>

      {/* Línea divisoria con su manija */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-primary shadow-[0_0_24px_var(--color-primary)]"
        style={{ left: `${position}%` }}
      >
        <span className="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-primary bg-bg text-primary">
          <ChevronsLeftRight className="size-4" strokeWidth={2} />
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        Comparar antes y después
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-valuetext={`${position}% del sitio anterior visible`}
        className="peer absolute inset-0 size-full cursor-ew-resize touch-pan-y appearance-none opacity-0"
      />
      <span className="pointer-events-none absolute inset-0 ring-primary ring-inset peer-focus-visible:ring-2" />
    </div>
  );
}
