import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { localePath, locales, t, toLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { ui } from "@/content/site";
import { featuredProjects } from "@/content/projects";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLocale((await params).lang);

  return {
    title: t(ui.sentHeading, lang),
    description: t(ui.sentLead, lang),
    alternates: alternatesFor(lang, "sent"),
    // Nothing to find here, and a confirmation page in search results is only
    // ever a confusing result.
    robots: { index: false, follow: true },
  };
}

/**
 * Where the contact form lands once a message has actually gone.
 *
 * A line of green text under the send button is easy to miss on a phone, and
 * missing it means writing the whole thing again. A page cannot be missed, and
 * it is the right place to repeat the promise about answering within a day.
 */
export default async function SentPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLocale((await params).lang);
  const suggestions = featuredProjects.slice(0, 3);

  return (
    <>
      <PageHeader eyebrow={t(ui.sentEyebrow, lang)} title={t(ui.sentHeading, lang)}>
        <p className="mt-5 flex max-w-2xl items-start gap-3 text-lg leading-relaxed text-ink-muted">
          <span className="mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
            <Check className="h-3.5 w-3.5" />
          </span>
          {t(ui.sentLead, lang)}
        </p>

        <div className="mt-8">
          <Link
            href={localePath(lang)}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            {t(ui.sentBackHome, lang)}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHeader>

      {/* Somewhere to go next, rather than a dead end with one link on it. */}
      <div className="shell py-14 md:py-20">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
          {t(ui.sentMeanwhile, lang)}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((project, i) => (
            <Reveal key={project.slug} delay={i} className="h-full">
              <ProjectCard project={project} lang={lang} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
