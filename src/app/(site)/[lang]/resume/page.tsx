import type { Metadata } from "next";
import { Download, ExternalLink, Award, Linkedin } from "lucide-react";
import { locales, t, toLocale, type Locale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { profile, ui } from "@/content/site";
import {
  certificateGroups,
  education,
  employment,
  freelance,
  languages,
  resumeMeta,
  resumeSections,
  sectionLeads,
  type ResumeEntry,
} from "@/content/resume";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { ContactCta } from "@/components/ContactCta";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const copy = {
  heading: { en: "Résumé", pl: "CV" },
  lead: {
    en: "Seven years in IT, an engineering degree in game development, and a steady habit of building things on the side.",
    pl: "Siedem lat w IT, dyplom inżyniera z game development i stały nawyk budowania rzeczy po godzinach.",
  },
} as const;

const flags: Record<string, string> = { PL: "🇵🇱", GB: "🇬🇧" };

function Timeline({ entries, lang }: { entries: ResumeEntry[]; lang: Locale }) {
  return (
    <ol className="relative space-y-10 border-l border-line pl-7">
      {entries.map((entry, i) => (
        <Reveal key={entry.org} delay={i} as="li">
          <span
            aria-hidden
            className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full border-2 border-paper bg-accent"
          />

          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-lg font-semibold">{entry.org}</h3>
            {entry.period && <span className="text-sm text-ink-faint">{entry.period}</span>}
          </div>
          <p className="mt-1 text-sm text-ink-muted">{t(entry.location, lang)}</p>

          <div className="mt-5 space-y-6">
            {entry.roles.map((role) => (
              <div
                key={role.period}
                // A second role means a promotion — indent it so the path reads
                // as one company rather than two unrelated jobs.
                className={entry.roles.length > 1 ? "border-l-2 border-accent/25 pl-5" : undefined}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-medium text-accent">{t(role.title, lang)}</h4>
                  <span className="text-sm text-ink-faint">{role.period}</span>
                </div>
                <ul className="mt-3 space-y-2">
                  {t(role.points, lang).map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink-muted"
                    >
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {entry.link && (
            <a
              href={entry.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              {entry.link.label}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </Reveal>
      ))}
    </ol>
  );
}

function SectionHeading({ index, lang }: { index: number; lang: Locale }) {
  const section = resumeSections[index];
  const lead = sectionLeads[section.id];

  return (
    <div className="mb-8">
      <h2 className="font-display text-2xl font-semibold md:text-3xl">{t(section.label, lang)}</h2>
      {lead && <p className="mt-2 text-ink-muted">{t(lead, lang)}</p>}
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return {
    title: copy.heading[lang],
    description: copy.lead[lang],
    alternates: alternatesFor(lang, "resume"),
  };
}

export default async function ResumePage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLocale((await params).lang);

  return (
    <>
      <PageHeader eyebrow={profile.name} title={copy.heading[lang]} lead={copy.lead[lang]}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={resumeMeta.pdf}
            download
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
          >
            <Download className="h-4 w-4" />
            {t(ui.downloadCv, lang)}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/50 hover:bg-accent-wash hover:text-accent"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </PageHeader>

      <div className="shell py-10">
        <nav aria-label="Sections" className="flex flex-wrap gap-2">
          {resumeSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:border-accent/50 hover:bg-accent-wash hover:text-accent"
            >
              {t(section.label, lang)}
            </a>
          ))}
        </nav>
      </div>

      <div className="shell space-y-16 pb-16 md:space-y-20">
        <section id="employment">
          <SectionHeading index={0} lang={lang} />
          <Timeline entries={employment} lang={lang} />
        </section>

        <section id="freelance">
          <SectionHeading index={1} lang={lang} />
          <Timeline entries={freelance} lang={lang} />
        </section>

        <section id="education">
          <SectionHeading index={2} lang={lang} />
          <Timeline entries={education} lang={lang} />
        </section>

        <section id="certificates">
          <SectionHeading index={3} lang={lang} />
          <div className="space-y-8">
            {certificateGroups.map((group) => (
              <div key={group.items.map((c) => c.name).join()}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  {t(group.title, lang)}
                </h3>
                {group.note && <p className="mt-1.5 text-sm text-ink-muted">{t(group.note, lang)}</p>}
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {group.items.map((cert, i) => (
                    <Reveal key={cert.name} delay={i} as="li">
                      <div className="flex h-full items-start gap-3 rounded-xl border border-line bg-surface px-5 py-4">
                        <Award className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span className="text-[0.9375rem] leading-snug">
                          {cert.name}
                          {(cert.issuer || cert.period || cert.hours) && (
                            <span className="mt-1 block text-xs text-ink-faint">
                              {[cert.issuer, cert.period, cert.hours].filter(Boolean).join(" · ")}
                            </span>
                          )}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="languages">
          <SectionHeading index={4} lang={lang} />
          <ul className="flex flex-wrap gap-3">
            {languages.map((language) => (
              <li
                key={language.code}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface px-5 py-4"
              >
                <span aria-hidden className="text-xl">
                  {flags[language.code]}
                </span>
                <span className="text-[0.9375rem]">
                  {t(language.name, lang)}
                  <span className="ml-2 text-ink-faint">{t(language.level, lang)}</span>
                </span>
              </li>
            ))}
          </ul>
          <ul className="mt-4 text-sm text-ink-muted">
            {t(resumeMeta.extras, lang).map((extra) => (
              <li key={extra}>{extra}</li>
            ))}
          </ul>
        </section>
      </div>

      <ContactCta lang={lang} />
    </>
  );
}
