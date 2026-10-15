import type { SVGProps } from "react";

/** Proporción del símbolo (ancho / alto). */
export const MARK_RATIO = 122.5 / 82.5;

export const MARK_PATH =
  "M32 0L105.7 0L110.3 6L93.5 6L84.2 13.8L48.4 13.8ZM0 0L0 82.5L14.5 82.5L14.5 16.9L47.5 44.6L58.8 35.1L17 0ZM68.5 18.2L79 18.2L66.3 28.8L61.1 24.4ZM23.8 37.3L23.8 56.3L47.5 76.2L103 29.6L116.5 40L120.5 48.5L109 44.1L107 44.1L107 82.5L122.5 82.5L122.5 14L99 14L47.5 57.2ZM82.5 59.4L96.5 47.7L96.5 82.5L82.5 82.5ZM55 82.5L72.5 67.8L72.5 82.5Z";

/**
 * Símbolo de MINTHERA (monograma M con flecha ascendente), vectorizado del
 * logo original. Toma el color de `currentColor`.
 */
export function Mark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 122.5 82.5" fill="currentColor" aria-hidden="true" {...props}>
      <path d={MARK_PATH} />
    </svg>
  );
}
