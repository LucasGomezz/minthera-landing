import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Label chico en mayúsculas con mucho tracking. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[0.7rem] font-semibold uppercase tracking-label text-muted", className)}>
      {children}
    </p>
  );
}
