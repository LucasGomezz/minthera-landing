import type { ReactNode } from "react";
import { ScrollProgress } from "./ScrollProgress";

type StoryLayoutProps = {
  /** Apertura (hero): va antes del mockup en mobile */
  intro: ReactNode;
  /** Secciones del relato, que scrollean normalmente */
  children: ReactNode;
  /** Mockup para desktop: columna derecha sticky */
  aside: ReactNode;
  /** Mockup para mobile: compacto, sticky arriba */
  mobileAside: ReactNode;
};

/**
 * Desktop (≥ lg): relato a la izquierda (≈45%), mockup sticky a la derecha
 * (≈55%) y la barra de progreso en el medio.
 * Mobile: una sola columna; después del hero, el mockup queda sticky arriba
 * en tamaño reducido y las secciones pasan por debajo.
 */
export function StoryLayout({ intro, children, aside, mobileAside }: StoryLayoutProps) {
  return (
    <div className="mx-auto grid w-full max-w-360 overflow-x-clip px-6 sm:px-10 lg:grid-cols-[45fr_55fr] lg:gap-16 lg:px-14">
      <div className="min-w-0">
        {intro}

        <div className="sticky top-0 z-20 -mx-6 bg-[linear-gradient(to_bottom,var(--color-bg)_calc(100%-2rem),transparent)] px-6 pt-3 pb-8 sm:-mx-10 sm:px-10 lg:hidden">
          <div className="mx-auto w-full max-w-[min(100%,calc(34svh*1.5))]">
            {mobileAside}
            <ScrollProgress orientation="horizontal" className="mt-4" />
          </div>
        </div>

        {children}
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-0 flex h-svh items-center">
          <ScrollProgress className="absolute top-1/2 -left-8 -translate-y-1/2" />
          <div className="w-full max-w-[calc((100svh-15rem)*1.5)] pb-28 pl-4">{aside}</div>
        </div>
      </div>
    </div>
  );
}
