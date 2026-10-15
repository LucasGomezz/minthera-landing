import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type PillButtonProps = {
  href: string;
  children: string;
  size?: "md" | "lg";
  className?: string;
};

/** CTA principal: pill lavanda con texto oscuro y flecha lima en un círculo. */
export function PillButton({ href, children, size = "md", className }: PillButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full bg-primary font-bold tracking-[0.16em] text-bg",
        "transition-[transform,box-shadow] duration-300 ease-out-expo",
        "shadow-[0_0_0_0_var(--color-primary)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_var(--color-primary)]",
        size === "md" ? "py-2 pr-2 pl-6 text-sm" : "py-2.5 pr-2.5 pl-8 text-base",
        className,
      )}
    >
      {children}
      <span
        className={cn(
          "grid place-items-center rounded-full bg-bg text-lime",
          size === "md" ? "size-9" : "size-11",
        )}
      >
        <ArrowRight
          aria-hidden="true"
          strokeWidth={2.25}
          className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
        />
      </span>
    </a>
  );
}
