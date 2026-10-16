import Image from "next/image";
import { Mark } from "@/components/brand/Mark";
import { cn } from "@/lib/cn";

type ShotProps = {
  src?: string;
  alt: string;
  /** Texto del marcador cuando todavía no hay captura */
  label: string;
  className?: string;
};

/**
 * Captura de un sitio, recortada desde arriba para llenar su caja.
 * Sin `src` muestra un marcador con el símbolo de la marca.
 */
export function Shot({ src, alt, label, className }: ShotProps) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("absolute inset-0 grid place-items-center bg-surface", className)}
      >
        <div className="flex flex-col items-center gap-3 text-muted">
          <Mark className="h-8 w-auto text-line" />
          <span className="text-[0.65rem] font-semibold tracking-label uppercase">{label}</span>
        </div>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 64rem) 56rem, 100vw"
      className={cn("object-cover object-top", className)}
    />
  );
}
