"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ClipboardCheck, Loader2, Send } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { profile, ui } from "@/content/site";
import { formNotice } from "@/content/legal";
import { scopeCopy } from "@/content/scope";

/**
 * Posts to NEXT_PUBLIC_CONTACT_ENDPOINT, which .env.production points at the
 * PHP handler shipped in public/api. Without an endpoint, which is the case in
 * development, the form falls back to opening the visitor's mail client, so it
 * is never a dead button.
 */
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "error";

const copy = {
  name: { en: "Your name", pl: "Twoje imię" },
  email: { en: "Email", pl: "E-mail" },
  subject: { en: "What is it about?", pl: "Czego dotyczy?" },
  message: { en: "Tell me about the project", pl: "Opowiedz o projekcie" },
  send: { en: "Send message", pl: "Wyślij wiadomość" },
  sending: { en: "Sending…", pl: "Wysyłam…" },
  sent: { en: "Thanks, I'll get back to you shortly.", pl: "Dzięki, odezwę się wkrótce." },
  error: {
    en: "That did not go through. Email me directly instead.",
    pl: "Nie udało się wysłać. Napisz proszę bezpośrednio na maila.",
  },
} as const;

interface ContactFormProps {
  lang: Locale;
  /** Written by the scope picker above, when somebody has used it. */
  scope?: { subject: string; message: string } | null;
}

export function ContactForm({ lang, scope }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

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
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
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

      {status === "sent" && (
        <p role="status" className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
          {copy.sent[lang]}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
          {copy.error[lang]}
        </p>
      )}
    </form>
  );
}
