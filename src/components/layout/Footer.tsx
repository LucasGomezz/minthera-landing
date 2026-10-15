import { Logo } from "@/components/brand/Logo";
import { footer } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-360 flex-col items-center gap-6 px-6 py-10 sm:px-10 md:flex-row md:justify-between lg:px-14">
        <a href="#inicio" className="rounded-md">
          <Logo withDescriptor={false} className="scale-90" />
          <span className="sr-only">, volver al inicio</span>
        </a>
        <p className="text-[0.65rem] font-semibold tracking-label text-muted">{footer.line}</p>
        <p className="text-xs text-muted">{footer.legal}</p>
      </div>
    </footer>
  );
}
