import { Check, Globe, Heart, Layers, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { services, ui } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

const icons: Record<string, LucideIcon> = {
  globe: Globe,
  layers: Layers,
  heart: Heart,
  wrench: Wrench,
};

export function Services({ lang }: { lang: Locale }) {
  return (
    <Section
      id="services"
      tinted
      eyebrow={t(ui.servicesEyebrow, lang)}
      heading={t(ui.servicesHeading, lang)}
      lead={t(ui.servicesLead, lang)}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {services.map((service, i) => {
          const Icon = icons[service.icon] ?? Globe;
          return (
            <Reveal key={service.id} delay={i} as="article">
              <div className="group h-full rounded-2xl border border-line bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-lift">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-wash text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-ink">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{t(service.title, lang)}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-muted">{t(service.body, lang)}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {t(service.bullets, lang).map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-muted">
                      <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
