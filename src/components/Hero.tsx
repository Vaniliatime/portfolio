"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { hero, profile, stats } from "@/content/site";
import { ButtonLink } from "./Button";
import { cn } from "@/lib/utils";

export function Hero({ lang }: { lang: Locale }) {
  const reduced = useReducedMotion();
  const lines = t(hero.headline, lang);
  const accentLine = t(hero.accentWord, lang);

  const rise = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="aurora" />
      <div aria-hidden className="dot-grid absolute inset-0 z-0" />

      <div className="shell relative z-10 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="max-w-4xl">
          <motion.div {...rise(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-wash px-3.5 py-1.5 text-sm font-medium text-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {t(hero.availability, lang)}
            </span>
          </motion.div>

          <h1 className="mt-7 font-display text-[2.6rem] font-semibold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
            {lines.map((line, i) => (
              <motion.span key={line} {...rise(i + 1)} className="block">
                <span
                  className={cn(
                    line === accentLine &&
                      "bg-gradient-to-r from-accent via-accent-soft to-accent bg-clip-text text-transparent",
                  )}
                >
                  {line}
                </span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            {...rise(lines.length + 1)}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl"
          >
            {t(hero.intro, lang)}
          </motion.p>

          <motion.div {...rise(lines.length + 2)} className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={localePath(lang, "work")}>
              {t(hero.ctaPrimary, lang)}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={localePath(lang, "contact")} variant="secondary">
              {t(hero.ctaSecondary, lang)}
            </ButtonLink>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-1 text-sm font-medium text-ink-muted transition-colors hover:text-accent"
            >
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </div>

        <motion.dl
          {...rise(lines.length + 3)}
          className="mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <div key={stat.value} className="bg-surface px-6 py-5">
              <dt className="font-display text-3xl font-semibold text-accent">{stat.value}</dt>
              <dd className="mt-1 text-sm leading-snug text-ink-muted">{t(stat.label, lang)}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
