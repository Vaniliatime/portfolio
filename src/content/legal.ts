import type { Localized } from "@/lib/i18n";
import { profile } from "./site";

/**
 * The privacy notice.
 *
 * Written from what the site actually does rather than from a template: one
 * contact form, one PHP handler, no analytics, no advertising and no tracking
 * cookies. The only thing kept in the browser is the light or dark preference,
 * and the only thing kept on the server is an hour of hashed addresses so the
 * form cannot be hammered. Saying exactly that is worth more than three pages
 * of boilerplate about cookies this site does not set.
 */
export const privacy = {
  eyebrow: { en: "Legal", pl: "Informacje prawne" } satisfies Localized,
  title: { en: "Privacy", pl: "Prywatność" } satisfies Localized,
  lead: {
    en: "What happens to your details when you write to me, in the shortest form that is still true.",
    pl: "Co dzieje się z Twoimi danymi, gdy do mnie piszesz, w najkrótszej formie, która pozostaje prawdziwa.",
  } satisfies Localized,
  updated: { en: "Last updated", pl: "Ostatnia aktualizacja" } satisfies Localized,
  updatedOn: "2026-08-28",
  sections: [
    {
      title: { en: "Who is responsible", pl: "Kto odpowiada za dane" },
      body: {
        en: `${profile.name}, running this site at ${profile.domain} as a private individual. Any question about your data goes to ${profile.email} and is answered by me, not by a department.`,
        pl: `${profile.name}, prowadzący tę stronę pod adresem ${profile.domain} jako osoba prywatna. Każde pytanie o Twoje dane kieruj na ${profile.email}, odpowiadam osobiście, a nie przez dział.`,
      },
    },
    {
      title: { en: "What is collected", pl: "Co jest zbierane" },
      body: {
        en: "Only what you type into the contact form: your name, your email address, the subject if you fill it in, and your message. Nothing is collected from you while you read the site.",
        pl: "Wyłącznie to, co wpiszesz w formularz kontaktowy: imię, adres e-mail, temat, jeśli go uzupełnisz, i treść wiadomości. Podczas samego czytania strony nie zbieram od Ciebie niczego.",
      },
    },
    {
      title: { en: "What it is used for", pl: "Do czego są używane" },
      body: {
        en: "Answering you, and carrying on the conversation if it turns into a project. Nothing is sold, shared for marketing, or added to a mailing list. There is no mailing list.",
        pl: "Do odpowiedzi i do dalszej rozmowy, jeśli przerodzi się w projekt. Nic nie jest sprzedawane, udostępniane w celach marketingowych ani dopisywane do newslettera. Newslettera nie ma.",
      },
    },
    {
      title: { en: "How long it is kept", pl: "Jak długo są przechowywane" },
      body: {
        en: "Your message stays in my mailbox as long as the correspondence is worth keeping, and for accounting purposes if we end up working together. Ask me to delete it and it goes.",
        pl: "Wiadomość zostaje w mojej skrzynce tak długo, jak korespondencja ma sens, a przy współpracy również na potrzeby rozliczeń. Poproś o usunięcie, a znika.",
      },
    },
    {
      title: { en: "Who else sees it", pl: "Kto jeszcze ma do nich dostęp" },
      body: {
        en: "The hosting provider that runs this site and passes the message on, and the provider of the mailbox it lands in. Nobody else, and nothing leaves the European Union.",
        pl: "Firma hostingowa, na której stoi ta strona i która przekazuje wiadomość dalej, oraz dostawca skrzynki, do której ona trafia. Nikt więcej, a dane nie opuszczają Unii Europejskiej.",
      },
    },
    {
      title: { en: "Cookies and tracking", pl: "Ciasteczka i śledzenie" },
      body: {
        en: "This site sets no tracking cookies, runs no analytics and carries no advertising or social media scripts. Your browser stores one thing locally: whether you chose the light or the dark theme. It never leaves your device and it is not readable by me.",
        pl: "Ta strona nie ustawia ciasteczek śledzących, nie ma analityki ani skryptów reklamowych czy społecznościowych. Przeglądarka zapisuje lokalnie jedną rzecz: czy wybrałeś motyw jasny czy ciemny. To nie opuszcza Twojego urządzenia i ja tego nie odczytuję.",
      },
    },
    {
      title: { en: "Protection against abuse", pl: "Ochrona przed nadużyciami" },
      body: {
        en: "So the form cannot be used to send thousands of messages, the handler keeps a scrambled version of the sending address for one hour and then forgets it. It cannot be turned back into your address and it is never attached to your message.",
        pl: "Żeby formularza nie dało się użyć do wysłania tysięcy wiadomości, skrypt przechowuje przez godzinę zaszyfrowany skrót adresu nadawcy, po czym o nim zapomina. Nie da się z niego odtworzyć Twojego adresu i nie jest on dołączany do wiadomości.",
      },
    },
    {
      title: { en: "Your rights", pl: "Twoje prawa" },
      body: {
        en: "Under the GDPR you can ask what I hold about you, have it corrected or deleted, object to me holding it at all, and receive a copy. One email is enough. If you think I have handled it badly, you can complain to the data protection authority where you live.",
        pl: "Zgodnie z RODO możesz zapytać, co o Tobie przechowuję, żądać sprostowania lub usunięcia, sprzeciwić się przetwarzaniu i otrzymać kopię danych. Wystarczy jeden mail. Jeśli uważasz, że postąpiłem źle, możesz złożyć skargę do organu ochrony danych w kraju, w którym mieszkasz.",
      },
    },
  ] satisfies { title: Localized; body: Localized }[],
};

/** Sits under the send button, where it is read rather than clicked past. */
export const formNotice = {
  en: "Your name, address and message are used to answer you and nothing else.",
  pl: "Twoje imię, adres i treść wiadomości służą wyłącznie do udzielenia odpowiedzi.",
} satisfies Localized;
