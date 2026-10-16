"use client";

import { useId, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Modal, ModalClose } from "@/components/ui/Modal";
import type { Project } from "@/content/site";
import { cn } from "@/lib/cn";
import { ViewStage } from "./ViewStage";

type ProjectDialogProps = {
  project: Project | null;
  onClose: () => void;
};

/** Popup con las vistas de un trabajo. */
export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  return (
    <Modal open={!!project} onClose={onClose} labelledBy="project-title">
      {project && <ProjectBody key={project.id} project={project} />}
    </Modal>
  );
}

function ProjectBody({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const baseId = useId();
  const { views } = project;
  const view = views[index];
  const many = views.length > 1;
  const go = (step: number) => setIndex((i) => (i + step + views.length) % views.length);

  return (
    <div className="rounded-2xl border border-line bg-surface p-4 shadow-[0_40px_120px_-40px_var(--color-violet-deep)] sm:p-6">
      <div className="mb-4 flex items-start gap-4 sm:mb-5">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-semibold tracking-label text-muted uppercase">
            {project.category}
          </p>
          <h3 id="project-title" className="mt-1.5 text-2xl font-semibold tracking-[-0.02em]">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-muted">{project.summary}</p>
        </div>
        <ModalClose autoFocus />
      </div>

      {many && (
        <div
          role="tablist"
          aria-label="Vistas del sitio"
          className="-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
        >
          {views.map((v, i) => (
            <button
              key={v.label}
              id={`${baseId}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls={`${baseId}-panel`}
              onClick={() => setIndex(i)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                i === index
                  ? "border-primary bg-primary text-bg"
                  : "border-line text-muted hover:border-primary/50 hover:text-fg",
              )}
            >
              {v.label}
              {v.kind === "single" && v.badge && (
                <span
                  aria-hidden="true"
                  className={cn("size-1.5 rounded-full", i === index ? "bg-bg" : "bg-lime")}
                />
              )}
            </button>
          ))}
        </div>
      )}

      <div
        id={`${baseId}-panel`}
        role={many ? "tabpanel" : undefined}
        aria-labelledby={many ? `${baseId}-tab-${index}` : undefined}
        className="relative aspect-16/10 overflow-hidden rounded-xl border border-line bg-bg"
      >
        <ViewStage key={index} view={view} name={project.name} />
      </div>

      {(many || project.url) && (
        <div className="mt-4 flex items-center gap-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-fg"
            >
              Visitar {project.domain}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          )}
          {many && (
            <div className="ml-auto flex items-center gap-2">
              <span className="font-mono text-xs text-muted tabular-nums">
                {index + 1} / {views.length}
              </span>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Vista anterior"
                className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-primary/50 hover:text-fg"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Vista siguiente"
                className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-primary/50 hover:text-fg"
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
