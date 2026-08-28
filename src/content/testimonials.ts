import type { Localized } from "@/lib/i18n";

/**
 * What clients said, in their own words.
 *
 * Anybody can put anything in this file, which is the problem with every
 * testimonial section on every portfolio, so each entry has to carry a name, a
 * company and a link to the work itself. A reader who doubts it can open the
 * site, find the business and ask them. That is the only verification a page
 * like this can honestly offer.
 *
 * Empty until real quotes arrive. The section hides itself rather than shipping
 * anything invented.
 */
export interface Testimonial {
  /** The quote, in whatever language it was given, translated for the other. */
  quote: Localized;
  name: string;
  /** Role and company, e.g. "Owner, Klikbus Service". */
  role: Localized;
  /** Slug of the project it refers to, so the reader can go and look. */
  projectSlug?: string;
}

export const testimonials: Testimonial[] = [];
