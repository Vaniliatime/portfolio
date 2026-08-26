"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { hero, profile, stats } from "@/content/site";
import { featuredProjects } from "@/content/projects";
import { ButtonLink } from "./Button";
import { CountUp } from "./CountUp";
import { FloatingChips } from "./FloatingChips";
import { HeroShowcase } from "./HeroShowcase";
import { cn } from "@/lib/utils";

export function Hero({ lang }: { lang: Locale }) {
  const reduced = useReducedMotion();
  const lines = t(hero.headline, lang);
  const accentLine = t(hero.accentWord, lang);
  const badges = t(hero.badges, lang);
  // Only the ones with a real screenshot; a generated gradient would read as
  // a blank slide in the rotation.
  const showcase = featuredProjects.filter((project) => project.cover);

  const rise = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative overflow-hidden">
      <div className="shell relative z-10 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
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

          {/* ---- Right: the featured project, with chips floating around -- */}
          <motion.div {...rise(2)} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative">
              {showcase.length > 0 && <HeroShowcase projects={showcase} lang={lang} />}
              <FloatingChips badges={badges} />
            </div>

            {/* Below lg the chips cannot float clear of the frame, so they
                fall back to a plain row. */}
            <ul className="mt-4 flex flex-wrap justify-center gap-1.5 lg:hidden">
              {badges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-muted"
                >
                  {badge}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
