import type { ReactNode } from "react";
import type { ProjectView } from "@/content/site";
import { BeforeAfter } from "./BeforeAfter";
import { Clip } from "./Clip";
import { Shot } from "./Shot";

/** Contenido de una vista del popup: comparación, captura sola o video. */
export function ViewStage({ view, name }: { view: ProjectView; name: string }) {
  const alt = `${name} · ${view.label}`;
  if (view.kind === "compare") {
    return <BeforeAfter before={view.before} after={view.after} name={alt} />;
  }

  const media =
    view.kind === "video" && view.src ? (
      <Clip src={view.src} poster={view.poster} label={alt} />
    ) : (
      <Shot
        src={view.kind === "video" ? view.poster : view.image}
        alt={alt}
        label={view.label}
      />
    );

  return (
    <>
      {view.device === "phone" ? <Phone>{media}</Phone> : media}
      {view.badge && (
        <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-lime px-3 py-1 text-[0.65rem] font-semibold tracking-label text-bg">
          {view.badge}
        </span>
      )}
    </>
  );
}

/** Marco de celular centrado, para capturas o videos de la versión mobile. */
function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(80%_80%_at_50%_0%,color-mix(in_oklab,var(--color-violet-deep)_60%,var(--color-bg))_0%,var(--color-bg)_100%)]">
      <div className="relative aspect-9/19 h-[90%] overflow-hidden rounded-[7%/3.3%] border-4 border-line bg-surface shadow-[0_30px_80px_-30px_var(--color-violet)]">
        {children}
      </div>
    </div>
  );
}
