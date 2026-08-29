import Link from "next/link";
import { ArrowRight, Check, Globe, Heart, Layers, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { services, ui } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ButtonLink } from "./Button";
import { SpotlightGroup } from "./SpotlightGroup";
import { ServiceDemo } from "./ServiceDemo";

const icons: Record<string, LucideIcon> = {
  globe: Globe,
  layers: Layers,
  heart: Heart,
  wrench: Wrench,
};

interface ServicesProps {
  lang: Locale;
  /**
   * The home page shows compact cards that link through to /services; the
   * services page itself shows the full list with deliverables.
   */
  teaser?: boolean;
}

export function Services({ lang, teaser }: ServicesProps) {
  const cards = (
    <SpotlightGroup className="grid gap-5 sm:grid-cols-2">
      {services.map((service, i) => {
        const Icon = icons[service.icon] ?? Globe;
        const card = (
          <div className="spotlight group h-full rounded-2xl border border-line bg-surface p-7 shadow-card transition-all duration-300 hover:border-accent/35 hover:shadow-lift">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-wash text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-ink">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-xl font-semibold">{t(service.title, lang)}</h3>

            {/*
             * A floor under the paragraph, so the demo and the list below it
             * start at the same height in all four cards. The bodies differ by
             * a line or two, and without this each card began somewhere else.
             */}
            <p className="mt-2.5 leading-relaxed text-ink-muted sm:min-h-40 lg:min-h-28">
              {t(service.body, lang)}
            </p>

            {/* A working miniature of the thing itself, rather than another
                paragraph about it. */}
            <ServiceDemo id={service.id} lang={lang} />

            {teaser ? (
              <span
                aria-hidden
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100"
              >
                {t(ui.readMore, lang)}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            ) : (
              <ul className="mt-5 space-y-2 border-t border-line pt-5">
                {t(service.bullets, lang).map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-muted">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

        return (
          <Reveal key={service.id} delay={i} as="article">
            {teaser ? (
              <Link href={localePath(lang, "services")} className="block h-full">
                {card}
              </Link>
            ) : (
              card
            )}
          </Reveal>
        );
      })}
    </SpotlightGroup>
  );

  if (!teaser) return cards;

  return (
    <Section
      id="services"
      tinted
      eyebrow={t(ui.servicesEyebrow, lang)}
      heading={t(ui.servicesHeading, lang)}
      lead={t(ui.servicesLead, lang)}
    >
      {cards}
      <Reveal delay={2} className="mt-10 flex justify-center">
        <ButtonLink href={localePath(lang, "services")} variant="secondary">
          {t(ui.servicesCta, lang)}
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
