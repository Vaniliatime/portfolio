import { Briefcase, Calendar, Languages, MapPin, type LucideIcon } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { about } from "@/content/site";

const factIcons: Record<string, LucideIcon> = {
  pin: MapPin,
  languages: Languages,
  briefcase: Briefcase,
  calendar: Calendar,
};

/**
 * Where someone is, what they work in, how long they have been at it.
 *
 * The questions that otherwise get asked in the first email. They sit in the
 * sidebar under the portrait, next to the story rather than inside it.
 */
export function AboutFacts({ lang }: { lang: Locale }) {
  return (
    <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
      {about.facts.map((fact) => {
        const Icon = factIcons[fact.icon] ?? MapPin;

        return (
          <div key={fact.icon} className="flex items-center gap-3.5 px-5 py-3.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-wash text-accent">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">
                {t(fact.label, lang)}
              </dt>
              <dd className="text-[0.9375rem] font-medium">{t(fact.value, lang)}</dd>
            </div>
          </div>
        );
      })}
    </dl>
  );
}
