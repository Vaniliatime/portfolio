"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { nav, profile, ui } from "@/content/site";
import { cn } from "@/lib/utils";
import { LogoMark } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleToggle } from "./LocaleToggle";
import { ButtonLink } from "./Button";

export function Header({ lang }: { lang: Locale }) {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel whenever navigation actually happens.
  useEffect(() => setOpen(false), [pathname]);

  // Keep the page behind a full-screen menu from scrolling.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const home = localePath(lang);

  // Home must match exactly, or it would stay highlighted on every page.
  const isActive = (href: string) => {
    const target = localePath(lang, href);
    return href === "" ? pathname === target : pathname.startsWith(target);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        // Near-opaque rather than blurred: a backdrop filter here would
        // re-sample the moving cursor light on every pointer move.
        scrolled ? "border-b border-line bg-paper/95" : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 md:h-20">
        {/* The mark carries it alone. A name set beside it read as body text
            in a header rather than as a wordmark. */}
        <Link href={home} aria-label={profile.name} className="group flex items-center">
          <LogoMark animated className="h-9 transition-transform duration-300 group-hover:scale-105" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href || "home"}
                href={localePath(lang, item.href)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "bg-accent-wash text-accent" : "text-ink-muted hover:bg-surface-2 hover:text-ink",
                )}
              >
                {t(item.label, lang)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleToggle current={lang} />
          <ThemeToggle label={t(ui.toggleTheme, lang)} />
          <ButtonLink href={localePath(lang, "contact")} size="sm" className="hidden md:inline-flex">
            {t(ui.contactMe, lang)}
          </ButtonLink>
          <button
            type="button"
            aria-label={open ? t(ui.close, lang) : t(ui.menu, lang)}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper px-5 py-8 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href || "home"}
                href={localePath(lang, item.href)}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3.5 font-display text-xl font-medium transition-colors hover:bg-surface-2 hover:text-accent",
                  isActive(item.href) && "text-accent",
                )}
              >
                {t(item.label, lang)}
              </Link>
            ))}
          </nav>
          <ButtonLink
            href={localePath(lang, "contact")}
            className="mt-6 w-full"
            onClick={() => setOpen(false)}
          >
            {t(ui.contactMe, lang)}
          </ButtonLink>
        </div>
      )}
    </header>
  );
}
