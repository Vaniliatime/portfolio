"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Github, Linkedin, Sparkles } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { hero, profile, stats } from "@/content/site";
import { ButtonLink } from "./Button";
import { cn } from "@/lib/utils";

export function Hero({ lang }: { lang: Locale }) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const lines = t(hero.headline, lang);
  const accentLine = t(hero.accentWord, lang);
  const badges = t(hero.badges, lang);

  // Feed the pointer position to the CSS light layers. Written straight to the
  // element rather than through state so it never re-renders on mouse move.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
        el.style.setProperty("--spot", "1");
      });
    };

    const onLeave = () => el.style.setProperty("--spot", "0");

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  const rise = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div aria-hidden className="dot-grid absolute inset-0 z-0" />
      <div aria-hidden className="hero-blob" />
      <div aria-hidden className="hero-emboss" />

      <div className="shell relative z-10 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
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

            <h1 className="mt-6 font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
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

            <motion.p {...rise(lines.length + 1)} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              {t(hero.intro, lang)}
            </motion.p>

            <motion.div {...rise(lines.length + 2)} className="mt-8 flex flex-wrap items-center gap-3">
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
              className="mt-10 flex max-w-lg flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6"
            >
              {stats.map((stat) => (
                <div key={stat.value}>
                  <dt className="font-display text-2xl font-semibold text-accent">{stat.value}</dt>
                  <dd className="mt-0.5 text-xs leading-snug text-ink-muted">{t(stat.label, lang)}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---- Right: portrait, chips and what I'm on now ---------------- */}
          <motion.div {...rise(2)} className="relative mx-auto w-full max-w-xs lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-2 shadow-lift">
              <div className="relative aspect-square overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-accent-wash to-surface-2">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 360px, 80vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <motion.ul {...rise(3)} className="mt-4 flex flex-wrap justify-center gap-1.5">
              {badges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border border-line bg-surface/80 px-3 py-1 text-xs font-medium text-ink-muted backdrop-blur"
                >
                  {badge}
                </li>
              ))}
            </motion.ul>

            <motion.div {...rise(4)} className="mt-4 rounded-2xl border border-line bg-surface/80 p-5 backdrop-blur">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                {t(hero.nowLabel, lang)}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(hero.nowValue, lang)}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
