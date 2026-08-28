import { ArrowRight, Bike, Cpu, Volleyball } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { about, skillGroups, ui } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ButtonLink } from "./Button";
import { TechIcon } from "./icons/TechIcon";
import { cn } from "@/lib/utils";

const offscreenIcons: Record<string, LucideIcon> = {
  cpu: Cpu,
  ball: Volleyball,
  bike: Bike,
};

interface AboutProps {
  lang: Locale;
  /** The home page shows a short version and links through to /about. */
  teaser?: boolean;
}

/**
 * The story, broken up so it can be read rather than waded through.
 *
 * Stacked, never columned. Side by side, four groups of chips tower over three
 * short paragraphs, and wherever the two are lined up the other end is left as
 * a hole: we tried the top, the second paragraph and the title, and each one
 * moved the gap somewhere else. Underneath, nothing stands beside anything.
 */
export function About({ lang, teaser }: AboutProps) {
  const paragraphs = t(about.paragraphs, lang);
  const shown = teaser ? paragraphs.slice(0, 2) : paragraphs;
  const [opening, ...rest] = shown;

  const body = (
    <div className={teaser ? undefined : "space-y-14"}>
      <Reveal className={teaser ? "max-w-3xl" : undefined}>
        {/* The opening carries the weight, so it is set as a lead rather than
            as the first of three identical blocks. */}
        <p className="text-lg leading-relaxed text-ink md:text-xl">{opening}</p>

        {/* The aside splits the prose rather than sitting after it: a card at
            the end read as a second heading, and the paragraphs it was meant to
            break up ran on regardless. */}
        {!teaser && (
          <blockquote className="my-8 border-l-2 border-accent/50 pl-5 font-display text-lg leading-snug text-ink md:text-xl">
            {t(about.quote, lang)}
          </blockquote>
        )}

        <div className="mt-5 space-y-5 text-[1.0625rem] leading-relaxed text-ink-muted">
          {rest.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        {!teaser && (
          <div className="mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
              {t(about.offscreen.title, lang)}
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {about.offscreen.items.map((item) => {
                const Icon = offscreenIcons[item.icon] ?? Cpu;

                return (
                  <li
                    key={item.icon}
                    className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-[0.9375rem] font-medium transition-colors hover:border-accent/40"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-wash text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                    {t(item.label, lang)}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {teaser && (
          <ButtonLink href={localePath(lang, "about")} variant="secondary" size="sm" className="mt-7">
            {t(ui.aboutCta, lang)}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        )}
      </Reveal>

      {/* Full width underneath the prose, in four columns of its own so the
          chips have room to breathe rather than wrapping three to a line. */}
      <Reveal delay={1} className={teaser ? "mt-14 border-t border-line pt-10" : undefined}>
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
          {t(ui.skillsHeading, lang)}
        </h3>
        <div className={cn("mt-6", teaser ? "grid gap-7 sm:grid-cols-2 lg:grid-cols-4" : "space-y-6")}>
          {skillGroups.map((group) => (
            <div key={group.items.join()}>
              <h4 className="text-sm font-semibold text-accent">{t(group.title, lang)}</h4>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1 text-[0.8125rem] text-ink-muted transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <TechIcon name={item} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );

  if (!teaser) return body;

  return (
    <Section
      id="about"
      eyebrow={t(ui.aboutEyebrow, lang)}
      heading={t(about.heading, lang)}
      lead={t(about.lead, lang)}
    >
      {body}
    </Section>
  );
}
