import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { nav, profile, ui } from "@/content/site";

export function Footer({ lang }: { lang: Locale }) {
  const home = localePath(lang);

  return (
    <footer className="relative z-10 border-t border-line bg-surface-2/50">
      <div className="shell py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href={home} className="font-display text-lg font-semibold tracking-tight">
              {profile.name}
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(profile.role, lang)}</p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={`mailto:${profile.email}`}
                aria-label={t(ui.emailMe, lang)}
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-accent/50 hover:bg-accent-wash hover:text-accent"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-accent/50 hover:bg-accent-wash hover:text-accent"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-accent/50 hover:bg-accent-wash hover:text-accent"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5 text-sm">
            {nav.map((item) => (
              <Link
                key={item.href || "home"}
                href={localePath(lang, item.href)}
                className="text-ink-muted transition-colors hover:text-accent"
              >
                {t(item.label, lang)}
              </Link>
            ))}
            <Link href={localePath(lang, "contact")} className="text-ink-muted transition-colors hover:text-accent">
              {t(ui.emailMe, lang)}
            </Link>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. {t(ui.rights, lang)}
          </p>
          <p>{t(ui.builtWith, lang)}</p>
        </div>
      </div>
    </footer>
  );
}
