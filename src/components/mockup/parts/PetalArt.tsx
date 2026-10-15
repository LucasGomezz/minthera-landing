"use client";

import { useId } from "react";

/** Pétalo 3D vectorial para el "hero" del mini sitio. */
export function PetalArt({ className }: { className?: string }) {
  // IDs únicos por instancia: el mockup existe dos veces (desktop y mobile)
  // y una referencia a un degradado dentro de un nodo oculto no se pinta.
  const uid = useId().replace(/[^\w-]/g, "");
  const body = `petal-body-${uid}`;
  const shine = `petal-shine-${uid}`;
  const blur = `petal-blur-${uid}`;

  return (
    <svg viewBox="0 0 220 166" className={className}>
      <defs>
        <linearGradient id={body} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="var(--color-primary)" />
          <stop offset="0.45" stopColor="var(--color-violet)" />
          <stop offset="1" stopColor="var(--color-violet-deep)" />
        </linearGradient>
        <radialGradient id={shine} cx="0.38" cy="0.28" r="0.4">
          <stop offset="0" stopColor="var(--color-fg)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--color-fg)" stopOpacity="0" />
        </radialGradient>
        <filter id={blur} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      {/* halo */}
      <ellipse cx="118" cy="92" rx="74" ry="56" fill="var(--color-violet)" opacity="0.55" filter={`url(#${blur})`} />
      {/* pétalo trasero */}
      <path
        d="M150 18C190 46 198 98 170 132 150 156 126 150 116 134 98 104 112 50 150 18Z"
        fill="var(--color-violet-deep)"
        opacity="0.9"
      />
      {/* pétalo principal */}
      <path
        d="M96 10C142 40 158 96 132 136 116 160 84 160 70 138 46 100 58 44 96 10Z"
        fill={`url(#${body})`}
      />
      <path
        d="M96 10C142 40 158 96 132 136 116 160 84 160 70 138 46 100 58 44 96 10Z"
        fill={`url(#${shine})`}
      />
    </svg>
  );
}
