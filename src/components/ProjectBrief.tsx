import { Check, TrendingUp } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/site";
import type { Project } from "@/content/projects";
import { Reveal } from "./Reveal";

/**
 * A project's summary, what went into it, and its stack.
 *
 * Shared by the case study and the home page, where the hero expands into this
 * same reading rather than sending anyone to another URL for it.
 */
export function ProjectBrief({ project, lang }: { project: Project; lang: Locale }) {
  return (
    <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
      <Reveal>
        <p className="text-xl leading-relaxed md:text-2xl">{t(project.summary, lang)}</p>

        {/* Outcomes first where there are any: what the work changed matters
            more to somebody weighing me up than what it consisted of. */}
        {project.results && (
          <div className="mt-14 rounded-2xl border border-accent/20 bg-accent-wash/60 p-7">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              {t(ui.results, lang)}
            </h2>
            <ul className="mt-5 space-y-3">
              {t(project.results, lang).map((point) => (
                <li key={point} className="flex items-start gap-3 leading-relaxed">
                  <TrendingUp className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        <h2 className="mt-14 text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
          {t(ui.highlights, lang)}
        </h2>
        <ul className="mt-6 space-y-4">
          {t(project.highlights, lang).map((point) => (
            <li key={point} className="flex items-start gap-3 leading-relaxed text-ink-muted">
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-wash">
                <Check className="h-3 w-3 text-accent" />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={1}>
        <div className="rounded-2xl border border-line bg-surface-2/60 p-7">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
            {t(ui.stack, lang)}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
