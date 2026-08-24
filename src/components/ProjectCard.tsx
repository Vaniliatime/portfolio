import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { statusLabels, type Project } from "@/content/projects";
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

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300",
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
        <span
          className={cn(
            "absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide backdrop-blur-sm",
            statusStyles[project.status],
          )}
        >
          {t(statusLabels[project.status], lang)}
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

        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">{t(project.tagline, lang)}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
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

        <span
          aria-hidden
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          {project.title}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}
