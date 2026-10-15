import {
  LayoutTemplate,
  Palette,
  PenLine,
  Plug,
  Rocket,
  ShieldCheck,
  Smartphone,
  type LucideProps,
} from "lucide-react";
import type { IconKey } from "@/content/site";

const icons = {
  layout: LayoutTemplate,
  palette: Palette,
  smartphone: Smartphone,
  plug: Plug,
  pen: PenLine,
  shield: ShieldCheck,
  rocket: Rocket,
} satisfies Record<IconKey, unknown>;

/** Ícono de línea fino de la marca, resuelto por clave desde el contenido. */
export function Icon({ name, ...props }: { name: IconKey } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" strokeWidth={1.5} {...props} />;
}
