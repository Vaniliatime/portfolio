import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Award,
  BookOpen,
  Briefcase,
  Bus,
  ChevronsUp,
  Clapperboard,
  ClipboardCheck,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  GraduationCap,
  Heart,
  Landmark,
  Library,
  Linkedin,
  Palette,
  Radar,
  ShieldCheck,
  Sparkles,
  Truck,
  Workflow,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { localePath, locales, t, toLocale, type Locale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { profile, ui } from "@/content/site";
import { getProject } from "@/content/projects";
import {
  certificateGroups,
  education,
  employment,
  freelance,
  ownProjects,
  languages,
  resumeMeta,
  resumeSections,
  sectionLeads,
  type CertificateIcon,
  type ResumeEntry,
} from "@/content/resume";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCover } from "@/components/ProjectCover";
import { BrowserFrame } from "@/components/BrowserFrame";
import { EditorPanel } from "@/components/EditorPanel";
import { ContactCta } from "@/components/ContactCta";
import { FlagGB, FlagPL } from "@/components/icons/Flags";
import { cn } from "@/lib/utils";

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

const entryIcons: Record<NonNullable<ResumeEntry["icon"]>, LucideIcon> = {
  work: Briefcase,
  institution: Landmark,
  logistics: Truck,
  transport: Bus,
  product: Library,
  book: BookOpen,
  media: Clapperboard,
  school: GraduationCap,
  design: Palette,
  tools: Wrench,
  hardware: Cpu,
  learning: ClipboardCheck,
  event: Heart,
};

const certificateIcons: Record<CertificateIcon, LucideIcon> = {
  process: Workflow,
  security: ShieldCheck,
  code: Code2,
  ai: Sparkles,
  osint: Radar,
  monitoring: Activity,
  microsoft: Award,
};

const flags: Record<string, (props: { className?: string }) => React.ReactElement> = {
  PL: FlagPL,
  GB: FlagGB,
};

/** Logo tile, or the themed glyph when no logo file has been supplied yet. */
function EntryBadge({ entry }: { entry: ResumeEntry }) {
  const Icon = entryIcons[entry.icon ?? "work"];

  return (
    <span
      className={cn(
        "grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-line shadow-card",
        // Brand logos come with a white background baked in, so the tile
        // stays white in both themes rather than showing a pale block.
        entry.logo ? "bg-white" : "bg-surface",
      )}
    >
      {entry.logo ? (
        <Image src={entry.logo} alt="" width={48} height={48} className="h-full w-full object-contain p-1" />
      ) : (
        <Icon className="h-5 w-5 text-accent" />
      )}
    </span>
  );
}

