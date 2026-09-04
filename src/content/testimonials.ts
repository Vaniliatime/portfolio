import type { Localized } from "@/lib/i18n";

/**
 * What clients said, in their own words.
 *
 * Anybody can put anything in this file, which is the problem with every
 * testimonial section on every portfolio, so each entry has to carry a name, a
 * company and a link to the work itself. A reader who doubts it can open the
 * site, find the business and ask them. That is the only verification a page
 * like this can honestly offer.
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
 * ============================ PLACEHOLDERS ================================
 *
 * These are NOT real. They exist so the section can be looked at before any
 * client has been asked for a quote, and every one of them says so out loud in
 * its own text and in the name attached to it.
 *
 * Before this site goes anywhere: replace them with real ones, or empty the
 * array and the section disappears on its own. Publishing invented praise from
 * invented people is the one thing a portfolio must not do.
 *
 * ==========================================================================
 */
export const testimonials: Testimonial[] = [
  {
    quote: {
      en: "Placeholder text, not a real quote. Two or three sentences is the right length: what the problem was, what changed, and what it was like to work together. Specific beats flattering every time.",
      pl: "Tekst zastępczy, nie prawdziwa opinia. Dwa albo trzy zdania to właściwa długość: jaki był problem, co się zmieniło i jak się pracowało. Konkret bije komplement za każdym razem.",
    },
    name: "Imię Nazwisko",
    role: { en: "Role, Company (placeholder)", pl: "Stanowisko, Firma (zaślepka)" },
    projectSlug: "passenger-transport",
  },
  {
    quote: {
      en: "Placeholder text, not a real quote. A second one shows how a pair of them sits side by side, and whether the section is worth keeping once there are only two.",
      pl: "Tekst zastępczy, nie prawdziwa opinia. Druga pokazuje, jak wyglądają obok siebie i czy sekcja broni się przy zaledwie dwóch.",
    },
    name: "Imię Nazwisko",
    role: { en: "Role, Company (placeholder)", pl: "Stanowisko, Firma (zaślepka)" },
    projectSlug: "ksztalcenie-sluchu",
  },
];
