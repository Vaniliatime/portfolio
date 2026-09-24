"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { hero, profile, stats } from "@/content/site";
import { showcaseProjects, type Project } from "@/content/projects";
import { ButtonLink } from "./Button";
import { CountUp } from "./CountUp";
import { HeroShowcase } from "./HeroShowcase";
import { ScrollCue } from "./ScrollCue";
import { cn } from "@/lib/utils";

/** Where the visit's running order is kept, so it survives a click away. */
const ORDER_KEY = "hero-order";

/**
 * The rotation after the first slide, shuffled.
 *
 * Fisher-Yates over the tail only: the lead project is the one thing on the
 * page a stranger sees first, so it is not left to chance. Everything behind
 * it is, which is the point: the second slide differs from visit to visit, and
 * the older work stops living permanently at the back of the queue.
 */
function shuffleTail(list: Project[]) {
  const [lead, ...rest] = list;

  for (let i = rest.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }

  return lead ? [lead, ...rest] : rest;
}

export function Hero({ lang }: { lang: Locale }) {
  const reduced = useReducedMotion();
  const lines = t(hero.headline, lang);
  const accentLine = t(hero.accentWord, lang);
  /*
   * The server and the first client render have to agree, so the order shipped
   * in the HTML is the resting one and the shuffle happens on mount. Nothing
   * moves on screen when it lands: the lead slide is the same either way, and
   * the reader is still on it.
   *
   * Per session rather than per page view, or the order would change under
   * somebody who opens a case study and comes back.
   */
  const [showcase, setShowcase] = useState(showcaseProjects);

  useEffect(() => {
    const bySlug = new Map(showcaseProjects.map((project) => [project.slug, project]));
    let slugs: string[] | null = null;

    try {
      const saved = sessionStorage.getItem(ORDER_KEY);
      const parsed: unknown = saved ? JSON.parse(saved) : null;
      // Only reused while it still describes the same set of projects: a
      // deploy that adds or drops one leaves a stale list behind.
      if (
        Array.isArray(parsed) &&
        parsed.length === showcaseProjects.length &&
        parsed.every((slug) => typeof slug === "string" && bySlug.has(slug))
      ) {
        slugs = parsed as string[];
      }
    } catch {
      // Private browsing can throw on read. An unshuffled order is fine.
    }

    const order = slugs
      ? slugs.map((slug) => bySlug.get(slug) as Project)
      : shuffleTail(showcaseProjects);

    try {
      sessionStorage.setItem(ORDER_KEY, JSON.stringify(order.map((project) => project.slug)));
    } catch {
      // Same again: the order simply is not remembered.
    }

    setShowcase(order);
  }, []);

  const rise = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
        };

  // The carousel's position lives here so the dashes and the timer agree on
  // which slide is showing.
  const [slide, setSlide] = useState(0);
  const selectSlide = useCallback((next: number) => setSlide(next), []);

  return (
    <section className="relative">
      <div className="shell relative z-10 py-16 md:py-24">
        {/*
         * Top aligned from lg up, not centred. The pitch column is taller than
         * the frame beside it, and centring pushed the frame well below the
         * headline on a laptop, where the difference in height is largest.
         */}
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-24">
          {/* ---- Left: the pitch, with the stats underneath ---------------- */}
          <div>
            <motion.div {...rise(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-wash px-3.5 py-1.5 text-sm font-medium text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {t(hero.availability, lang)}
              </span>
            </motion.div>

            <h1 className="mt-8 font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
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

            <motion.p {...rise(lines.length + 1)} className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">
              {t(hero.intro, lang)}
            </motion.p>

            <motion.div {...rise(lines.length + 2)} className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href={localePath(lang, "work")}>
                {t(hero.ctaPrimary, lang)}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={localePath(lang, "contact")} variant="secondary">
                {t(hero.ctaSecondary, lang)}
              </ButtonLink>
              <div className="ml-1 flex items-center gap-1">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="grid h-10 w-10 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-accent"
                >
                  <Github className="h-[1.15rem] w-[1.15rem]" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-accent"
                >
                  <Linkedin className="h-[1.15rem] w-[1.15rem]" />
                </a>
              </div>
            </motion.div>

            <motion.dl
              {...rise(lines.length + 3)}
              className="mt-12 flex max-w-lg flex-wrap gap-x-12 gap-y-5 border-t border-line pt-8"
            >
              {stats.map((stat) => (
                <div key={stat.value}>
                  <dt>
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      className="font-display text-2xl font-semibold text-accent"
                    />
                  </dt>
                  <dd className="mt-0.5 text-xs leading-snug text-ink-muted">{t(stat.label, lang)}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---- Right: the project carousel, chips and all -------------- */}
          {/*
           * Dropped by the height of the badge above the headline, so the frame
           * starts level with the first line of type rather than with the small
           * pill over it. Safe as a fixed offset: the badge is one line of
           * 14px type whatever the language does to it.
           */}
          <motion.div
            {...rise(2)}
            className="relative mx-auto w-full max-w-sm lg:mt-16 lg:max-w-none"
          >
            {showcase.length > 0 && (
              <HeroShowcase
                projects={showcase}
                lang={lang}
                index={slide}
                onSelect={selectSlide}
              />
            )}
          </motion.div>
        </div>

        {/* Says the page carries on, which a full-height hero does not. */}
        <ScrollCue lang={lang} />
      </div>
    </section>
  );
}
