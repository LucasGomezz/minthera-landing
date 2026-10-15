/**
 * Geometría del mini sitio dentro del viewport del mockup, en un espacio de
 * 640×400 (proporción 16:10). La comparten el wireframe SVG y el contenido
 * real HTML, así los bloques reales caen exactamente sobre su esqueleto.
 */
export const VIEW = { w: 640, h: 400 } as const;

export type Box = { x: number; y: number; w: number; h: number };

export const G = {
  nav: { x: 24, y: 16, w: 592, h: 34 },
  navLogo: { x: 38, y: 27, w: 78, h: 12 },
  navLinks: [
    { x: 386, y: 29, w: 44, h: 8 },
    { x: 440, y: 29, w: 44, h: 8 },
    { x: 494, y: 29, w: 44, h: 8 },
  ],
  navCta: { x: 552, y: 23, w: 54, h: 20 },

  heroTitle: [
    { x: 40, y: 88, w: 290, h: 26 },
    { x: 40, y: 120, w: 230, h: 26 },
  ],
  heroText: [
    { x: 40, y: 162, w: 270, h: 7 },
    { x: 40, y: 176, w: 220, h: 7 },
  ],
  heroBtn: { x: 40, y: 198, w: 100, h: 28 },
  heroArt: { x: 380, y: 70, w: 220, h: 166 },

  cards: [
    { x: 40, y: 260, w: 176, h: 116 },
    { x: 232, y: 260, w: 176, h: 116 },
    { x: 424, y: 260, w: 176, h: 116 },
  ],
} satisfies Record<string, Box | Box[]>;

/** Convierte una caja del espacio 640×400 a estilos absolutos en %. */
export function boxStyle(b: Box) {
  return {
    left: `${(b.x / VIEW.w) * 100}%`,
    top: `${(b.y / VIEW.h) * 100}%`,
    width: `${(b.w / VIEW.w) * 100}%`,
    height: `${(b.h / VIEW.h) * 100}%`,
  } as const;
}

/** Rango [a, b] repartido en `n` tramos escalonados que se solapan. */
export function stagger(
  [a, b]: readonly [number, number],
  i: number,
  n: number,
  overlap = 0.5,
): [number, number] {
  const slot = (b - a) / (n - (n - 1) * overlap);
  const start = a + i * slot * (1 - overlap);
  return [start, start + slot];
}
