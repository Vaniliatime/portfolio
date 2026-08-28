import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";
import { locales, t, toLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { contact, profile, services, ui } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { EnquiryFlow } from "@/components/EnquiryFlow";
import { CopyEmail } from "@/components/CopyEmail";
import { SocialLinks } from "@/components/SocialLinks";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const copy = {
  eyebrow: { en: "Contact", pl: "Kontakt" },
  what: { en: "What I take on", pl: "Co przyjmuję" },
  elsewhere: { en: "Find me elsewhere", pl: "Znajdziesz mnie też tutaj" },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return {
    title: copy.eyebrow[lang],
    description: t(contact.lead, lang),
    alternates: alternatesFor(lang, "contact"),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLocale((await params).lang);

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow[lang]}
        title={t(contact.heading, lang)}
        lead={t(contact.lead, lang)}
      >
        {/* The one thing somebody hovering over the send button wants to know. */}
        <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent-wash px-4 py-2 text-sm font-medium text-accent">
          <Clock className="h-4 w-4" />
          {t(ui.replyTime, lang)}
        </p>
      </PageHeader>

      <EnquiryFlow
        lang={lang}
        aside={
          <Reveal delay={1} className="space-y-10">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
                {t(ui.emailMe, lang)}
              </h2>
              <a
                href={`mailto:${profile.email}`}
                className="mt-3 inline-flex items-center gap-2 font-display text-lg font-medium transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 text-accent" />
                {profile.email}
              </a>
              <div className="mt-4">
                <CopyEmail email={profile.email} label={t(ui.copyEmail, lang)} copiedLabel={t(ui.copied, lang)} />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">{copy.what[lang]}</h2>
              <ul className="mt-4 space-y-2.5">
                {services.map((service) => (
                  <li key={service.id} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-muted">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {t(service.title, lang)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line pt-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
                {copy.elsewhere[lang]}
              </h2>
              <SocialLinks className="mt-4" />
              <p className="mt-6 flex items-start gap-2 text-sm text-ink-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {t(contact.note, lang)}
              </p>
            </div>
          </Reveal>
        }
      />
    </>
  );
}
