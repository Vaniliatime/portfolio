import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { categories, statusLabels, type Project } from "@/content/projects";
import { ui } from "@/content/site";
import { cn } from "@/lib/utils";
import { ProjectCover } from "./ProjectCover";

/** Solid fills: the outlined version disappeared against a screenshot. */
const statusStyles: Record<Project["status"], string> = {
  live: "bg-emerald-500 text-white",
  wip: "bg-amber-500 text-white",
  archived: "bg-ink/75 text-paper",
};

interface ProjectCardProps {
  project: Project;
  lang: Locale;
  /** Large cards lead the featured grid. */
  size?: "lg" | "md";
  priority?: boolean;
}

export function ProjectCard({ project, lang, size = "md", priority }: ProjectCardProps) {
  const href = localePath(lang, `work/${project.slug}`);
  const category = categories.find((c) => c.id === project.category);
  const large = size === "lg";

  return (
    /*
     * Every card in a row ends up the same height without stretching anything:
     * the thumbnail has a fixed ratio and the text block a fixed height, so
     * there is no slack to leave as a gap and no thumbnail growing past its
     * neighbour. The min-heights below hold two lines at each type size.
     */
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300",
        "hover:-translate-y-1 hover:border-accent/35 hover:shadow-lift",
      )}
    >
      <div className={cn("relative overflow-hidden bg-surface-2", large ? "aspect-[16/10]" : "aspect-[4/3]")}>
        <ProjectCover
          project={project}
          priority={priority}
          className="transition-transform duration-500 group-hover:scale-[1.04]"
          sizes={large ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 400px, 100vw"}
        />

        <span
          className={cn(
            "absolute right-4 top-4 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide shadow-card",
            statusStyles[project.status],
          )}
        >
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

        {/* Category sits with the stack rather than over the screenshot, where
            it competed with the status for the same corner of the image. */}
        <ul className="mt-4 flex flex-wrap items-center gap-1.5">
          {category && (
            <li className="rounded-md border border-accent/25 bg-accent-wash px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-accent">
              {t(category.label, lang)}
            </li>
          )}
          {project.tech.slice(0, 3).map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-line bg-surface-2 px-2 py-0.5 text-[0.7rem] font-medium text-ink-muted"
            >
              {tech}
            </li>
          ))}
          {project.tech.length > 3 && (
            <li className="px-1 py-0.5 text-[0.7rem] font-medium text-ink-faint">+{project.tech.length - 3}</li>
          )}
        </ul>

        <span className="mt-4 flex items-center gap-1.5 border-t border-line pt-4 text-sm font-medium text-accent">
          {t(ui.viewProject, lang)}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
