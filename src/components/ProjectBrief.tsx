import { Check, Layers, Lightbulb, Terminal, TrendingUp } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/site";
import type { Project } from "@/content/projects";
import { Reveal } from "./Reveal";

/**
 * A project's summary and stack, then what it does and how it is built.
 *
 * Two readings side by side, because two different people arrive here: someone
 * deciding whether they want one of these, and someone deciding whether I can
 * build it. Writing for either alone lost the other, and writing for both in
 * one list produced sentences that served neither.
 *
 * Where a project has no technical list yet, the left column keeps its old
 * heading and the right stays empty, which reads as a wide margin rather than
 * as something missing.
 */
export function ProjectBrief({ project, lang }: { project: Project; lang: Locale }) {
  const technical = project.technical;

  return (
    <div className="space-y-14">
      {/* Summary on the left, stack beside it. Loose chips under the paragraph
          read as leftovers; the panel gives them an edge to sit against. */}
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <Reveal>
          <p className="text-xl leading-relaxed md:text-2xl">{t(project.summary, lang)}</p>

          {/* Outcomes first where there are any: what the work changed matters
              more to somebody weighing me up than what it consisted of. */}
          {project.results && (
            <div className="mt-10 rounded-2xl border border-accent/20 bg-accent-wash/60 p-7">
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
        </Reveal>

        <Reveal delay={1}>
          <div className="rounded-2xl border border-accent/20 bg-accent-wash/50 p-7">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              <Layers className="h-3.5 w-3.5" />
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

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
            <Lightbulb className="h-3.5 w-3.5 text-accent" />
            {technical ? t(ui.whatItDoes, lang) : t(ui.highlights, lang)}
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
          {technical && (
            <>
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
                <Terminal className="h-3.5 w-3.5 text-accent" />
                {t(ui.howItIsBuilt, lang)}
              </h2>
              <ul className="mt-6 space-y-4">
                {t(technical, lang).map((point) => (
                  <li
                    key={point}
                    className="border-l-2 border-line pl-4 text-[0.9375rem] leading-relaxed text-ink-muted"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Reveal>
      </div>
    </div>
  );
}
