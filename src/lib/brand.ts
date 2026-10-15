/**
 * Espejo de los tokens de `globals.css` para contextos donde no hay CSS
 * (metadata, viewport, imágenes OG). En componentes usá siempre las
 * utilidades de Tailwind o `var(--color-*)`.
 */
export const brand = {
  bg: "#0D0B12",
  surface: "#16131D",
  line: "#2A2535",
  primary: "#A68BFA",
  violet: "#6D4AE0",
  violetDeep: "#3B2A8C",
  lime: "#D9F45B",
  fg: "#F5F3FA",
  muted: "#A39FB0",
} as const;

export const site = {
  name: "MINTHERA",
  url: "https://minthera.dev",
  domain: "minthera.dev",
} as const;
