import Link from "next/link";
import { ArrowRight, ExternalLink, Layers } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { categories, galleryOf, statusLabels, type Project } from "@/content/projects";
import { ui } from "@/content/site";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { ProjectCover } from "./ProjectCover";
import { CardSlideshow } from "./CardSlideshow";

/** Solid fills: the outlined version disappeared against a screenshot. */
const statusStyles: Record<Project["status"], { pill: string; dot: string; pulse: boolean }> = {
  live: { pill: "bg-emerald-500 text-white", dot: "bg-white", pulse: true },
  wip: { pill: "bg-amber-500 text-white", dot: "bg-white", pulse: true },
  // Finished and handed over: the accent, because it is a good outcome, and no
  // pulse, because nothing about it is still moving.
  done: { pill: "bg-accent text-accent-ink", dot: "bg-accent-ink/80", pulse: false },
  archived: { pill: "bg-ink/75 text-paper", dot: "bg-paper/70", pulse: false },
};

interface ProjectCardProps {
  project: Project;
  lang: Locale;
  /** Large cards lead the featured grid. */
  size?: "lg" | "md";
  priority?: boolean;
  /** Offsets the arrow nudge, so a row of cards is never in step. */
  index?: number;
}

export function ProjectCard({ project, lang, size = "md", priority, index = 0 }: ProjectCardProps) {
  const href = localePath(lang, `work/${project.slug}`);
  const category = categories.find((c) => c.id === project.category);
  const large = size === "lg";
  const status = statusStyles[project.status];
  // Somewhere public to send people, if the project has one at all.
  const sites = project.links.filter((link) => link.kind === "site" && link.href);
  const live = sites[0]?.href;
  const siteCount = sites.length;
  const coverSizes = large ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 400px, 100vw";
  // Cover first, then whatever the gallery adds, so the card opens on the
  // shot the project leads with.
  const shots = galleryOf(project);
  const frames = shots.length ? shots : project.cover ? [project.cover] : [];

  /*
   * Card heights match without anything stretching: the thumbnail has a fixed
   * ratio and the text block a fixed height, so there is no slack to show as a
   * gap. The min-heights below hold two lines at each type size.
   */
  return (
    <div
      className="card-edge group h-full rounded-2xl shadow-card transition-shadow duration-300 hover:shadow-lift"
      // Offsets so no two neighbours nudge at the same moment.
      style={
        {
          "--nudge-delay": `${((index % 5) * -1.8).toFixed(1)}s`,
          "--edge-angle": `${135 + (index % 4) * 45}deg`,
        } as CSSProperties
      }
    >
        <article className="card-sheen relative flex h-full flex-col overflow-hidden rounded-[calc(1rem-1px)] bg-surface">
          {/*
           * A hairline where the picture ends. Half these screenshots are of
           * pages with white backgrounds, and against a white card the shot
           * simply ran into the text with no edge at all. Violet, and fading
           * out at both ends, so it reads as the edge of the picture rather
           * than as a rule drawn across the card.
           */}
          <div
            className={cn(
              "relative overflow-hidden bg-surface-2",
              "after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-px after:bg-gradient-to-r after:from-accent/0 after:via-accent/55 after:to-accent/0 after:content-['']",
              large ? "aspect-[16/10]" : "aspect-[4/3]",
            )}
          >
            {frames.length > 1 ? (
              <CardSlideshow
                images={frames}
                alt={project.title}
                priority={priority}
                sizes={coverSizes}
                offset={index}
                href={href}
                className="group-hover:scale-[1.04]"
              />
            ) : (
              <ProjectCover
                project={project}
                priority={priority}
                className="transition-transform duration-500 group-hover:scale-[1.04]"
                sizes={coverSizes}
              />
            )}

            {/* Opposite corner to the status, because it answers a different
                question: not how the work is doing, but how much of it there
                is. Only where there is more than one, so it never states the
                obvious. */}
            {siteCount > 1 && (
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-accent-ink shadow-lift">
                <Layers className="h-3 w-3" />
                {t(ui.siteCount, lang).replace("{n}", String(siteCount))}
              </span>
            )}

            {/* The dot keeps beating on anything still alive, which is what makes
                the pill register as a state rather than a label. */}
            <span
              className={cn(
                "absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide shadow-card",
                status.pill,
              )}
            >
              <span className="relative flex h-1.5 w-1.5">
                {status.pulse && (
                  <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full", status.dot)} />
                )}
                <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", status.dot)} />
              </span>
              {t(statusLabels[project.status], lang)}
            </span>

            {/* Reads on hover as an invitation to open the case study. */}
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center bg-accent/85 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-ink px-5 py-2.5 text-sm font-semibold text-accent shadow-lift">
                {t(ui.viewProject, lang)}
                <ArrowRight className="h-4 w-4" />
              </span>
            </span>
          </div>

          {/* Grows to fill the card, so the link at its foot lines up with the
              neighbours whatever the tags do above it. */}
          <div className="flex flex-1 flex-col p-6">
            <span className="mb-2 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent">
              <span aria-hidden className="h-px w-5 bg-accent/50" />
              {category && t(category.label, lang)}
              {/*
               * Real work for somebody else, said next to what the thing is
               * rather than instead of it. Blue on purpose: in the accent it
               * read as more of the eyebrow, and the greens and ambers next to
               * it already mean something about the state of the project.
               */}
              {project.client && (
                <span className="ml-auto shrink-0 rounded-full border border-sky-500/40 bg-sky-500/10 px-2 py-0.5 text-[0.65rem] tracking-[0.1em] text-sky-700 dark:text-sky-300">
                  {t(ui.clientWork, lang)}
                </span>
              )}
            </span>

            <div className="flex items-start justify-between gap-3">
              <h3
                className={cn(
                  "line-clamp-2 font-semibold leading-tight",
                  large ? "min-h-[3.75rem] text-2xl" : "min-h-[3.125rem] text-xl",
                )}
              >
                <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                  {project.title}
                </Link>
              </h3>
              <span className="shrink-0 pt-1 text-xs text-ink-faint">{project.year}</span>
            </div>

            <p className="mt-2 line-clamp-2 min-h-[3.05rem] text-[0.9375rem] leading-relaxed text-ink-muted">
              {t(project.tagline, lang)}
            </p>

            <ul className="mb-4 mt-4 flex flex-wrap items-center gap-1.5">
              {project.tech.slice(0, 4).map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-line bg-surface-2 px-2 py-0.5 text-[0.7rem] font-medium text-ink-muted"
                >
                  {tech}
                </li>
              ))}
              {project.tech.length > 4 && (
                <li className="px-1 py-0.5 text-[0.7rem] font-medium text-ink-faint">+{project.tech.length - 4}</li>
              )}
            </ul>

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
              <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                {t(ui.viewProject, lang)}
                {/* Nudges on its own every few seconds, and slides further out
                    under the pointer. */}
                <ArrowRight className="arrow-nudge h-4 w-4 group-hover:translate-x-1" />
              </span>

              {/*
               * The card opens the case study, which is what somebody reading
               * wants and not what somebody who just wants to see it working
               * wants. Above the title's stretched hit area, or the card would
               * swallow the click; skipped entirely where there is no public
               * address, so it never becomes a button that goes nowhere.
               */}
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/live relative z-10 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-lift active:translate-y-0"
                >
                  {t(project.category === "site" ? ui.visitSite : ui.visitApp, lang)}
                  {/* Transform only, so it costs nothing to animate. */}
                  <ExternalLink className="h-3 w-3 transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>
      </article>
    </div>
  );
}
