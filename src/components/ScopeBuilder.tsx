"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { scopeCopy, scopeGroups, type ScopeOption } from "@/content/scope";
import { cn } from "@/lib/utils";

/** Padding on the estimate, so the range reads as an estimate. */
const LOW = 0.8;
const HIGH = 1.4;

/**
 * A scope picker that writes the enquiry for you.
 *
 * Ticking options builds a summary and a rough range of weeks, and the button
 * drops the whole thing into the message box below, because staring at an empty
 * textarea is what stops most people from writing at all. It is deliberately
 * not a quote: the numbers are padded into a range and labelled as an estimate.
 */
export function ScopeBuilder({
  lang,
  onCompose,
}: {
  lang: Locale;
  /** Hands the written enquiry to the form underneath. */
  onCompose: (enquiry: { subject: string; message: string }) => void;
}) {
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setPicked((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  const chosen = useMemo(() => {
    const all = scopeGroups.flatMap((group) => group.options);
    return picked
      .map((id) => all.find((option) => option.id === id))
      .filter((option): option is ScopeOption => Boolean(option));
  }, [picked]);

  const weeks = chosen.reduce((total, option) => total + option.weeks, 0);
  const low = Math.max(1, Math.round(weeks * LOW));
  const high = Math.max(low + 1, Math.round(weeks * HIGH));
  const unit = high === 1 ? t(scopeCopy.week, lang) : t(scopeCopy.weeks, lang);
  const care = picked.includes("care");

  /** The message the contact form opens with. */
  const enquiry = () =>
    [
      `${t(scopeCopy.enquiryIntro, lang)}`,
      ...chosen.map((option) => `- ${t(option.label, lang)}`),
      "",
      `${t(scopeCopy.enquiryTimeline, lang)} ${low}-${high} ${unit}`,
    ].join("\n");

  const send = () => {
    onCompose({ subject: t(scopeCopy.enquiryTitle, lang), message: enquiry() });

    // The form is directly underneath, but on a phone it is a screen away.
    document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
      <div className="space-y-7">
        {scopeGroups.map((group) => (
          <fieldset key={group.id}>
            <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
              {t(group.label, lang)}
            </legend>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {group.options.map((option) => {
                const on = picked.includes(option.id);

                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(option.id)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                      on
                        ? "border-accent bg-accent text-accent-ink"
                        : "border-line-strong bg-surface text-ink-muted hover:border-accent/50 hover:text-accent",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "grid h-4 w-4 place-items-center rounded-full border transition-colors duration-200",
                        on ? "border-accent-ink/60 bg-accent-ink/15" : "border-line-strong",
                      )}
                    >
                      {on && <Check className="h-2.5 w-2.5" />}
                    </span>
                    {t(option.label, lang)}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {/* The running total. Sticky, so it stays beside the options on a long
          list rather than being scrolled past. */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
            {t(scopeCopy.summary, lang)}
          </h3>

          {chosen.length === 0 ? (
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-faint">
              {t(scopeCopy.empty, lang)}
            </p>
          ) : (
            <>
              <ul className="mt-4 space-y-2">
                <AnimatePresence initial={false}>
                  {chosen.map((option) => (
                    <motion.li
                      key={option.id}
                      layout
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink-muted"
                    >
                      <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent-wash">
                        <Check className="h-2.5 w-2.5 text-accent" />
                      </span>
                      {t(option.label, lang)}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              <div className="mt-6 border-t border-line pt-5">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  {t(scopeCopy.timeline, lang)}
                </span>
                <p className="mt-1.5 font-display text-2xl font-semibold text-accent">
                  {low}-{high} {unit}
                </p>
                {care && (
                  <p className="mt-1 text-sm text-ink-faint">{t(scopeCopy.ongoing, lang)}</p>
                )}
              </div>

              <button
                type="button"
                onClick={send}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[0.9375rem] font-medium text-accent-ink transition-colors hover:bg-accent-hover"
              >
                {t(scopeCopy.cta, lang)}
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          )}

          <p className="mt-5 text-xs leading-relaxed text-ink-faint">{t(scopeCopy.note, lang)}</p>
        </div>
      </div>
    </div>
  );
}
