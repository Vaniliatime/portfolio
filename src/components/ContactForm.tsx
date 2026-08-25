"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { profile } from "@/content/site";

/**
 * Posts to NEXT_PUBLIC_CONTACT_ENDPOINT when one is configured (Formspree,
 * Web3Forms, a PHP handler on SEOHOST, anything that accepts JSON). Without
 * an endpoint the form falls back to opening the visitor's mail client, so it
 * still works on a purely static deploy.
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

export function ContactForm({ lang }: { lang: Locale }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!endpoint) {
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
    <form onSubmit={onSubmit} className="space-y-4">
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
        <input name="subject" placeholder={copy.subject[lang]} className={field} />
      </label>

      <label className="block">
        <span className="sr-only">{copy.message[lang]}</span>
        <textarea name="message" required rows={6} placeholder={copy.message[lang]} className={field} />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[0.9375rem] font-medium text-accent-ink transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {status === "sending" ? copy.sending[lang] : copy.send[lang]}
      </button>

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
