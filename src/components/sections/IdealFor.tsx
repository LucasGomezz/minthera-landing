import { Check } from "lucide-react";
import { Mark } from "@/components/brand/Mark";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { idealFor } from "@/content/site";

export function IdealFor() {
  return (
    <section
      aria-labelledby="ideal-title"
      className="mx-auto w-full max-w-360 px-6 pt-28 pb-12 sm:px-10 lg:px-14 lg:pt-40 lg:pb-16"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[45fr_55fr] lg:gap-16">
        <Reveal>
          <Eyebrow>{idealFor.eyebrow}</Eyebrow>
          <h2
            id="ideal-title"
            className="mt-6 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl"
          >
            {idealFor.title}
          </h2>
          <p className="mt-5 max-w-[26rem] text-lg leading-relaxed text-muted">
            {idealFor.lead}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/70 p-8 backdrop-blur-sm sm:p-10">
            <Mark className="absolute -top-4 -right-6 h-24 w-auto text-primary/[0.06]" />
            <ul className="relative divide-y divide-line">
              {idealFor.items.map((item) => (
                <li key={item} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-lime/30 bg-lime/10">
                    <Check aria-hidden="true" className="size-3.5 text-lime" strokeWidth={2.5} />
                  </span>
                  <span className="text-lg text-fg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
