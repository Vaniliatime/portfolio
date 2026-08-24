import type { Metadata } from "next";
import { Github, Mail, MapPin } from "lucide-react";
import { locales, t, toLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { contact, profile, services, ui } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/CopyEmail";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const copy = {
  eyebrow: { en: "Contact", pl: "Kontakt" },
  what: { en: "What I take on", pl: "Co przyjmuję" },
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
    <section className="relative overflow-hidden">
      <div aria-hidden className="aurora opacity-60" />

      <div className="shell relative z-10 py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{copy.eyebrow[lang]}</SectionEyebrow>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] md:text-6xl">
            {t(contact.heading, lang)}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t(contact.lead, lang)}</p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-7 shadow-card md:p-9">
              <ContactForm lang={lang} />
            </div>
          </Reveal>

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

            <div className="space-y-2.5 border-t border-line pt-8 text-sm text-ink-muted">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {t(contact.note, lang)}
              </p>
              <p className="flex items-start gap-2">
                <Github className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  github.com/Vaniliatime
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
