import { ArrowRight, Clock, MapPin } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { contact, ui } from "@/content/site";
import { Reveal } from "./Reveal";
import { ButtonLink } from "./Button";
import { SocialLinks } from "./SocialLinks";

export function ContactCta({ lang }: { lang: Locale }) {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-7 py-12 text-center shadow-card md:px-16 md:py-16">
            <div aria-hidden className="aurora opacity-70" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
                {t(contact.heading, lang)}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t(contact.lead, lang)}</p>

              {/* The promise that makes writing feel worth it, next to the
                  button rather than only on the contact page. */}
              <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent-wash px-4 py-2 text-sm font-medium text-accent">
                <Clock className="h-4 w-4 shrink-0" />
                {t(ui.replyTime, lang)}
              </p>

              {/* One route through to the contact page, rather than an address
                  to copy and a mailto that may not open anything. */}
              <div className="mt-8 flex justify-center">
                <ButtonLink href={localePath(lang, "contact")}>
                  {t(ui.contactMe, lang)}
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>

              <div className="mt-9 flex flex-col items-center gap-5">
                <SocialLinks />
                <span className="inline-flex items-center gap-1.5 text-sm text-ink-faint">
                  <MapPin className="h-3.5 w-3.5" />
                  {t(contact.note, lang)}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
