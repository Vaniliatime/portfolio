import Link from "next/link";
import { localePath, t, type Locale } from "@/lib/i18n";
import { profile, ui } from "@/content/site";
import { LogoMark } from "./Logo";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";

export function Footer({ lang }: { lang: Locale }) {
  return (
    <footer className="relative z-10 border-t border-line bg-surface-2/50">
      <div className="shell py-12">
        {/*
         * No navigation here on purpose: the header carries it, and repeating
         * the same five links vertically added nothing.
         */}
        <Reveal className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href={localePath(lang)} className="flex items-center gap-2.5">
              <LogoMark className="h-8" />
              <span className="font-display text-lg font-semibold tracking-tight">{profile.name}</span>
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(profile.role, lang)}</p>
          </div>

          <SocialLinks withEmail emailLabel={t(ui.emailMe, lang)} />
        </Reveal>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. {t(ui.rights, lang)}
          </p>
          <p>{t(ui.builtWith, lang)}</p>
        </div>
      </div>
    </footer>
  );
}
