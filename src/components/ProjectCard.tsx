import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { categories, statusLabels, type Project } from "@/content/projects";
import { ui } from "@/content/site";
import { cn } from "@/lib/utils";
import { ProjectCover } from "./ProjectCover";

const statusStyles: Record<Project["status"], string> = {
  live: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  wip: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  archived: "border-line-strong bg-surface-2 text-ink-faint",
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

  return (
    // h-full and the mt-auto below are what keep every card in a row the same
    // height with its footer on the same line, whatever the copy runs to.
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300",
        "hover:-translate-y-1 hover:border-accent/35 hover:shadow-lift",
      )}
    >
      <div className={cn("relative overflow-hidden bg-surface-2", size === "lg" ? "aspect-[16/10]" : "aspect-[16/11]")}>
        <ProjectCover
          project={project}
          priority={priority}
          className="transition-transform duration-500 group-hover:scale-[1.04]"
          sizes={size === "lg" ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 400px, 100vw"}
        />

        {/* What it is, on the left; how far along it is, on the right. */}
        <span className="absolute left-4 top-4 rounded-full border border-accent/25 bg-accent-wash/95 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-accent">
          {category && t(category.label, lang)}
        </span>
        <span
          className={cn(
            "absolute right-4 top-4 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide",
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

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className={cn("font-semibold leading-tight", size === "lg" ? "text-2xl" : "text-xl")}>
            <Link href={href} className="after:absolute after:inset-0 after:content-['']">
              {project.title}
            </Link>
          </h3>
          <span className="shrink-0 pt-1 text-xs text-ink-faint">{project.year}</span>
        </div>

        {/* Clamped so a long tagline cannot push one card taller than its row. */}
        <p className="mt-2.5 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink-muted">
          {t(project.tagline, lang)}
        </p>

        <div className="mt-auto pt-5">
          <ul className="flex flex-wrap gap-1.5">
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
      </div>
    </article>
  );
}
