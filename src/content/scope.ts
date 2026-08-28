import type { Localized } from "@/lib/i18n";

/**
 * The scope picker on the services page.
 *
 * Every option carries a rough number of weeks. They are added up and turned
 * into a range rather than a promise: the point is to give someone a sense of
 * size before they write, and to hand me an enquiry that already says what it
 * is about.
 */
export interface ScopeOption {
  id: string;
  label: Localized;
  /** Rough weeks of work. Halves are fine; the total becomes a range. */
  weeks: number;
}

export interface ScopeGroup {
  id: string;
  label: Localized;
  options: ScopeOption[];
}

export const scopeGroups: ScopeGroup[] = [
  {
    id: "kind",
    label: { en: "What is it", pl: "Co to jest" },
    options: [
      { id: "landing", label: { en: "One-page site", pl: "Strona one-page" }, weeks: 1 },
      { id: "business", label: { en: "Business website", pl: "Strona firmowa" }, weeks: 2.5 },
      { id: "app", label: { en: "Web application", pl: "Aplikacja webowa" }, weeks: 6 },
      { id: "invitation", label: { en: "Event invitation", pl: "Zaproszenie na imprezę" }, weeks: 2 },
      { id: "rescue", label: { en: "Fixing an existing site", pl: "Ratowanie istniejącej strony" }, weeks: 1 },
    ],
  },
  {
    id: "features",
    label: { en: "What it has to do", pl: "Co ma robić" },
    options: [
      { id: "contact", label: { en: "Contact form", pl: "Formularz kontaktowy" }, weeks: 0.5 },
      { id: "booking", label: { en: "Bookings or enquiries", pl: "Rezerwacje lub zapytania" }, weeks: 1.5 },
      { id: "accounts", label: { en: "User accounts", pl: "Konta użytkowników" }, weeks: 2 },
      { id: "dashboard", label: { en: "Dashboard and reports", pl: "Panel i raporty" }, weeks: 2 },
      { id: "rsvp", label: { en: "RSVP and guest list", pl: "RSVP i lista gości" }, weeks: 1 },
      { id: "payments", label: { en: "Online payments", pl: "Płatności online" }, weeks: 1.5 },
      { id: "multilingual", label: { en: "Two or more languages", pl: "Dwa języki lub więcej" }, weeks: 1 },
      { id: "blog", label: { en: "Blog or news", pl: "Blog lub aktualności" }, weeks: 1 },
    ],
  },
  {
    id: "after",
    label: { en: "After launch", pl: "Po starcie" },
    options: [
      { id: "hosting", label: { en: "Hosting and domain", pl: "Hosting i domena" }, weeks: 0.5 },
      { id: "seo", label: { en: "SEO groundwork", pl: "Fundament pod SEO" }, weeks: 1 },
      { id: "care", label: { en: "Ongoing maintenance", pl: "Stała opieka" }, weeks: 0 },
    ],
  },
];

export const scopeCopy = {
  eyebrow: { en: "Scope it out", pl: "Określ zakres" },
  heading: { en: "Tell me what you need", pl: "Powiedz, czego potrzebujesz" },
  lead: {
    en: "Tick what applies and the message below writes itself, with a rough sense of the size. Easier than facing an empty box, and it saves us both a round of questions.",
    pl: "Zaznacz, co pasuje, a wiadomość poniżej napisze się sama, razem z orientacyjną skalą. Łatwiej niż mierzyć się z pustym polem, a nam obu oszczędza rundy pytań.",
  },
  empty: {
    en: "Nothing picked yet. Tick anything above and the summary builds itself.",
    pl: "Nic jeszcze nie zaznaczone. Kliknij cokolwiek powyżej, a podsumowanie zbuduje się samo.",
  },
  summary: { en: "Your project", pl: "Twój projekt" },
  timeline: { en: "Rough timeline", pl: "Orientacyjny czas" },
  weeks: { en: "weeks", pl: "tygodni" },
  week: { en: "week", pl: "tydzień" },
  ongoing: { en: "plus ongoing care", pl: "plus stała opieka" },
  cta: { en: "Put this in my message", pl: "Wstaw to do wiadomości" },
  /*
   * It used to call itself an estimate rather than a quote, which read as
   * hedging about a price the picker never shows. It only ever counts weeks, so
   * that is what the note is about, and the price is named as the thing that
   * comes later.
   */
  note: {
    en: "This counts time, not money. What it costs depends on the detail, and I put a fixed figure on that after we have talked.",
    pl: "To liczy czas, nie pieniądze. Cena zależy od szczegółów i podaję ją po rozmowie, już jako stałą.",
  },
  prefilled: {
    en: "Written out from what you ticked above. Add anything else and send it.",
    pl: "Rozpisane z tego, co zaznaczyłeś powyżej. Dopisz, co chcesz, i wyślij.",
  },
  /** Heading of the message the picker writes into the contact form. */
  enquiryTitle: { en: "Project enquiry", pl: "Zapytanie o projekt" },
  enquiryIntro: { en: "I am after:", pl: "Potrzebuję:" },
  enquiryTimeline: { en: "Timeline from the scope picker:", pl: "Czas z konfiguratora:" },
} satisfies Record<string, Localized>;
