"use client";

import { motion, useTransform } from "motion/react";
import { Mark } from "@/components/brand/Mark";
import { cn } from "@/lib/cn";
import { useStory } from "@/components/story/StoryProvider";
import { BuildStage } from "./BuildStage";
import { UrlBar } from "./parts/UrlBar";
import { CMS, CmsStage } from "./stages/CmsStage";
import { DesignStage } from "./stages/DesignStage";
import { CONTACT_SCROLL, ContactSection, WhatsAppFab } from "./stages/IntegrationsStage";
import { LaunchOverlay, PublishButton } from "./stages/LaunchStage";
import { PerformanceStage, UrlSecurityIcon } from "./stages/PerformanceStage";
import { PHONE_INSET, ResponsiveStage, usePhoneAmount } from "./stages/ResponsiveStage";
import { WireframeStage } from "./stages/WireframeStage";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Ventana de navegador que se construye sola a medida que se scrollea.
 * Es decorativa: el contenido real está en la columna izquierda.
 */
export function BrowserMockup({ compact = false }: { compact?: boolean }) {
  const { progress, reduced, active } = useStory();
  const [, p1, p2, p3, p4, p5, p6, p7] = progress;
  const alive = active === 7 && !reduced;

  const emptyOpacity = useTransform(p1, [0, 0.15], [1, 0]);

  // Etapa 3: el marco se recorta a celular con clip-path y vuelve.
  const phone = usePhoneAmount(p3);
  const clipPath = useTransform(phone, (v) => {
    const inset = v * PHONE_INSET;
    return `inset(0% ${inset}% 0% ${inset}% round ${16 + v * 16}px)`;
  });
  const desktopOpacity = useTransform(phone, [0.35, 0.75], [1, 0]);
  const chromeOpacity = useTransform(phone, [0, 0.4], [1, 0]);
  const phoneUi = useTransform(phone, [0.5, 1], [0, 1]);
  const glowScale = useTransform(phone, [0, 1], [1, 0.42]);

  // Etapas 4 y 5: la página del mockup scrollea a contacto y vuelve arriba.
  const pageY = useTransform(() => {
    const down = clamp01(p4.get() / 0.12);
    const [a, b] = CMS.scrollBack;
    const back = clamp01((p5.get() - a) / (b - a));
    const eased = (v: number) => v * v * (3 - 2 * v);
    return `${-CONTACT_SCROLL * eased(down) * (1 - eased(back))}%`;
  });

  return (
    <div aria-hidden="true" className="relative w-full select-none">
      {/* Resplandor detrás de la ventana */}
      <motion.div
        className="absolute -inset-10 -z-10 rounded-[3rem] bg-violet/25 blur-3xl"
        style={{ scaleX: glowScale }}
      />

      <motion.div
        className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_120px_-40px_var(--color-violet-deep)]"
        style={{ clipPath }}
      >
        {/* Barra superior */}
        <div className="relative border-b border-line bg-surface">
          <motion.div
            className={cn("flex items-center", compact ? "gap-3 px-3 py-2" : "gap-4 px-4 py-3")}
            style={{ opacity: chromeOpacity }}
          >
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className={cn("rounded-full bg-line", compact ? "size-2" : "size-2.5")} />
              ))}
            </div>
            <UrlBar p1={p1} reduced={reduced} compact={compact} slot={<UrlSecurityIcon p6={p6} />} />
            <PublishButton p7={p7} compact={compact} />
          </motion.div>

          {/* Barra de estado del celular */}
          <motion.div
            className="absolute inset-y-0 flex items-center justify-between px-5 text-[0.65rem] font-semibold text-fg"
            style={{ left: `${PHONE_INSET}%`, right: `${PHONE_INSET}%`, opacity: phoneUi }}
          >
            <span>9:41</span>
            <span className="h-4 w-16 rounded-full bg-bg" />
            <span className="flex gap-0.5">
              <span className="h-2 w-0.5 rounded-full bg-fg/80" />
              <span className="h-2 w-0.5 rounded-full bg-fg/80" />
              <span className="h-2 w-0.5 rounded-full bg-fg/40" />
            </span>
          </motion.div>
        </div>

        {/* Viewport: las medidas internas escalan con cqw */}
        <div className="@container relative aspect-16/10 overflow-hidden bg-bg">
          <motion.div
            className="absolute inset-0 grid place-items-center"
            style={{ opacity: emptyOpacity }}
          >
            <Mark className="h-[5cqw] w-auto text-line" />
          </motion.div>

          {/* Versión desktop: una "página" que puede scrollear */}
          <motion.div className="absolute inset-0" style={{ opacity: desktopOpacity }}>
            <motion.div className="absolute inset-0" style={{ y: pageY }}>
              <BuildStage progress={p1}>
                <WireframeStage p1={p1} p2={p2} />
              </BuildStage>
              <BuildStage progress={p2}>
                <DesignStage p2={p2} p5={p5} alive={alive} />
              </BuildStage>
              <BuildStage progress={p4}>
                <ContactSection p4={p4} />
              </BuildStage>
            </motion.div>
          </motion.div>

          {/* Versión celular */}
          <BuildStage progress={p3}>
            <ResponsiveStage p3={p3} />
          </BuildStage>

          <BuildStage progress={p4}>
            <WhatsAppFab p4={p4} />
          </BuildStage>
          <BuildStage progress={p5} className="overflow-hidden">
            <CmsStage p5={p5} />
          </BuildStage>
          <BuildStage progress={p6}>
            <PerformanceStage p6={p6} p7={p7} />
          </BuildStage>
        </div>

        {/* Contorno del celular */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 rounded-4xl border-2 border-line"
          style={{ left: `${PHONE_INSET}%`, right: `${PHONE_INSET}%`, opacity: phoneUi }}
        />
      </motion.div>

      <BuildStage progress={p7} className="pointer-events-none">
        <LaunchOverlay p7={p7} compact={compact} />
      </BuildStage>
    </div>
  );
}
