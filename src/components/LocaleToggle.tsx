"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, switchLocalePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LocaleToggle({ current }: { current: Locale }) {
  const pathname = usePathname() ?? "/";

  return (
    <div className="flex items-center rounded-full border border-line p-0.5 text-xs font-semibold">
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={switchLocalePath(pathname, locale)}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
              active ? "bg-accent text-accent-ink" : "text-ink-faint hover:text-ink",
            )}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
