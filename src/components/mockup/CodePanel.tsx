"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Code2, X } from "lucide-react";
import { useStory } from "@/components/story/StoryProvider";
import { snippets } from "./snippets";

/* Preferencia abierto/cerrado, recordada en el navegador (con respaldo en
   memoria si el storage no está disponible). */
const STORAGE_KEY = "minthera:code-panel";
const listeners = new Set<() => void>();
let memoryOpen: boolean | null = null;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readOpen() {
  if (memoryOpen !== null) return memoryOpen;
  try {
    return localStorage.getItem(STORAGE_KEY) !== "closed";
  } catch {
    return true;
  }
}

function writeOpen(open: boolean) {
  memoryOpen = open;
  try {
    localStorage.setItem(STORAGE_KEY, open ? "open" : "closed");
  } catch {}
  listeners.forEach((listener) => listener());
}

/** Resaltado mínimo: tags y keywords en lavanda, strings en lima. */
const TOKEN =
  /(\/\/.*$)|("[^"]*"|'[^']*')|(<\/?[A-Za-z][\w.]*|\/?>)|\b(const|return|export|default|function|await|true)\b|([A-Za-z-]+)(?==)|(\$)|(✓.*$)/g;

function highlight(line: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of line.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(line.slice(last, i));
    const [text, comment, string, tag, keyword, attr, prompt, done] = m;
    const className = comment
      ? "text-muted/60 italic"
      : string || done
        ? "text-lime"
        : tag || keyword || prompt
          ? "text-primary"
          : attr
            ? "text-fg"
            : undefined;
    out.push(
      <span key={i} className={className}>
        {text}
      </span>,
    );
    last = i + text.length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

/**
 * Panel semitransparente en una esquina del mockup que muestra el código de la
 * etapa activa. Se puede ocultar; la preferencia se recuerda en el navegador.
 */
export function CodePanel() {
  const { active, reduced } = useStory();
  const open = useSyncExternalStore(subscribe, readOpen, () => true);
  const snippet = snippets[active] ?? snippets[0];
  const toggle = () => writeOpen(!open);

  return (
    <div className="absolute top-[calc(100%-2.5rem)] -left-6 z-10 w-[min(50%,18rem)]">
      <AnimatePresence initial={false} mode="popLayout">
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="origin-bottom-left overflow-hidden rounded-xl border border-line bg-bg/75 shadow-2xl shadow-black/40 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 border-b border-line px-3 py-2">
              <Code2 aria-hidden="true" className="size-3.5 text-primary" strokeWidth={1.75} />
              <span aria-hidden="true" className="font-mono text-[0.7rem] text-muted">
                {snippet.file}
              </span>
              <button
                type="button"
                onClick={toggle}
                aria-expanded="true"
                aria-label="Ocultar panel de código"
                className="ml-auto grid size-6 place-items-center rounded-md text-muted transition-colors hover:bg-surface hover:text-fg"
              >
                <X aria-hidden="true" className="size-3.5" />
              </button>
            </div>
            <pre aria-hidden="true" className="h-31 overflow-hidden px-3 py-2.5 font-mono text-[0.66rem] leading-[1.6] text-muted">
              <AnimatePresence mode="wait" initial={false}>
                <motion.code
                  key={active}
                  className="block"
                  initial="hidden"
                  animate="shown"
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ staggerChildren: reduced ? 0 : 0.06 }}
                >
                  {snippet.code.split("\n").map((line, i) => (
                    <motion.span
                      key={i}
                      className="block whitespace-pre"
                      variants={{
                        hidden: { opacity: 0, x: -6 },
                        shown: { opacity: 1, x: 0 },
                      }}
                    >
                      {highlight(line)}
                    </motion.span>
                  ))}
                </motion.code>
              </AnimatePresence>
            </pre>
          </motion.div>
        ) : (
          <motion.button
            key="toggle"
            type="button"
            onClick={toggle}
            aria-expanded="false"
            aria-label="Mostrar panel de código"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="grid size-10 place-items-center rounded-full border border-line bg-bg/75 text-primary backdrop-blur-md transition-colors hover:border-primary/50"
          >
            <Code2 aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
