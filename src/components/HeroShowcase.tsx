"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Lock, RotateCw } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { statusLabels, type Project } from "@/content/projects";
import { FloatingChips } from "./FloatingChips";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 10_000;
const MAX_CHIPS = 5;

/**
 * Featured projects shown in a browser chrome, cycling on a timer.
 *
 * Only projects with a cover image take part; anything still on a generated
 * gradient would look like a gap in the rotation. The address bar, the caption
 * and the floating chips all follow the slide, so the frame always describes
 * what is actually on screen.
 */
export function HeroShowcase({ projects, lang }: { projects: Project[]; lang: Locale }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (projects.length < 2) return;

    const timer = setInterval(() => setIndex((i) => (i + 1) % projects.length), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [projects.length]);

  const project = projects[index];
  if (!project) return null;

  const host = project.links.find((link) => link.kind === "site")?.label ?? project.title;
  const chips = project.tech.slice(0, MAX_CHIPS);

  return (
    <div className="relative">
      {/* Violet pool behind the screen. Gradient stops rather than a blur
          filter, which Firefox renders far more cheaply. */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-full"
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
          <div className="beam rounded-2xl shadow-lift transition-transform duration-500 ease-out [transform:rotateY(-7deg)_rotateX(3deg)] group-hover:[transform:rotateY(-2deg)_rotateX(1deg)]">
            <div className="relative z-10 overflow-hidden rounded-[calc(1rem-1px)] bg-surface">
              {/* Browser chrome, spelled out enough to read as a window. */}
              <div className="flex items-center gap-2.5 border-b border-line bg-surface-2 px-3 py-2.5">
                <span aria-hidden className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </span>

                <span aria-hidden className="flex items-center gap-1 text-ink-faint">
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <ChevronRight className="h-3.5 w-3.5" />
                  <RotateCw className="ml-0.5 h-3 w-3" />
                </span>

                <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1 text-[0.7rem] text-ink-faint">
                  <Lock className="h-2.5 w-2.5 shrink-0 text-emerald-500" />
                  <span className="truncate">{host}</span>
                </span>
              </div>

              <div className="relative aspect-[16/11] bg-surface-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={project.slug}
                    className="absolute inset-0"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                    animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={project.cover ?? ""}
                      alt={project.title}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 460px, 90vw"
                      className="object-cover object-top"
                    />
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <span className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
            <span className="font-medium text-ink">{project.title}</span>
            <span className="text-ink-faint">{t(statusLabels[project.status], lang)}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </Link>

        {/* Chips carry the stack of whatever is on screen, so they change
            with the slide. */}
        <FloatingChips key={project.slug} badges={chips} />
      </div>

      {/* Slide picker. Even dashes so it reads as a carousel at a glance. */}
      {projects.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {projects.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              aria-label={item.title}
              aria-current={i === index}
              onClick={() => setIndex(i)}
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
