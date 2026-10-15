import { AtSign, Globe, Mail } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { closing } from "@/content/site";
import { ScriptUnderline } from "./ScriptUnderline";

const contactIcons = { web: Globe, instagram: AtSign, email: Mail } as const;

export function Closing() {
  return (
    <section
      id="contacto"
      aria-labelledby="closing-title"
      className="relative isolate overflow-hidden px-6 pt-20 pb-32 text-center sm:px-10 lg:pt-28 lg:pb-40"
    >
      {/* Resplandor violeta de fondo */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 size-[min(56rem,140vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-violet)_38%,transparent)_0%,transparent_62%)] blur-2xl"
      />

      <Reveal className="mx-auto flex max-w-5xl flex-col items-center">
        <Eyebrow>{closing.eyebrow}</Eyebrow>

        <h2
          id="closing-title"
          className="relative mt-8 font-hand text-6xl leading-none font-semibold text-balance text-lime sm:text-7xl lg:text-8xl lg:whitespace-nowrap"
        >
          {closing.script}
          <ScriptUnderline className="absolute -bottom-5 left-[8%] h-5 w-[84%] text-lime" />
        </h2>

        <p className="mt-12 max-w-[30rem] text-lg leading-relaxed text-muted">{closing.text}</p>

        <PillButton href={closing.cta.href} size="lg" className="mt-10">
          {closing.cta.label}
        </PillButton>

        <ul className="mt-14 flex flex-col items-center justify-center gap-x-3 gap-y-2 text-sm text-muted sm:flex-row sm:flex-wrap">
          {closing.contacts.map((contact, i) => {
            const Icon = contactIcons[contact.kind];
            const external = contact.href.startsWith("http");
            return (
              <li key={contact.label} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden="true" className="hidden text-primary/60 sm:inline">
                    ·
                  </span>
                )}
                <a
                  href={contact.href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="inline-flex items-center gap-2 rounded-full px-2 py-1 transition-colors hover:text-fg"
                >
                  <Icon aria-hidden="true" className="size-4 text-primary" strokeWidth={1.5} />
                  {contact.label}
                </a>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
