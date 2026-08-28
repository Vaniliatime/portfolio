import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { contact, profile, ui } from "@/content/site";
import { LogoMark } from "./Logo";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";

/**
 * Two columns rather than a stack.
 *
 * Everything here is one line long, so stacking name, role, address, location,
 * icons and links gave the page a foot half a screen tall for six short pieces
 * of text. Left says who and where, right says how to reach me.
 */
export function Footer({ lang }: { lang: Locale }) {
  return (
    <footer className="relative z-10 border-t border-line bg-surface-2/50">
      <div className="shell py-10">
        <Reveal className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href={localePath(lang)} className="flex items-center gap-2.5">
              <LogoMark className="h-8" />
              <span className="font-display text-lg font-semibold tracking-tight">{profile.name}</span>
            </Link>
            <p className="mt-2 text-sm text-ink-muted">{t(profile.role, lang)}</p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-ink-muted">
              <MapPin className="h-4 w-4 shrink-0 text-accent" />
              {t(contact.note, lang)}
            </p>
          </div>

          <div className="sm:text-right">
            <div className="sm:flex sm:justify-end">
              <SocialLinks />
            </div>

            <a
              href={`mailto:${profile.email}`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              {profile.email}
            </a>
          </div>
        </Reveal>

        {/* Below the rule, beside the copyright: the two pages the header has
            no room for belong to the small print, not to the contact block. */}
        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-5 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. {t(ui.rights, lang)}
          </p>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href={localePath(lang, "services") + "#faq"}
              className="transition-colors hover:text-accent"
            >
              {t(ui.faqLink, lang)}
            </Link>
            <Link href={localePath(lang, "privacy")} className="transition-colors hover:text-accent">
              {t(ui.privacyLink, lang)}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
