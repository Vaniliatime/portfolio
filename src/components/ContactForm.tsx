"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ClipboardCheck, Loader2, Paperclip, Send } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { profile, ui } from "@/content/site";
import { formNotice } from "@/content/legal";
import { scopeCopy } from "@/content/scope";
import { cn } from "@/lib/utils";

/**
 * Posts to NEXT_PUBLIC_CONTACT_ENDPOINT, which .env.production points at the
 * PHP handler shipped in public/api. Without an endpoint, which is the case in
 * development, the form falls back to opening the visitor's mail client, so it
 * is never a dead button.
 */
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status = "idle" | "sending" | "error";

/** Kept in step with the handler, which refuses anything past these. */
const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 8 * 1024 * 1024;
const ACCEPT = ".pdf,.png,.jpg,.jpeg,.webp,.gif,.txt,.doc,.docx,.odt,.zip";

const copy = {
  name: { en: "Your name", pl: "Twoje imię" },
  email: { en: "Email", pl: "E-mail" },
  subject: { en: "What is it about?", pl: "Czego dotyczy?" },
  message: { en: "Tell me about the project", pl: "Opowiedz o projekcie" },
  send: { en: "Send message", pl: "Wyślij wiadomość" },
  sending: { en: "Sending…", pl: "Wysyłam…" },
  error: {
    en: "That did not go through. Email me directly instead.",
    pl: "Nie udało się wysłać. Napisz proszę bezpośrednio na maila.",
  },
  attach: { en: "Attach files", pl: "Dołącz pliki" },
  attachHint: {
    en: "Optional. Up to five files, 8 MB in total: a brief, a sketch, screenshots of what is broken.",
    pl: "Opcjonalnie. Do pięciu plików, łącznie 8 MB: brief, szkic, zrzuty tego, co nie działa.",
  },
  attachTooBig: {
    en: "That is over the limit. Five files, 8 MB in total.",
    pl: "To przekracza limit. Pięć plików, łącznie 8 MB.",
  },
  attachRemove: { en: "Remove", pl: "Usuń" },
} as const;

interface ContactFormProps {
  lang: Locale;
  /** Written by the scope picker above, when somebody has used it. */
  scope?: { subject: string; message: string } | null;
}

export function ContactForm({ lang, scope }: ContactFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState(false);

  const pickFiles = (chosen: FileList | null) => {
    const list = Array.from(chosen ?? []);
    const total = list.reduce((sum, file) => sum + file.size, 0);

    if (list.length > MAX_FILES || total > MAX_TOTAL_BYTES) {
      setFileError(true);
      setFiles([]);
      return;
    }

    setFileError(false);
    setFiles(list);
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    // The file input is read from state, not from here, where it would arrive
    // as a File pretending to be a string.
    delete data.files;

    if (!endpoint) {
      // The honeypot belongs to the handler, not to a mail draft.
      delete data.company;

      const body = `${data.message}\n\n${data.name} (${data.email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        data.subject || "Project enquiry",
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      /*
       * Two shapes on purpose. Without attachments the request stays the plain
       * JSON post that is known to work; with them it has to be multipart, and
       * the handler accepts either.
       */
      let response: Response;

      if (files.length > 0) {
        const payload = new FormData();
        for (const [key, value] of Object.entries(data)) payload.append(key, value);
        for (const file of files) payload.append("files[]", file, file.name);

        response = await fetch(endpoint, { method: "POST", body: payload });
      } else {
        response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
      }

      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      // A page nobody can scroll past, rather than a line of green text under
      // a button that is already off the bottom of a phone screen.
      router.push(localePath(lang, "sent"));
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 text-[0.9375rem] text-ink placeholder:text-ink-faint transition-colors focus:border-accent focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="relative space-y-4">
      {/* Says out loud that something was carried over, so the filled fields
          below read as deliberate rather than as a browser autofill. */}
      {scope && (
        <p className="flex items-start gap-2.5 rounded-xl border border-accent/25 bg-accent-wash px-4 py-3 text-sm leading-relaxed text-accent">
          <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0" />
          {t(scopeCopy.prefilled, lang)}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">{copy.name[lang]}</span>
          <input name="name" required autoComplete="name" placeholder={copy.name[lang]} className={field} />
        </label>
        <label className="block">
          <span className="sr-only">{copy.email[lang]}</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={copy.email[lang]}
            className={field}
          />
        </label>
      </div>

      <label className="block">
        <span className="sr-only">{copy.subject[lang]}</span>
        <input
          name="subject"
          // Keyed so a value arriving after mount actually lands in the field:
          // an uncontrolled input ignores a changed defaultValue.
          key={scope ? "prefilled" : "blank"}
          defaultValue={scope?.subject}
          placeholder={copy.subject[lang]}
          className={field}
        />
      </label>

      {/*
        * Honeypot. Hidden from people and from screen readers, and left out of
        * the tab order; anything that fills it in is walking the fields, and
        * the handler drops the message without saying why.
        */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="block">
        <span className="sr-only">{copy.message[lang]}</span>
        <textarea
          name="message"
          key={scope ? "prefilled" : "blank"}
          defaultValue={scope?.message}
          required
          rows={6}
          placeholder={copy.message[lang]}
          className={field}
        />
      </label>

      {/* Optional, and last, so it never looks like something required. */}
      <div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-line-strong px-4 py-3 text-sm font-medium text-ink-muted transition-colors hover:border-accent/50 hover:text-accent">
          <Paperclip className="h-4 w-4" />
          {copy.attach[lang]}
          <input
            type="file"
            name="files"
            multiple
            accept={ACCEPT}
            className="sr-only"
            onChange={(event) => pickFiles(event.target.files)}
          />
        </label>

        {files.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {files.map((file) => (
              <li key={file.name} className="flex items-center gap-2 text-sm text-ink-muted">
                <Paperclip className="h-3.5 w-3.5 shrink-0 text-accent" />
                <span className="truncate">{file.name}</span>
                <span className="shrink-0 text-xs text-ink-faint">
                  {Math.max(1, Math.round(file.size / 1024))} KB
                </span>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => setFiles([])}
                className="text-xs font-medium text-ink-faint underline hover:text-accent"
              >
                {copy.attachRemove[lang]}
              </button>
            </li>
          </ul>
        )}

        <p
          className={cn(
            "mt-2 text-xs leading-relaxed",
            fileError ? "font-medium text-red-600 dark:text-red-400" : "text-ink-faint",
          )}
        >
          {fileError ? copy.attachTooBig[lang] : copy.attachHint[lang]}
        </p>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[0.9375rem] font-medium text-accent-ink transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {status === "sending" ? copy.sending[lang] : copy.send[lang]}
      </button>

      {/* Under the button, where it is read rather than clicked past. */}
      <p className="text-xs leading-relaxed text-ink-faint">
        {t(formNotice, lang)}{" "}
        <Link href={localePath(lang, "privacy")} className="underline hover:text-accent">
          {t(ui.privacyLink, lang)}
        </Link>
      </p>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
          {copy.error[lang]}
        </p>
      )}
    </form>
  );
}
