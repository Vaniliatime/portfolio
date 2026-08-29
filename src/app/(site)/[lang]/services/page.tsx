import type { Metadata } from "next";
import { locales, t, toLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { ui } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { Services } from "@/components/Services";
import { Section } from "@/components/Section";
import { ContactCta } from "@/components/ContactCta";
import { Faq } from "@/components/Faq";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Testimonials } from "@/components/Testimonials";

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

      <Testimonials lang={lang} />

      <Section tinted heading={t(ui.processHeading, lang)} lead={t(ui.processLead, lang)}>
        <ProcessTimeline lang={lang} />
      </Section>

      <Section
        id="faq"
        eyebrow={t(ui.faqEyebrow, lang)}
        heading={t(ui.faqHeading, lang)}
        lead={t(ui.faqLead, lang)}
      >
        <Faq lang={lang} />
      </Section>

      <ContactCta lang={lang} />
    </>
  );
}
