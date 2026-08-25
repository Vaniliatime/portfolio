import type { Metadata } from "next";
import { localePath, locales, type Locale } from "@/lib/i18n";

/**
 * Canonical plus hreflang set for one page.
 *
 * Next inherits `alternates` from a parent layout, so a page that omits this
 * would silently claim the home page as its canonical URL, telling search
 * engines it is a duplicate. Every route sets its own.
 */
export function alternatesFor(lang: Locale, path = ""): Metadata["alternates"] {
  return {
    canonical: localePath(lang, path),
    languages: Object.fromEntries(locales.map((l) => [l, localePath(l, path)])),
  };
}
