"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectDialog } from "@/components/work/ProjectDialog";
import { work, type Project } from "@/content/site";

export function Work() {
  const [selected, setSelected] = useState<Project | null>(null);
  if (work.projects.length === 0) return null;

  return (
    <section
      id="trabajos"
      aria-labelledby="work-title"
      className="mx-auto w-full max-w-360 px-6 pt-28 sm:px-10 lg:px-14 lg:pt-40"
    >
      <Reveal className="max-w-2xl">
        <Eyebrow>{work.eyebrow}</Eyebrow>
        <h2 id="work-title" className="mt-6 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
          {work.title}
        </h2>
        <p className="mt-5 max-w-[30rem] text-lg leading-relaxed text-muted">{work.lead}</p>
      </Reveal>

      <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {work.projects.map((project, i) => (
          <li key={project.id}>
            <Reveal delay={i * 0.08}>
              <ProjectCard project={project} onOpen={() => setSelected(project)} />
            </Reveal>
          </li>
        ))}
      </ul>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
