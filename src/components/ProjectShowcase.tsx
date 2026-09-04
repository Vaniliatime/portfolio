"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { galleryOf, type Project } from "@/content/projects";
import { ui } from "@/content/site";
import { FrameScroll, scrollPlan } from "./FrameScroll";
import { ProjectCover } from "./ProjectCover";
import { cn } from "@/lib/utils";

/** The frame's window, height over width. Matches the aspect class below. */
const FRAME_RATIO = 9 / 16;
/** Movement past this, and across rather than down, counts as a swipe. */
const SWIPE_PX = 40;

/**
 * The screenshot at the top of a case study.
 *
 * Two things were missing here. A project with a full-page capture had it
 * scrolling in the hero, at thumbnail size, and then sat still on its own page
 * where there is four times the room for it. And a project with a dozen
 * screenshots showed exactly one of them until you scrolled to the gallery.
 *
 * So the tall capture scrolls here too, once the reader is actually looking at
 * it, and the arrows step through the rest without leaving the top of the page.
 */
export function ProjectShowcase({ project, lang }: { project: Project; lang: Locale }) {
  const shots = galleryOf(project);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });

  /*
   * The tall capture is a frame of its own, ahead of the stills. Where there is
   * none, the stills are all there is, and where there are no stills either the
   * generated cover stands in.
   */
  const frames: ("tall" | string)[] = [
    ...(project.coverTall ? (["tall"] as const) : []),
    ...(shots.length > 0 ? shots : project.cover ? [project.cover] : []),
  ];

  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);

  // Drop the outgoing frame once the incoming one has covered it.
  useEffect(() => {
    if (previous === null) return;
    const timer = setTimeout(() => setPrevious(null), 1100);
    return () => clearTimeout(timer);
  }, [previous, index]);

  if (frames.length === 0) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-card">
        <ProjectCover project={project} priority sizes="(min-width: 1280px) 1200px, 100vw" />
      </div>
    );
  }

  const step = (delta: number) => {
    const next = (index + delta + frames.length) % frames.length;
    if (next === index) return;
    setPrevious(index);
    setIndex(next);
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const point = event.touches[0];
    start.current = point ? { x: point.clientX, y: point.clientY } : null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const from = start.current;
    const point = event.changedTouches[0];
    start.current = null;
    if (!from || !point) return;

    const dx = point.clientX - from.x;
    const dy = point.clientY - from.y;
    // Across rather than down, or the page is being scrolled, not swiped.
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
  };

  const frame = (at: number, layer: "under" | "over") => {
    const shot = frames[at];

    if (shot === "tall" && project.coverTall) {
      return (
        <div
          key={`${layer}-tall`}
          className={cn("absolute inset-0 overflow-hidden", layer === "over" && previous !== null && "slide-fade")}
        >
          <FrameScroll
            cover={project.coverTall}
            alt={project.title}
            plan={scrollPlan(project.coverTall, FRAME_RATIO)}
            priority
            live={inView && !reduced}
          />
        </div>
      );
    }

    return (
      <Image
        key={`${layer}-${at}`}
        src={shot}
        alt={project.title}
        fill
        priority={at === 0}
        sizes="(min-width: 1280px) 1200px, 100vw"
        className={cn(
          "object-cover object-top",
          layer === "over" && previous !== null && "slide-fade",
        )}
      />
    );
  };

  return (
    <div
      ref={ref}
      className="group relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-card"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {previous !== null && frame(previous, "under")}
      {frame(index, "over")}

      {frames.length > 1 && (
        <>
          {/* Always there on a touch device, and on hover with a pointer: an
              arrow that only appears on hover is one nobody on a phone finds. */}
          <button
            type="button"
            aria-label={t(ui.previous, lang)}
            onClick={() => step(-1)}
            className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/90 text-ink-muted shadow-card transition-all hover:border-accent/50 hover:text-accent md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={t(ui.next, lang)}
            onClick={() => step(1)}
            className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/90 text-ink-muted shadow-card transition-all hover:border-accent/50 hover:text-accent md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <span className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink/55 px-2.5 py-1.5">
            {frames.map((shot, i) => (
              <button
                key={typeof shot === "string" ? shot : `tall-${i}`}
                type="button"
                aria-label={`${project.title} ${i + 1}`}
                aria-current={i === index}
                onClick={() => {
                  if (i === index) return;
                  setPrevious(index);
                  setIndex(i);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === index ? "w-5 bg-accent-soft" : "w-1.5 bg-paper/45 hover:bg-paper/80",
                )}
              />
            ))}
          </span>
        </>
      )}
    </div>
  );
}
