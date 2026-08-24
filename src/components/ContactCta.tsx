import { ArrowUpRight, Github, Mail, MapPin } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { contact, profile, ui } from "@/content/site";
import { Reveal } from "./Reveal";
import { ButtonLink } from "./Button";
import { CopyEmail } from "./CopyEmail";

export function ContactCta({ lang }: { lang: Locale }) {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-7 py-14 text-center shadow-card md:px-16 md:py-20">
            <div aria-hidden className="aurora opacity-70" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
                {t(contact.heading, lang)}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t(contact.lead, lang)}</p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href={`mailto:${profile.email}`} external>
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </ButtonLink>
                <CopyEmail
                  email={profile.email}
                  label={t(ui.copyEmail, lang)}
                  copiedLabel={t(ui.copied, lang)}
                />
              </div>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-faint">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {t(contact.note, lang)}
                </span>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
