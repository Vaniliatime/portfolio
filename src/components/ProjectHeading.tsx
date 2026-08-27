import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { categories, statusLabels, type Project, type ProjectLink } from "@/content/projects";
import { ui } from "@/content/site";
import { AppleIcon, GooglePlayIcon } from "./icons/Stores";
import { SectionEyebrow } from "./Section";
import { cn } from "@/lib/utils";

/** Lucide icons and the hand-drawn store glyphs only agree on className. */
const linkIcons: Record<ProjectLink["kind"], React.ComponentType<{ className?: string }>> = {
  site: ExternalLink,
  internal: ExternalLink,
  repo: Github,
  appstore: AppleIcon,
  playstore: GooglePlayIcon,
};

interface ProjectHeadingProps {
  project: Project;
  lang: Locale;
  /** The hero runs this above an expanded screenshot, where it has less room. */
  compact?: boolean;
}

/**
 * A project's name, what it is, its facts and its links.
 *
 * Shared by the case study and the hero, so the two cannot drift into
 * describing the same project differently.
 */
export function ProjectHeading({ project, lang, compact }: ProjectHeadingProps) {
  const category = categories.find((c) => c.id === project.category);
  // The case study leads the page; in the hero the page already has its h1.
  const Title = compact ? "h2" : "h1";

  return (
    <div className={cn("grid gap-6", compact ? "lg:grid-cols-[1.5fr_1fr]" : "lg:grid-cols-[1.3fr_1fr] lg:items-end")}>
      <div>
        {category && <SectionEyebrow>{t(category.label, lang)}</SectionEyebrow>}
        <Title
          className={cn(
            "mt-3 font-display font-semibold leading-[1.08]",
            compact ? "text-3xl md:text-4xl" : "mt-4 text-4xl md:text-6xl",
          )}
        >
          {project.title}
        </Title>
        <p
          className={cn(
            "max-w-2xl leading-relaxed text-ink-muted",
            compact ? "mt-2 text-base" : "mt-5 text-lg md:text-xl",
          )}
        >
          {t(project.tagline, lang)}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">Year</dt>
          <dd className="mt-1 font-medium">{project.year}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">Status</dt>
          <dd className="mt-1 font-medium">{t(statusLabels[project.status], lang)}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
            {t(ui.role, lang)}
          </dt>
          <dd className="mt-1 font-medium leading-relaxed">{t(project.role, lang)}</dd>
        </div>
      </dl>

      {project.links.length > 0 && (
        <ul className={cn("flex flex-wrap gap-2.5", compact ? "lg:col-span-2" : "mt-3 lg:col-span-2")}>
          {project.links.map((link) => {
            const Icon = linkIcons[link.kind];
            const chrome =
              "inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:bg-accent-wash hover:text-accent";

            return (
              <li key={link.kind + link.label}>
                {/* An empty href means the destination does not exist yet, so
                    it goes to the in-progress page rather than being dead. */}
                {link.href ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={chrome}>
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </a>
                ) : (
                  <Link href={localePath(lang, "soon")} className={chrome}>
                    <Icon className="h-4 w-4" />
                    {link.label}
                    <span className="rounded-full bg-accent-wash px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-accent">
                      {t(ui.comingSoon, lang)}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
