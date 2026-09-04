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
 * Empty until real quotes exist, and the section removes itself while it is:
 * an empty list renders nothing at all rather than an empty heading. Adding one
 * entry brings the whole section back, on the home page and on the services
 * page both.
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

/*
 * The shape, for when there is a real one to add:
 *
 * {
 *   quote: {
 *     en: "Two or three sentences: what the problem was, what changed, and what
 *          it was like to work together.",
 *     pl: "Dwa albo trzy zdania: jaki był problem, co się zmieniło i jak się
 *          pracowało.",
 *   },
 *   name: "Imię Nazwisko",
 *   role: { en: "Owner, Klikbus Service", pl: "Właściciel, Klikbus Service" },
 *   projectSlug: "passenger-transport",
 * }
 */
export const testimonials: Testimonial[] = [];
