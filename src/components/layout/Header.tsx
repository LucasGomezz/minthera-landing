import { Logo } from "@/components/brand/Logo";
import { header } from "@/content/site";

export function Header() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-360 items-center justify-between gap-6 px-6 pt-7 sm:px-10 lg:px-14">
      <a href="#inicio" className="rounded-md">
        <Logo />
        <span className="sr-only">, ir al inicio</span>
      </a>
      <p className="hidden max-w-[22rem] text-right text-[0.65rem] leading-relaxed font-semibold tracking-label text-muted md:block">
        {header.tagline}
      </p>
    </header>
  );
}
