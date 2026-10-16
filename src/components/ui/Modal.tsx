"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { useLenis } from "lenis/react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  /** id del título, para aria-labelledby */
  labelledBy: string;
  /** Ancho máximo de la tarjeta (CSS). */
  maxWidth?: string;
  children: ReactNode;
};

/**
 * Popup sobre <dialog> nativo: atrapa el foco, cierra con Esc o tocando el
 * fondo y devuelve el foco a quien lo abrió. Mientras está abierto se frena
 * Lenis para que la rueda no mueva la página de atrás.
 */
export function Modal({ open, onClose, labelledBy, maxWidth = "60rem", children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      lenis?.stop();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, lenis]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      data-lenis-prevent
      onClose={() => {
        lenis?.start();
        onClose();
      }}
      // Click en el fondo (fuera de la tarjeta) cierra.
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      style={{ width: `min(100% - 2rem, ${maxWidth})` }}
      className="m-auto max-h-[calc(100dvh-2rem)] max-w-none overflow-y-auto bg-transparent p-0 text-left text-fg opacity-0 transition-[opacity,translate,display,overlay] transition-discrete duration-300 ease-out-expo backdrop:bg-bg/85 backdrop:opacity-0 backdrop:transition-[opacity,display,overlay] backdrop:transition-discrete backdrop:duration-300 open:opacity-100 open:backdrop:opacity-100 starting:open:translate-y-4 starting:open:opacity-0 starting:open:backdrop:opacity-0"
    >
      {open && children}
    </dialog>
  );
}

/** Botón redondo de cierre: cierra el <dialog> que lo contiene. */
export function ModalClose({ autoFocus = false }: { autoFocus?: boolean }) {
  return (
    <form method="dialog" className="ml-auto shrink-0">
      <button
        type="submit"
        aria-label="Cerrar"
        autoFocus={autoFocus}
        className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-primary/50 hover:text-fg"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
    </form>
  );
}
