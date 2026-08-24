export const locales = ["en", "pl"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Narrow a raw route param to a Locale. Next's generated route types hand
 * params over as plain strings, so pages take a string and funnel it here.
 */
export function toLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/** A string that exists in every supported language. */
export type Localized<T = string> = Record<Locale, T>;

/** Pull the active language out of a localized value. */
export function t<T>(value: Localized<T>, lang: Locale): T {
  return value[lang];
}

/**
 * Rewrite the current pathname for a different language, so switching keeps
 * the visitor on the page they were reading.
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) segments.shift();
  return localePath(target, segments.join("/"));
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  pl: "Polski",
};

/**
 * Build an href for the given locale. Every language carries its own prefix
 * (/en/work/, /pl/work/); Apache redirects the bare domain to the default.
 * Trailing slashes match `trailingSlash: true` in next.config.
 */
export function localePath(lang: Locale, path = ""): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}
