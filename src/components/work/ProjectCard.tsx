import Image from "next/image";
import { Maximize2 } from "lucide-react";
import type { Project } from "@/content/site";

/**
 * Previsualización de un trabajo: una mini ventana de navegador con el logo
 * del cliente. Al tocarla se abre el antes y después.
 */
export function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const compares = project.views.some((v) => v.kind === "compare");
  const count = project.views.length;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group block w-full rounded-2xl text-left"
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,translate,box-shadow] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-[0_30px_80px_-40px_var(--color-violet)]">
        <div aria-hidden="true" className="flex items-center gap-3 border-b border-line px-3 py-2">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2 rounded-full bg-line" />
            ))}
          </div>
          <span className="truncate rounded-full bg-bg px-3 py-0.5 font-mono text-[0.65rem] text-muted">
            {project.domain}
          </span>
        </div>

        <div
          className="relative grid aspect-16/10 place-items-center overflow-hidden"
          style={{
            background: `radial-gradient(120% 90% at 50% 0%, ${project.accent} 0%, color-mix(in oklab, ${project.accent} 70%, var(--color-bg)) 100%)`,
          }}
        >
          {project.logo ? (
            <div className="relative h-3/5 w-3/4 transition-transform duration-500 ease-out-expo group-hover:scale-105">
              <Image src={project.logo} alt="" fill sizes="20rem" className="object-contain" />
            </div>
          ) : (
            <span className="px-6 text-center text-2xl font-semibold tracking-[0.2em] text-fg uppercase transition-transform duration-500 ease-out-expo group-hover:scale-105">
              {project.name}
            </span>
          )}

          <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-bg/85 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.16em] text-primary opacity-0 transition-[opacity,translate] duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-lg:opacity-100">
            <Maximize2 aria-hidden="true" className="size-3" />
            {compares ? "ANTES / DESPUÉS" : "VER SITIO"}
          </span>
        </div>
      </div>

      <div className="mt-4 px-1">
        <p className="text-lg font-semibold text-fg">{project.name}</p>
        <p className="text-sm text-muted">
          {project.category}
          {count > 1 && ` · ${count} vistas`}
        </p>
      </div>
    </button>
  );
}
