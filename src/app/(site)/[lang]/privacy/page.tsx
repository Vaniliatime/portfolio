import type { Metadata } from "next";
import { locales, t, toLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { privacy } from "@/content/legal";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

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
    title: t(privacy.title, lang),
    description: t(privacy.lead, lang),
    alternates: alternatesFor(lang, "privacy"),
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLocale((await params).lang);

  return (
    <>
      <PageHeader
        eyebrow={t(privacy.eyebrow, lang)}
        title={t(privacy.title, lang)}
        lead={t(privacy.lead, lang)}
      />

      <div className="shell py-14 md:py-20">
        <div className="max-w-2xl">
          <dl className="space-y-10">
            {privacy.sections.map((section, i) => (
              <Reveal key={section.title.en} delay={i}>
                <dt className="font-display text-xl font-semibold">{t(section.title, lang)}</dt>
                <dd className="mt-2.5 leading-relaxed text-ink-muted">{t(section.body, lang)}</dd>
              </Reveal>
            ))}
          </dl>

          <p className="mt-12 border-t border-line pt-6 text-sm text-ink-faint">
            {t(privacy.updated, lang)}: {privacy.updatedOn}
          </p>
        </div>
      </div>
    </>
  );
}
