"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { MotionConfig, cancelFrame, frame, useReducedMotion } from "motion/react";
import { ReactLenis, type LenisRef } from "lenis/react";

/**
 * Scroll suave con Lenis, manejado desde el loop de frames de motion para que
 * ambos compartan un único requestAnimationFrame. `useScroll` de motion lee el
 * scroll nativo, que Lenis mueve, así que quedan sincronizados.
 * Con prefers-reduced-motion no se monta Lenis y motion omite transformaciones.
 */
export function Providers({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const update = ({ timestamp }: { timestamp: number }) => {
      lenisRef.current?.lenis?.raf(timestamp);
    };
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduceMotion]);

  return (
    <MotionConfig reducedMotion="user">
      {reduceMotion === false && (
        <ReactLenis
          root
          ref={lenisRef}
          options={{ autoRaf: false, lerp: 0.1, anchors: true }}
        />
      )}
      {children}
    </MotionConfig>
  );
}
