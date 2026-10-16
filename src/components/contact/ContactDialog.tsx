"use client";

import { useId, useState, type FormEvent } from "react";
import { Check, Copy, Mail, MessageCircle } from "lucide-react";
import { Modal, ModalClose } from "@/components/ui/Modal";
import { contact, contactForm } from "@/content/site";
import { cn } from "@/lib/cn";

type Channel = "whatsapp" | "email";

/**
 * Formulario corto que arma el mensaje y lo abre ya escrito en WhatsApp o en
 * el correo de quien escribe. No hay servidor de por medio: el envío lo hace
 * la persona desde su app. El botón de WhatsApp aparece solo si hay número.
 */
export function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="contact-title"
      maxWidth="34rem"
    >
      <ContactBody />
    </Modal>
  );
}

function ContactBody() {
  const id = useId();
  const [topic, setTopic] = useState<string>(contactForm.topics[0]);
  const [sent, setSent] = useState<{ channel: Channel; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel: Channel = submitter?.value === "whatsapp" ? "whatsapp" : "email";
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const text = [
      `¡Hola MINTHERA!${name ? ` Soy ${name}.` : ""}`,
      `Me interesa: ${topic}.`,
      "",
      message,
    ].join("\n");

    if (channel === "whatsapp") {
      window.open(
        `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      const subject = `${contactForm.subject} · ${topic}`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    }
    setSent({ channel, text });
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-[0_40px_120px_-40px_var(--color-violet-deep)] sm:p-7">
      <div className="flex items-start gap-4">
        <div className="min-w-0">
          <h2 id="contact-title" className="text-2xl font-semibold tracking-[-0.02em]">
            {contactForm.title}
          </h2>
          {!sent && <p className="mt-1.5 text-sm text-muted">{contactForm.lead}</p>}
        </div>
        <ModalClose />
      </div>

      {sent ? (
        <div className="mt-6" role="status">
          <p className="flex items-start gap-3 text-fg">
            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-lime/30 bg-lime/10">
              <Check aria-hidden="true" className="size-3.5 text-lime" strokeWidth={2.5} />
            </span>
            {contactForm.sent[sent.channel]}
          </p>
          <p className="mt-6 text-sm text-muted">
            {contactForm.sent.fallback}{" "}
            <a href={`mailto:${contact.email}`} className="text-primary hover:text-fg">
              {contact.email}
            </a>
            .
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => copy(sent.text)}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-fg transition-colors hover:border-primary/50"
            >
              {copied ? (
                <Check aria-hidden="true" className="size-4 text-lime" />
              ) : (
                <Copy aria-hidden="true" className="size-4 text-primary" />
              )}
              {copied ? "Copiado" : "Copiar mensaje"}
            </button>
            <button
              type="button"
              onClick={() => {
                setSent(null);
                setCopied(false);
              }}
              className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-fg"
            >
              Volver al formulario
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-5">
          <div>
            <label htmlFor={`${id}-name`} className="text-sm text-muted">
              Tu nombre
            </label>
            <input
              id={`${id}-name`}
              name="name"
              autoComplete="name"
              autoFocus
              className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-primary"
            />
          </div>

          <fieldset>
            <legend className="text-sm text-muted">¿Qué necesitás?</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {contactForm.topics.map((t) => (
                <label
                  key={t}
                  className={cn(
                    "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors has-focus-visible:outline-2 has-focus-visible:outline-primary",
                    t === topic
                      ? "border-primary bg-primary text-bg"
                      : "border-line text-muted hover:border-primary/50 hover:text-fg",
                  )}
                >
                  <input
                    type="radio"
                    name="topic"
                    value={t}
                    checked={t === topic}
                    onChange={() => setTopic(t)}
                    className="sr-only"
                  />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor={`${id}-message`} className="text-sm text-muted">
              Contanos un poco más
            </label>
            <textarea
              id={`${id}-message`}
              name="message"
              required
              rows={4}
              placeholder={contactForm.messagePlaceholder}
              className="mt-2 w-full resize-y rounded-xl border border-line bg-bg px-4 py-3 text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {contact.whatsapp && (
              <button
                type="submit"
                value="whatsapp"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 font-bold text-bg transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
              >
                <MessageCircle aria-hidden="true" className="size-4" strokeWidth={2.25} />
                Enviar por WhatsApp
              </button>
            )}
            <button
              type="submit"
              value="email"
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 font-bold transition-transform duration-300 ease-out-expo hover:-translate-y-0.5",
                contact.whatsapp ? "border border-line text-fg" : "bg-primary text-bg",
              )}
            >
              <Mail aria-hidden="true" className="size-4" strokeWidth={2.25} />
              Enviar por mail
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
