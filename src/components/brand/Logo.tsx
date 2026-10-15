import { cn } from "@/lib/cn";
import { Mark } from "./Mark";

type LogoProps = {
  className?: string;
  /** Muestra "DESARROLLO WEB" debajo del nombre */
  withDescriptor?: boolean;
};

/** Logo de MINTHERA: símbolo + logotipo espaciado. */
export function Logo({ className, withDescriptor = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3.5", className)}>
      <Mark className="h-8 w-auto shrink-0 text-fg" />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-medium tracking-[0.34em] text-fg">MINTHERA</span>
        {withDescriptor && (
          <span className="mt-1.5 text-[0.58rem] font-medium tracking-wordmark text-muted">
            DESARROLLO WEB
          </span>
        )}
      </span>
    </span>
  );
}
