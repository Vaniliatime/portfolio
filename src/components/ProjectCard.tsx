import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { categories, statusLabels, type Project } from "@/content/projects";
import { ui } from "@/content/site";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { ProjectCover } from "./ProjectCover";

/** Solid fills: the outlined version disappeared against a screenshot. */
const statusStyles: Record<Project["status"], { pill: string; dot: string; pulse: boolean }> = {
  live: { pill: "bg-emerald-500 text-white", dot: "bg-white", pulse: true },
  wip: { pill: "bg-amber-500 text-white", dot: "bg-white", pulse: true },
  archived: { pill: "bg-ink/75 text-paper", dot: "bg-paper/70", pulse: false },
};

interface ProjectCardProps {
  project: Project;
  lang: Locale;
  /** Large cards lead the featured grid. */
  size?: "lg" | "md";
  priority?: boolean;
  /** Offsets the halo, so a row of cards is never in step. */
  index?: number;
}

export function ProjectCard({ project, lang, size = "md", priority, index = 0 }: ProjectCardProps) {
  const href = localePath(lang, `work/${project.slug}`);
  const category = categories.find((c) => c.id === project.category);
  const large = size === "lg";
  const status = statusStyles[project.status];

  /*
   * Card heights match without anything stretching: the thumbnail has a fixed
   * ratio and the text block a fixed height, so there is no slack to show as a
   * gap. The min-heights below hold two lines at each type size.
   */
  return (
    <div
      className="card-halo group h-full"
      // Staggered two ways so no two neighbours pulse together: when they
      // start and how long a cycle runs. Identical cycles drift back into step
      // however the delays are set.
      style={
        {
          "--halo-delay": `${((index % 5) * -3).toFixed(1)}s`,
          "--halo-duration": `${14 + (index % 3) * 2}s`,
          "--edge-angle": `${135 + (index % 4) * 45}deg`,
        } as CSSProperties
      }
    >
      <div className="card-edge h-full rounded-2xl shadow-card transition-shadow duration-300 group-hover:shadow-lift">
        <article className="card-sheen relative flex h-full flex-col overflow-hidden rounded-[calc(1rem-1px)] bg-surface">
          <div className={cn("relative overflow-hidden bg-surface-2", large ? "aspect-[16/10]" : "aspect-[4/3]")}>
            <ProjectCover
              project={project}
              priority={priority}
              className="transition-transform duration-500 group-hover:scale-[1.04]"
              sizes={large ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 400px, 100vw"}
            />

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

          <div className="flex flex-col p-6">
            {category && (
              <span className="mb-2 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent">
                <span aria-hidden className="h-px w-5 bg-accent/50" />
                {t(category.label, lang)}
              </span>
            )}

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

            <ul className="mt-4 flex flex-wrap items-center gap-1.5">
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

            <span className="mt-4 flex items-center gap-1.5 border-t border-line pt-4 text-sm font-medium text-accent">
              {t(ui.viewProject, lang)}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </article>
      </div>
    </div>
  );
}
