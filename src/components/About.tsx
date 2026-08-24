import { t, type Locale } from "@/lib/i18n";
import { about, skillGroups, ui } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function About({ lang }: { lang: Locale }) {
  return (
    <Section id="about" eyebrow={t(ui.aboutEyebrow, lang)} heading={t(about.lead, lang)}>
      <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <Reveal className="space-y-5 text-[1.0625rem] leading-relaxed text-ink-muted">
          {t(about.paragraphs, lang).map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={1}>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
            {t(ui.skillsHeading, lang)}
          </h3>
          <div className="mt-6 space-y-6">
            {skillGroups.map((group) => (
              <div key={group.items.join()}>
                <h4 className="text-sm font-semibold text-accent">{t(group.title, lang)}</h4>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-surface px-2.5 py-1 text-[0.8125rem] text-ink-muted transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
