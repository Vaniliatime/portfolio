import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { localePath, locales, t, toLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { getProject, projects } from "@/content/projects";
import { ui } from "@/content/site";
import { ProjectCover } from "@/components/ProjectCover";
import { ProjectBrief } from "@/components/ProjectBrief";
import { ProjectHeading } from "@/components/ProjectHeading";
import { Gallery } from "@/components/Gallery";
import { ContactCta } from "@/components/ContactCta";
import { Reveal } from "@/components/Reveal";

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

            <div className="mt-8">
              <ProjectHeading project={project} lang={lang} />
            </div>
          </div>
        </header>

        <div className="shell py-14 md:py-20">
          <Reveal className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-card">
            <ProjectCover project={project} priority sizes="(min-width: 1280px) 1200px, 100vw" />
          </Reveal>

          <div className="mt-16">
            <ProjectBrief project={project} lang={lang} />
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <Reveal className="mt-16">
              <Gallery
                images={project.gallery}
                title={project.title}
                closeLabel={t(ui.close, lang)}
                previousLabel={t(ui.previous, lang)}
                nextLabel={t(ui.next, lang)}
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
