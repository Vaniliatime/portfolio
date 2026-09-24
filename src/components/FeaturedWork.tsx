import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { featuredProjects, projects } from "@/content/projects";
import { ui } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";
import { CountUp } from "./CountUp";

export function FeaturedWork({ lang }: { lang: Locale }) {
  const rest = projects.length - featuredProjects.length;

  return (
    <Section
      id="featured"
      eyebrow={t(ui.featured, lang)}
      heading={t(ui.featuredHeading, lang)}
      lead={t(ui.featuredLead, lang)}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i} className="h-full">
            <ProjectCard project={project} lang={lang} size="lg" priority={i < 2} index={i} />
          </Reveal>
        ))}
      </div>

      {/*
       * Four on this page, and the number of the others said out loud. A plain
       * "all work" button under a short grid reads as the end of the work
       * rather than as a door onto more of it, and the count is the part that
       * makes anybody open it.
       *
       * Deliberately not the card the next-project link uses: that one is a
       * white panel with a violet edge, this one is tinted and has a light
       * running along its border, so two links that mean different things do
       * not arrive looking like the same component.
       */}
      <Reveal delay={2} className="mt-12">
        <Link href={localePath(lang, "work")} className="edge-sweep group block rounded-2xl shadow-card">
          <div className="relative z-10 flex flex-col gap-6 rounded-[calc(1rem-1px)] bg-accent-wash p-7 sm:flex-row sm:items-center sm:gap-8 md:p-9">
            <span className="flex shrink-0 items-baseline gap-2 sm:flex-col sm:items-center sm:gap-0">
              <CountUp
                value={rest}
                className="font-display text-5xl font-semibold leading-none text-accent md:text-6xl"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                {t(ui.moreCount, lang)}
              </span>
            </span>

            <span aria-hidden className="hidden w-px self-stretch bg-accent/20 sm:block" />

            <span className="min-w-0 flex-1">
              <span className="block font-display text-xl font-semibold transition-colors group-hover:text-accent md:text-2xl">
                {t(ui.moreHeading, lang)}
              </span>
              <span className="mt-2 block leading-relaxed text-ink-muted">
                {t(ui.moreLead, lang)}
              </span>
            </span>

            {/* No pulsing ring here: the border is already the moving part, and
                the next-project card is the one that pulses. */}
            <span
              aria-hidden
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-300 group-hover:scale-110 md:h-14 md:w-14"
            >
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 md:h-6 md:w-6" />
            </span>
          </div>
        </Link>
      </Reveal>
    </Section>
  );
}
