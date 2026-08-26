import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Github } from "lucide-react";
import { localePath, locales, t, toLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import {
  categories,
  getProject,
  projects,
  statusLabels,
  type ProjectLink,
} from "@/content/projects";
import { AppleIcon, GooglePlayIcon } from "@/components/icons/Stores";
import { ui } from "@/content/site";
import { ProjectCover } from "@/components/ProjectCover";
import { Gallery } from "@/components/Gallery";
import { ContactCta } from "@/components/ContactCta";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/Section";

/** Lucide icons and the hand-drawn store glyphs only agree on className. */
const linkIcons: Record<ProjectLink["kind"], React.ComponentType<{ className?: string }>> = {
  site: ExternalLink,
  internal: ExternalLink,
  repo: Github,
  appstore: AppleIcon,
  playstore: GooglePlayIcon,
};

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((project) => ({ lang, slug: project.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = toLocale(rawLang);
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: t(project.tagline, lang),
    alternates: alternatesFor(lang, `work/${slug}`),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = toLocale(rawLang);
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const category = categories.find((c) => c.id === project.category);

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-line">
          <div aria-hidden className="aurora opacity-60" />
          <div className="shell relative z-10 py-14 md:py-20">
            <Link
              href={localePath(lang, "work")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              {t(ui.backToWork, lang)}
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <div>
                {category && <SectionEyebrow>{t(category.label, lang)}</SectionEyebrow>}
                <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] md:text-6xl">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
                  {t(project.tagline, lang)}
                </p>
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
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
            </div>

            {project.links.length > 0 && (
              <ul className="mt-9 flex flex-wrap gap-2.5">
                {project.links.map((link) => {
                  const Icon = linkIcons[link.kind];
                  const chrome =
                    "inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:bg-accent-wash hover:text-accent";

                  return (
                    <li key={link.kind + link.label}>
                      {/* An empty href means the destination does not exist
                          yet, so it goes to the in-progress page instead of
                          being a dead button. */}
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
        </header>

        <div className="shell py-14 md:py-20">
          <Reveal className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-card">
            <ProjectCover project={project} priority sizes="(min-width: 1280px) 1200px, 100vw" />
          </Reveal>

          <div className="mt-16 grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <Reveal>
              <p className="text-xl leading-relaxed md:text-2xl">{t(project.summary, lang)}</p>

              <h2 className="mt-14 text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
                {t(ui.highlights, lang)}
              </h2>
              <ul className="mt-6 space-y-4">
                {t(project.highlights, lang).map((point) => (
                  <li key={point} className="flex items-start gap-3 leading-relaxed text-ink-muted">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-wash">
                      <Check className="h-3 w-3 text-accent" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={1}>
              <div className="rounded-2xl border border-line bg-surface-2/60 p-7">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  {t(ui.stack, lang)}
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <Reveal className="mt-16">
              <Gallery
                images={project.gallery}
                title={project.title}
                closeLabel={t(ui.close, lang)}
                aspect={project.galleryAspect}
              />
            </Reveal>
          )}
        </div>

        <div className="border-t border-line">
          <div className="shell py-12">
            <Link href={localePath(lang, `work/${next.slug}`)} className="group flex items-center justify-between gap-6">
              <span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  {t(ui.nextProject, lang)}
                </span>
                <span className="mt-1.5 block font-display text-2xl font-semibold transition-colors group-hover:text-accent md:text-3xl">
                  {next.title}
                </span>
              </span>
              <ArrowRight className="h-6 w-6 shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </div>
        </div>
      </article>

      <ContactCta lang={lang} />
    </>
  );
}
