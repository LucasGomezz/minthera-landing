"use client";

import { useSyncExternalStore } from "react";

/**
 * Media query reactiva. En el servidor (y en la primera hidratación) devuelve
 * `serverValue`, así no hay desajustes de hidratación.
 */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** Breakpoint `lg` de Tailwind: a partir de acá el layout es de dos columnas. */
export const DESKTOP_QUERY = "(min-width: 64rem)";
