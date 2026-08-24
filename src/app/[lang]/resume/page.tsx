import type { Metadata } from "next";
import { Download, ExternalLink, Award, Dot } from "lucide-react";
import { locales, t, toLocale, type Locale } from "@/lib/i18n";
import { profile, ui } from "@/content/site";
import {
  certificates,
  education,
  experience,
  languages,
  resumeMeta,
  resumeSections,
  type ResumeEntry,
} from "@/content/resume";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/Section";
import { ContactCta } from "@/components/ContactCta";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const copy = {
  heading: { en: "Résumé", pl: "CV" },
  lead: {
    en: "Six years in IT support, an engineering degree in game development, and a steady habit of building things on the side.",
    pl: "Sześć lat w IT support, dyplom inżyniera z game development i stały nawyk budowania rzeczy po godzinach.",
  },
} as const;

const flags: Record<string, string> = { PL: "🇵🇱", GB: "🇬🇧" };

function Timeline({ entries, lang }: { entries: ResumeEntry[]; lang: Locale }) {
  return (
    <ol className="relative space-y-10 border-l border-line pl-7">
      {entries.map((entry, i) => (
        <Reveal key={`${entry.org}-${entry.period}`} delay={i} as="li">
          <span
            aria-hidden
            className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full border-2 border-paper bg-accent"
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold">{t(entry.title, lang)}</h3>
            <span className="text-sm text-ink-faint">{entry.period}</span>
          </div>
          <p className="mt-1 text-sm text-ink-muted">
            {entry.org} <Dot className="inline h-4 w-4 align-middle text-ink-faint" /> {t(entry.location, lang)}
          </p>
          <ul className="mt-4 space-y-2">
            {t(entry.points, lang).map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return { title: copy.heading[lang], description: copy.lead[lang] };
}

export default async function ResumePage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLocale((await params).lang);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="aurora opacity-60" />
        <div className="shell relative z-10 py-16 md:py-24">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{profile.name}</SectionEyebrow>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] md:text-6xl">
              {copy.heading[lang]}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{copy.lead[lang]}</p>
            <a
              href={resumeMeta.pdf}
              download
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
            >
              <Download className="h-4 w-4" />
              {t(ui.downloadCv, lang)}
            </a>
          </Reveal>
        </div>
      </section>

      <div className="shell py-12">
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

      <div className="shell space-y-20 pb-20 md:space-y-24">
        <section id="experience">
          <h2 className="mb-8 font-display text-2xl font-semibold md:text-3xl">
            {t(resumeSections[0].label, lang)}
          </h2>
          <Timeline entries={experience} lang={lang} />
        </section>

        <section id="education">
          <h2 className="mb-8 font-display text-2xl font-semibold md:text-3xl">
            {t(resumeSections[1].label, lang)}
          </h2>
          <Timeline entries={education} lang={lang} />
        </section>

        <section id="certificates">
          <h2 className="mb-8 font-display text-2xl font-semibold md:text-3xl">
            {t(resumeSections[2].label, lang)}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {certificates.map((cert, i) => (
              <Reveal key={cert} delay={i} as="li">
                <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-5 py-4">
                  <Award className="h-4 w-4 shrink-0 text-accent" />
                  <span className="text-[0.9375rem]">{cert}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        <section id="languages">
          <h2 className="mb-8 font-display text-2xl font-semibold md:text-3xl">
            {t(resumeSections[3].label, lang)}
          </h2>
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
