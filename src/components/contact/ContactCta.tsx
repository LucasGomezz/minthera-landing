"use client";

import { useState } from "react";
import { PillButton } from "@/components/ui/PillButton";
import { ContactDialog } from "./ContactDialog";

/** CTA que abre el popup de contacto. */
export function ContactCta({ label, className }: { label: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PillButton size="lg" className={className} onClick={() => setOpen(true)}>
        {label}
      </PillButton>
      <ContactDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
