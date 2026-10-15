import { ArrowDown } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillButton } from "@/components/ui/PillButton";
import { hero } from "@/content/site";

/** Entrada escalonada con CSS (sin JS); se anula con prefers-reduced-motion. */
const rise = (delay: number) => ({ animationDelay: `${delay}ms` });

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="flex flex-col justify-center pt-14 pb-10 lg:min-h-[calc(100svh-6rem)] lg:py-16"
    >
      <Eyebrow className="animate-rise">{hero.eyebrow}</Eyebrow>

      <h1
        id="hero-title"
        className="mt-6 animate-rise text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.03em] text-balance sm:text-6xl xl:text-7xl"
        style={rise(120)}
      >
        {hero.titleLead} <span className="text-primary">{hero.titleHighlight}</span>
      </h1>

      <p
        className="mt-7 max-w-[34rem] animate-rise text-lg leading-relaxed text-muted"
        style={rise(240)}
      >
        {hero.lead}
      </p>

      <div className="mt-10 flex animate-rise flex-wrap items-center gap-x-8 gap-y-6" style={rise(360)}>
        <PillButton href={hero.cta.href}>{hero.cta.label}</PillButton>
        <a
          href="#a-medida"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowDown
            aria-hidden="true"
            className="size-4 text-lime transition-transform duration-300 group-hover:translate-y-0.5"
          />
          {hero.scrollHint}
        </a>
      </div>
    </section>
  );
}
