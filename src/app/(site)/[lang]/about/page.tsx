import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { localePath, locales, t, toLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { about, profile, stats, ui } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { About } from "@/components/About";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { ContactCta } from "@/components/ContactCta";

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
    title: t(ui.aboutEyebrow, lang),
    description: t(about.lead, lang),
    alternates: alternatesFor(lang, "about"),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLocale((await params).lang);

  return (
    <>
      <PageHeader eyebrow={t(ui.aboutEyebrow, lang)} title={t(about.lead, lang)}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ButtonLink href={localePath(lang, "resume")} variant="secondary" size="sm">
            {t(ui.viewResume, lang)}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-2 hover:text-accent"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-2 hover:text-accent"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </PageHeader>

      <div className="shell py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div>
            <About lang={lang} />
          </div>

          <Reveal delay={1} className="space-y-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-card">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="(min-width: 1024px) 20rem, 100vw"
                className="object-cover object-top"
              />
            </div>

            <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
              {stats.map((stat) => (
                <div key={stat.value} className="flex items-baseline gap-4 px-5 py-4">
                  <dt className="font-display text-2xl font-semibold text-accent">{stat.value}</dt>
                  <dd className="text-sm leading-snug text-ink-muted">{t(stat.label, lang)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <ContactCta lang={lang} />
    </>
  );
}
