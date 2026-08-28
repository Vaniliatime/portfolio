import type { Metadata } from "next";
import { locales, t, toLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { ui } from "@/content/site";
import { Tag } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Services } from "@/components/Services";
import { Reveal } from "@/components/Reveal";
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
        {/* Before the numbers, not after them: whoever reads "from 3900" needs
            to already know it is a starting point and not a quote. */}
        <Reveal className="mb-10 flex max-w-2xl items-start gap-3.5 rounded-2xl border border-accent/25 bg-accent-wash px-6 py-5">
          <Tag className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p className="leading-relaxed text-ink-muted">{t(ui.pricingNote, lang)}</p>
        </Reveal>

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