function Timeline({ entries, lang }: { entries: ResumeEntry[]; lang: Locale }) {
  return (
    <ol className="space-y-10">
      {entries.map((entry, i) => {
        const project = entry.projectSlug ? getProject(entry.projectSlug) : undefined;
        const site = project?.links.find((link) => link.kind === "site");
        const isLast = i === entries.length - 1;

        return (
          <Reveal key={entry.org} delay={i} as="li" className="relative">
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-[3rem_1fr] lg:grid-cols-[3rem_1fr_13rem]">
              {/* Badge column, with the run down to the next employer. */}
              <div className="relative">
                <EntryBadge entry={entry} />
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute -bottom-14 left-6 top-14 hidden w-px -translate-x-1/2 bg-line sm:block"
                  />
                )}
              </div>

              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold">{entry.org}</h3>
                {/* Dates sit under the name rather than opposite it: ranged
                    right they drifted away from what they belonged to. */}
                <p className="mt-1 text-sm text-ink-muted">
                  {entry.period && <span className="text-ink-faint">{entry.period}</span>}
                  {entry.period && " · "}
                  {t(entry.location, lang)}
                </p>

                {entry.note && (
                  <p className="mt-2 border-l-2 border-line pl-3 text-[0.8125rem] leading-relaxed text-ink-faint">
                    {t(entry.note, lang)}
                  </p>
                )}

                {/*
                 * Several roles means a promotion inside one company, so they
                 * hang off a single accent rule. One role needs no rule at all.
                 */}
                <ol
                  className={
                    entry.roles.length > 1
                      ? "mt-5 space-y-6 border-l-2 border-accent/25 pl-6"
                      : "mt-5 space-y-6"
                  }
                >
                  {entry.roles.map((role) => (
                    <li key={role.period} className="relative">
                      {entry.roles.length > 1 && (
                        <span
                          aria-hidden
                          className="absolute top-1.5 h-3 w-3 rounded-full border-2 border-paper bg-accent left-[calc(-1.875rem-1px)]"
                        />
                      )}
                      {/* Seniority reads as a badge rather than a comma at
                          the end of the title, where it disappeared. */}
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <h4 className="font-medium text-accent">{t(role.title, lang)}</h4>
                        {role.level && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-accent/25 bg-accent-wash px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-accent">
                            <ChevronsUp className="h-3 w-3" />
                            {t(role.level, lang)}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-ink-faint">{role.period}</p>
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
                    </li>
                  ))}
                </ol>

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
              </div>

              {/* Thumbnail of the matching project, so the reading has
                  something to look at and a way through to the case study.
                  Offset to line up with the role text rather than the company
                  name, which left it stranded at the top of the entry. */}
              {(project || entry.visual) && (
                <div className="hidden lg:mt-16 lg:block">
                  {project ? (
                    <Link
                      href={localePath(lang, `work/${project.slug}`)}
                      className="group block"
                      aria-label={project.title}
                    >
                      <BrowserFrame
                        host={site?.label ?? project.title}
                        compact
                        className="rounded-lg border border-line shadow-card transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:shadow-lift"
                      >
                        <span className="relative block aspect-[16/11] bg-surface-2">
                          <ProjectCover
                            project={project}
                            sizes="13rem"
                            className="transition-transform duration-500 group-hover:scale-105"
                          />
                        </span>
                      </BrowserFrame>
                    </Link>
                  ) : (
                    <EditorPanel label={t(entry.location, lang)} />
                  )}

                  {site && (
                    <a
                      href={site.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-accent px-3 py-2 text-xs font-medium text-accent-ink transition-colors hover:bg-accent-hover"
                    >
                      {t(ui.visitSite, lang)}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

function SectionHeading({ index, lang }: { index: number; lang: Locale }) {
  const section = resumeSections[index];
  const lead = sectionLeads[section.id];

  return (
    <Reveal className="mb-8">
      <h2 className="font-display text-2xl font-semibold md:text-3xl">{t(section.label, lang)}</h2>
      {lead && <p className="mt-2 text-ink-muted">{t(lead, lang)}</p>}
    </Reveal>
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
        <Reveal>
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
        </Reveal>
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

        <section id="projects">
          <SectionHeading index={2} lang={lang} />
          <Timeline entries={ownProjects} lang={lang} />
        </section>

        <section id="education">
          <SectionHeading index={3} lang={lang} />
          <Timeline entries={education} lang={lang} />
        </section>

        <section id="certificates">
          <SectionHeading index={4} lang={lang} />
          <div className="space-y-8">
            {certificateGroups.map((group) => (
              <div key={group.items.map((c) => c.name).join()}>
                <Reveal>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    {t(group.title, lang)}
                  </h3>
                  {group.note && <p className="mt-1.5 text-sm text-ink-muted">{t(group.note, lang)}</p>}
                </Reveal>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {group.items.map((cert, i) => {
                    const Icon = certificateIcons[cert.icon ?? "microsoft"];

                    return (
                      <Reveal key={cert.name} delay={i} as="li">
                        <div className="flex h-full items-start gap-3 rounded-xl border border-line bg-surface px-5 py-4 transition-colors hover:border-accent/40">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-wash">
                            <Icon className="h-4 w-4 text-accent" />
                          </span>
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
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="languages">
          <SectionHeading index={5} lang={lang} />
          <ul className="flex flex-wrap gap-3">
            {languages.map((language, i) => {
              const Flag = flags[language.code];

              return (
                <Reveal key={language.code} delay={i} as="li">
                  <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-5 py-4">
                    {Flag && <Flag className="h-5 w-auto rounded-[3px] shadow-sm" />}
                    <span className="text-[0.9375rem]">
                      {t(language.name, lang)}
                      <span className="ml-2 text-ink-faint">{t(language.level, lang)}</span>
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </section>
      </div>

      <ContactCta lang={lang} />
    </>
  );
}
