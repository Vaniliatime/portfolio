import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/site";
import type { Project } from "@/content/projects";
import { BrowserFrame } from "./BrowserFrame";
import { ProjectCover } from "./ProjectCover";
import { Reveal } from "./Reveal";

/**
 * The way on to the next case study.
 *
 * It used to be a line of text under the screenshots, in the same weight as
 * everything above it, at the point where a reader is most likely to stop: it
 * read as the end of the page rather than as a door. Now it is a card with the
 * next project's own cover in it, its title in the accent, and an arrow that
 * nudges on its own, so something on screen is still moving when the reading
 * has run out.
 */
export function NextProject({ project, lang }: { project: Project; lang: Locale }) {
  // The same chrome the hero puts around a screenshot, so a thumbnail here
  // reads as a site rather than as a decorative crop.
  const site = project.links.find((link) => link.kind === "site" && link.href);
  const host = site?.label ?? project.title;

  return (
    <div className="border-t border-line bg-surface-2/40">
      <div className="shell py-12 md:py-14">
        <Reveal>
          <Link
            href={localePath(lang, `work/${project.slug}`)}
            className="card-edge group block rounded-2xl shadow-card transition-shadow duration-300 hover:shadow-lift"
          >
            <div className="flex items-center gap-6 rounded-[calc(1rem-1px)] bg-surface p-5 md:gap-8 md:p-7">
              {/* The cover, so it reads as a project rather than as a link. */}
              <div className="hidden w-40 shrink-0 sm:block md:w-52">
                <BrowserFrame host={host} compact className="rounded-xl border border-line shadow-card">
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                    <ProjectCover
                      project={project}
                      sizes="(min-width: 768px) 208px, 160px"
                      className="transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                </BrowserFrame>
              </div>

              <div className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  <span aria-hidden className="h-px w-5 bg-accent/50" />
                  {t(ui.nextProject, lang)}
                </span>

                <span className="mt-2 block font-display text-2xl font-semibold text-accent transition-colors group-hover:text-accent-hover md:text-3xl">
                  {project.title}
                </span>

                <span className="mt-1.5 line-clamp-2 block text-[0.9375rem] leading-relaxed text-ink-muted">
                  {t(project.tagline, lang)}
                </span>
              </div>

              <span
                aria-hidden
                className="cta-pulse relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-300 group-hover:scale-110 md:h-14 md:w-14"
              >
                {/* Nudges every few seconds on its own, and steps further out
                    under the pointer: the same arrow language as the cards. */}
                <ArrowRight className="arrow-nudge h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 md:h-6 md:w-6" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
