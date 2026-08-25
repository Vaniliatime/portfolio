import type { Metadata } from "next";
import { locales, t, toLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { process, ui } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { Services } from "@/components/Services";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
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
    title: t(ui.servicesEyebrow, lang),
    description: t(ui.servicesLead, lang),
    alternates: alternatesFor(lang, "services"),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLocale((await params).lang);

  return (
    <>
      <PageHeader
        eyebrow={t(ui.servicesEyebrow, lang)}
        title={t(ui.servicesHeading, lang)}
        lead={t(ui.servicesLead, lang)}
      />

      <div className="shell py-14 md:py-20">
        <Services lang={lang} />
      </div>

      <Section tinted heading={t(ui.processHeading, lang)} lead={t(ui.processLead, lang)}>
        <ol className="grid gap-5 md:grid-cols-2">
          {process.map((item, i) => (
            <Reveal key={item.step} delay={i} as="li">
              <div className="h-full rounded-2xl border border-line bg-surface p-7 shadow-card">
                <span className="font-display text-4xl font-semibold text-accent/25">{item.step}</span>
                <h3 className="mt-3 text-lg font-semibold">{t(item.title, lang)}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{t(item.body, lang)}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <ContactCta lang={lang} />
    </>
  );
}
