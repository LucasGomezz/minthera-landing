import { cn } from "@/lib/cn";
import { Sparkle } from "./Sparkle";

type LogoProps = {
  className?: string;
  /** Muestra "DESARROLLO WEB" debajo del nombre */
  withDescriptor?: boolean;
};

export function Logo({ className, withDescriptor = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Sparkle className="size-7 shrink-0 text-primary" />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-[0.18em] text-fg">MINTHERA</span>
        {withDescriptor && (
          <span className="mt-1.5 text-[0.58rem] font-medium tracking-wordmark text-muted">
            DESARROLLO WEB
          </span>
        )}
      </span>
    </span>
  );
}
