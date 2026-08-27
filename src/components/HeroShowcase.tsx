"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { statusLabels, type Project } from "@/content/projects";
import { BrowserFrame } from "./BrowserFrame";
import { FrameScroll, scrollPlan } from "./FrameScroll";
import { FloatingChips } from "./FloatingChips";
import { cn } from "@/lib/utils";

/** Beat between a page finishing its scroll and the next project arriving. */
const REST_MS = 2_000;
const MAX_CHIPS = 5;
/** The frame's window, height over width. Matches the aspect class below. */
const FRAME_RATIO = 11 / 16;

/**
 * Featured projects shown in a browser chrome, cycling on a timer.
 *
 * Only projects with a cover image take part; anything still on a generated
 * gradient would read as a gap in the rotation. The address bar, the caption
 * and the floating chips all follow the slide, so the frame always describes
 * what is actually on screen.
 */
interface HeroShowcaseProps {
  projects: Project[];
  lang: Locale;
  /** Owned by the hero, so the timer and the dashes cannot disagree. */
  index: number;
  onSelect: (index: number) => void;
}

export function HeroShowcase({ projects, lang, index, onSelect }: HeroShowcaseProps) {
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, { margin: "-15% 0px -15% 0px" });

  /*
   * Each project is held for as long as its own page takes to scroll, plus a
   * beat at the foot of it. Pages differ wildly in length, and one interval for
   * all of them left the short ones waiting at the bottom with nothing to do.
   */
  const plan = scrollPlan(projects[index]?.coverTall, FRAME_RATIO);

  // Stops advancing once scrolled past, so nobody comes back to the hero and
  // finds it on a slide they never saw change.
  useEffect(() => {
    if (projects.length < 2 || !inView) return;

    const timer = setTimeout(
      () => onSelect((index + 1) % projects.length),
      plan.seconds * 1000 + REST_MS,
    );
    return () => clearTimeout(timer);
  }, [projects.length, inView, index, onSelect, plan.seconds]);

  const project = projects[index];
  if (!project) return null;

  // Whatever is coming next, fetched while the current one is still on screen.
  const upcoming = projects[(index + 1) % projects.length];
  const upcomingSrc = upcoming?.coverTall?.src ?? upcoming?.cover;

  const host = project.links.find((link) => link.kind === "site")?.label ?? project.title;
  const chips = project.tech.slice(0, MAX_CHIPS);

  return (
    <div ref={frameRef} className="relative">
      {/* Violet pool behind the screen. Gradient stops rather than a blur
          filter, which Firefox renders far more cheaply. Never clickable: it
          paints over the dashes below and swallowed their clicks. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-full"
        style={{
          background:
            "radial-gradient(circle closest-side, var(--blob-core), var(--blob-mid) 50%, transparent 75%)",
        }}
      />

      <div className="relative">
        <Link
          href={localePath(lang, `work/${project.slug}`)}
          className="group relative block [perspective:1400px]"
          aria-label={project.title}
        >
          <div
            className="beam rounded-2xl shadow-lift"
            style={reduced ? undefined : { transform: "rotateY(-7deg) rotateX(3deg)" }}
          >
            <BrowserFrame host={host} typed className="relative z-10 rounded-[calc(1rem-1px)]">
              <div className="relative aspect-[16/11] overflow-hidden bg-surface-2">
                {/*
                 * Sync, not popLayout: both frames stay in place and overlap
                 * while one fades into the other. popLayout pulled the outgoing
                 * one out of flow, which read as a hard cut.
                 */}
                <AnimatePresence initial={false}>
                  <motion.span
                    key={project.slug}
                    className="absolute inset-0 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    /*
                     * The outgoing frame holds fully opaque underneath and is
                     * simply dropped once it is covered. Fading both at once
                     * meant that halfway through neither was opaque and the
                     * card's own background showed through: that flash is what
                     * read as a hard cut, the same trap as the work cards.
                     */
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.25, delay: reduced ? 0 : 1.15 },
                    }}
                    transition={{ duration: reduced ? 0.2 : 1.2, ease: "linear" }}
                  >
                    {/* A full-page capture gets scrolled through for as long as
                        the slide is up. Anything else is a still cover. */}
                    {project.coverTall ? (
                      <FrameScroll
                        cover={project.coverTall}
                        alt={project.title}
                        plan={plan}
                        priority={index === 0}
                      />
                    ) : (
                      <Image
                        src={project.cover ?? ""}
                        alt={project.title}
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1024px) 460px, 90vw"
                        className="object-cover object-top"
                      />
                    )}
                  </motion.span>
                </AnimatePresence>
              </div>
            </BrowserFrame>
          </div>

          <span className="relative mt-4 flex h-5 items-center gap-2 text-sm text-ink-muted">
            <AnimatePresence initial={false}>
              <motion.span
                key={project.slug}
                className="absolute inset-y-0 left-0 flex items-center gap-2"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: reduced ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="whitespace-nowrap font-medium text-ink">{project.title}</span>
                <span className="whitespace-nowrap text-ink-faint">
                  {t(statusLabels[project.status], lang)}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.span>
            </AnimatePresence>
          </span>
        </Link>

        {/* Chips carry the stack of whatever is on screen, so they change with
            the slide. One set at a time: two overlapping sets on the same five
            spots read as a glitch, so the old one clears out first. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FloatingChips badges={chips} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/*
       * The next screenshot, fetched now rather than at the moment it is needed.
       * These captures are whole pages and the biggest is a quarter of a
       * megabyte: mounting one cold meant the incoming frame faded up empty and
       * the picture appeared afterwards, which is what read as a hard cut.
       */}
      {upcomingSrc && (
        <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={upcomingSrc} alt="" />
        </div>
      )}

      {/* Slide picker. Even dashes so it reads as a carousel at a glance, and
          above the glow, which would otherwise take the clicks. */}
      {projects.length > 1 && (
        <div className="relative z-20 mt-5 flex items-center justify-center gap-2">
          {projects.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              aria-label={item.title}
              aria-current={i === index}
              onClick={() => onSelect(i)}
              className={cn(
                "h-1.5 w-10 rounded-full transition-colors duration-300",
                i === index ? "bg-accent" : "bg-line-strong hover:bg-accent/50",
              )}
            />
          ))}
        </div>
      )}

      {/* Below lg the chips cannot float clear of the frame. */}
      <ul className="mt-4 flex flex-wrap justify-center gap-1.5 lg:hidden">
        {chips.map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-muted"
          >
            {chip}
          </li>
        ))}
      </ul>
    </div>
  );
}
