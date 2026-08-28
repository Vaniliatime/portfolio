"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "motion/react";
import { Check, Heart, Loader2 } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { serviceDemo } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * A working miniature of what each service actually is.
 *
 * The hero earns its attention by showing a real page rather than describing
 * one; these do the same job for the four services. Everything moves on
 * transform and opacity alone, every loop is staggered by delay and duration so
 * the four panels never fall into step, and nothing runs until the card is
 * actually on screen.
 */
export function ServiceDemo({ id, lang }: { id: string; lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });

  const demos: Record<string, ReactNode> = {
    websites: <WebsiteDemo lang={lang} />,
    apps: <AppDemo lang={lang} />,
    invitations: <InvitationDemo lang={lang} />,
    support: <SupportDemo lang={lang} />,
  };

  const demo = demos[id];
  if (!demo) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "relative mt-6 h-[8.25rem] overflow-hidden rounded-xl border border-line bg-surface-2/70 p-3",
        inView && "demo-live",
      )}
    >
      {demo}
    </div>
  );
}

/*
 * Inside one demo every element shares a cycle and differs only by delay,
 * because they are telling one story and would otherwise drift apart into
 * nonsense. It is the four demos that are given different cycle lengths, so
 * the panels never fall into step with each other.
 */
const beat = (i: number, duration: number) =>
  ({ "--demo-delay": `${(i * 0.28).toFixed(2)}s`, "--demo-duration": `${duration}s` }) as CSSProperties;

/* -------------------------------------------------------------------------
   Business websites: a page assembling itself out of blocks.
------------------------------------------------------------------------- */
function WebsiteDemo({ lang }: { lang: Locale }) {
  const copy = serviceDemo.websites;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface">
      <div className="flex items-center gap-1 border-b border-line px-2 py-1.5">
        <span className="h-1 w-1 rounded-full bg-line-strong" />
        <span className="h-1 w-1 rounded-full bg-line-strong" />
        <span className="ml-1 h-1.5 flex-1 rounded-full bg-surface-2" />
        <span className="text-[0.5rem] font-medium text-ink-faint">{t(copy.nav, lang)}</span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-2">
        <div className="demo-anim demo-rise flex items-center gap-2" style={beat(0, 5.4)}>
          <span className="text-[0.6rem] font-semibold text-ink">{t(copy.headline, lang)}</span>
          <span className="h-1 flex-1 rounded-full bg-surface-2" />
        </div>
        <div className="demo-anim demo-rise h-1.5 w-3/4 rounded-full bg-surface-2" style={beat(1, 5.4)} />
        <div
          className="demo-anim demo-rise w-fit rounded-full bg-accent px-2 py-0.5 text-[0.5rem] font-semibold text-accent-ink"
          style={beat(2, 5.4)}
        >
          {t(copy.cta, lang)}
        </div>
        <div className="mt-auto grid grid-cols-3 gap-1.5">
          {[3, 4, 5].map((i) => (
            <div
              key={i}
              className="demo-anim demo-rise h-7 rounded-md border border-line bg-surface-2/80"
              style={beat(i, 5.4)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Web applications: a panel with numbers behind it.
------------------------------------------------------------------------- */
function AppDemo({ lang }: { lang: Locale }) {
  const copy = serviceDemo.apps;
  const bars = [38, 52, 44, 68, 60, 82, 74];

  return (
    <div className="flex h-full flex-col rounded-lg border border-line bg-surface p-2.5">
      <div className="flex items-baseline justify-between">
        <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-ink-faint">
          {t(copy.label, lang)}
        </span>
        <span className="demo-anim demo-fade text-[0.55rem] font-semibold text-emerald-500" style={beat(2, 4.6)}>
          {t(copy.delta, lang)}
        </span>
      </div>

      <div className="mt-auto flex h-14 items-end gap-1.5">
        {bars.map((height, i) => (
          <span
            key={height}
            className="demo-anim demo-grow flex-1 rounded-sm bg-accent/25"
            style={{ ...beat(i, 4.2), height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Interactive invitations: an RSVP answering itself.
------------------------------------------------------------------------- */
function InvitationDemo({ lang }: { lang: Locale }) {
  const copy = serviceDemo.invitations;

  return (
    <div className="flex h-full flex-col justify-center gap-2 rounded-lg border border-line bg-surface px-3 py-2.5">
      <div className="flex items-center gap-1.5">
        <Heart className="demo-anim demo-beat h-3 w-3 text-accent" style={beat(0, 3.4)} />
        <span className="text-[0.65rem] font-semibold text-ink">{t(copy.question, lang)}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="demo-anim demo-pick inline-flex items-center gap-1 rounded-full border border-accent/40 px-2 py-0.5 text-[0.55rem] font-semibold text-accent">
          <Check className="h-2.5 w-2.5" />
          {t(copy.yes, lang)}
        </span>
        <span className="rounded-full border border-line px-2 py-0.5 text-[0.55rem] font-medium text-ink-faint">
          {t(copy.no, lang)}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-[0.55rem] text-ink-faint">
        {t(copy.guests, lang)}
        <span className="relative inline-flex h-3 w-2 justify-center">
          <span className="demo-anim demo-count-out absolute font-semibold text-ink">1</span>
          <span className="demo-anim demo-count-in absolute font-semibold text-ink">2</span>
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Support: a maintenance run reporting in.
------------------------------------------------------------------------- */
function SupportDemo({ lang }: { lang: Locale }) {
  const copy = serviceDemo.support;

  return (
    <div className="flex h-full flex-col justify-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2.5">
      {copy.rows.map((row, i) => (
        <div key={row.en} className="flex items-center gap-2 text-[0.6rem]">
          <span className="relative grid h-3 w-3 shrink-0 place-items-center">
            <Loader2
              className="demo-anim demo-spinner absolute h-3 w-3 text-ink-faint"
              style={beat(i, 4.8)}
            />
            <Check
              className="demo-anim demo-settle absolute h-3 w-3 text-emerald-500"
              style={beat(i, 4.8)}
            />
          </span>
          <span className="text-ink-muted">{t(row, lang)}</span>
          <span className="ml-auto font-semibold text-ink-faint">
            {i === copy.rows.length - 1 ? copy.uptime : ""}
          </span>
        </div>
      ))}

      <span className="mt-1 h-1 overflow-hidden rounded-full bg-surface-2">
        <span className="demo-anim demo-fill block h-full w-full rounded-full bg-emerald-500/70" style={beat(3, 4.8)} />
      </span>
    </div>
  );
}
