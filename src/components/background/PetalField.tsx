import { cn } from "@/lib/cn";

type PetalProps = {
  /** Identificador único (para los ids de degradados y filtro) */
  id: string;
  className?: string;
  /** Rotación base en grados */
  rotate?: number;
  /** Desfase de la animación de deriva, en segundos */
  delay?: number;
  /** Desenfoque en unidades del viewBox (200×260) */
  blur?: number;
};

const PETAL_PATH =
  "M100 6C160 52 194 122 170 190 152 240 120 256 100 256 80 256 48 240 30 190 6 122 40 52 100 6Z";

/**
 * Pétalo "3D": forma de gota con degradado violeta profundo, un brillo
 * lavanda en el borde y desenfoque. Todo vectorial, sin imágenes.
 * El blur va dentro del SVG (no como `filter` CSS): se rasteriza una vez y la
 * animación de deriva solo mueve la capa, sin re-aplicar el blur por frame.
 */
function Petal({ id, className, rotate = 0, delay = 0, blur = 28 }: PetalProps) {
  return (
    <div
      className={cn("absolute animate-drift will-change-transform", className)}
      style={{ animationDelay: `${-delay}s` }}
    >
      <svg
        viewBox="0 0 200 260"
        overflow="visible"
        className="h-full w-full"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <defs>
          <linearGradient id={`${id}-body`} x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0" stopColor="var(--color-violet)" />
            <stop offset="0.65" stopColor="var(--color-violet-deep)" />
            <stop offset="1" stopColor="var(--color-bg)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="0.35" cy="0.3" r="0.5">
            <stop offset="0" stopColor="var(--color-primary)" stopOpacity="0.85" />
            <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
          <filter id={`${id}-blur`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation={blur} />
          </filter>
        </defs>
        <g filter={`url(#${id}-blur)`}>
          <path d={PETAL_PATH} fill={`url(#${id}-body)`} />
          <path d={PETAL_PATH} fill={`url(#${id}-glow)`} />
        </g>
      </svg>
    </div>
  );
}

/** Fondo fijo con pétalos violetas desenfocados. Decorativo. */
export function PetalField() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Petal
        id="petal-a"
        rotate={-28}
        blur={30}
        className="top-[-12%] right-[-8%] h-[70vh] w-[48vh] opacity-60"
      />
      <Petal
        id="petal-b"
        rotate={142}
        delay={6}
        blur={40}
        className="bottom-[-22%] left-[-10%] h-[62vh] w-[44vh] opacity-45"
      />
      <Petal
        id="petal-c"
        rotate={64}
        delay={11}
        blur={22}
        className="top-[38%] left-[38%] h-[30vh] w-[22vh] opacity-30"
      />
      {/* Viñeta para mantener el contraste del texto */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,transparent_0%,var(--color-bg)_75%)] opacity-70" />
    </div>
  );
}
