import type { Localized } from "@/lib/i18n";

/**
 * The questions that decide whether somebody writes or closes the tab.
 *
 * Ownership, invoicing and what happens when it goes wrong: all the things a
 * one-person operation has to answer out loud, because an agency's size answers
 * them by default and mine does not.
 */
export const faq: { question: Localized; answer: Localized }[] = [
  {
    question: { en: "Who owns the code and the design?", pl: "Do kogo należy kod i projekt?" },
    answer: {
      en: "You do, once the work is paid for. The repository, the design files, the domain and the hosting account all end up in your name. Nothing is licensed back to me and nothing stops working if we part ways.",
      pl: "Do Ciebie, z chwilą opłacenia pracy. Repozytorium, pliki projektowe, domena i konto hostingowe kończą zapisane na Ciebie. Nic nie jest mi licencjonowane z powrotem i nic nie przestaje działać, jeśli się rozstaniemy.",
    },
  },
  {
    question: { en: "Do you invoice?", pl: "Czy wystawiasz fakturę?" },
    answer: {
      en: "Yes, for every job, and for maintenance monthly. Payment is usually split: part when we agree the scope, the rest when the site goes live.",
      pl: "Tak, do każdego zlecenia, a przy opiece co miesiąc. Płatność zwykle dzielę: część przy ustaleniu zakresu, reszta przy uruchomieniu strony.",
    },
  },
  {
    question: { en: "How long does it take?", pl: "Ile to trwa?" },
    answer: {
      en: "A one-page site is a week or two, a business site three to five, an application counts in months. The scope picker above turns whatever you tick into a rough range, and the real timeline comes with the quote.",
      pl: "Strona one-page to tydzień lub dwa, strona firmowa trzy do pięciu, aplikacja liczy się w miesiącach. Konfigurator wyżej zamienia zaznaczone rzeczy w orientacyjny widelec, a prawdziwy harmonogram dostajesz razem z wyceną.",
    },
  },
  {
    question: {
      en: "Can I update the content myself afterwards?",
      pl: "Czy mogę potem sam aktualizować treści?",
    },
    answer: {
      en: "That is the point. Whatever changes often, prices, posts, photos, gets a way to edit it without touching code, and you get a walkthrough of it before launch. You should never have to pay someone to publish a post.",
      pl: "O to właśnie chodzi. To, co zmienia się często, czyli cennik, wpisy, zdjęcia, dostaje sposób na edycję bez dotykania kodu, a przed startem pokazuję, jak z tego korzystać. Nikt nie powinien płacić komuś za opublikowanie wpisu.",
    },
  },
  {
    question: { en: "What about hosting and the domain?", pl: "Co z hostingiem i domeną?" },
    answer: {
      en: "I set both up and deploy to them, on your account so the bills and the control stay yours. If you already have hosting, I work with what is there, as long as it can run the thing.",
      pl: "Jedno i drugie konfiguruję i tam wdrażam, na Twoim koncie, żeby rachunki i kontrola zostały po Twojej stronie. Jeśli masz już hosting, pracuję na tym, co jest, o ile udźwignie projekt.",
    },
  },
  {
    question: {
      en: "What if I do not like the design?",
      pl: "Co, jeśli projekt mi się nie spodoba?",
    },
    answer: {
      en: "You see it while it is being built, on a preview link, not at the end as a surprise. Changes along the way are part of the price. If we are heading somewhere you do not like, that is the moment to say so, and it costs nothing to turn around.",
      pl: "Widzisz go w trakcie budowy, pod linkiem podglądowym, a nie na końcu jako niespodziankę. Poprawki po drodze są w cenie. Jeśli idziemy w stronę, która Ci nie odpowiada, to jest moment, żeby to powiedzieć, i zawrócenie nic nie kosztuje.",
    },
  },
  {
    question: {
      en: "You have a full-time job. What if something breaks?",
      pl: "Masz etat. Co, jeśli coś się zepsuje?",
    },
    answer: {
      en: "Write and you get an answer within a day. Anything that takes the site down I look at the same evening; the rest waits for the weekend. I say this plainly because a one-person operation should: if you need somebody on call at three in the morning, you need an agency, not me.",
      pl: "Napisz, a odpowiedź dostaniesz w ciągu doby. To, co kładzie stronę, oglądam tego samego wieczoru, reszta czeka na weekend. Mówię to wprost, bo jednoosobowa działalność powinna: jeśli potrzebujesz kogoś pod telefonem o trzeciej w nocy, potrzebujesz agencji, nie mnie.",
    },
  },
];
