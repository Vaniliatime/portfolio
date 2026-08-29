import type { Localized } from "@/lib/i18n";

export const profile = {
  name: "Krzysztof Kaszuba",
  shortName: "Chris",
  email: "contact@kkaszuba.eu",
  domain: "kkaszuba.eu",
  github: "https://github.com/Vaniliatime",
  linkedin: "https://www.linkedin.com/in/krzysztof-kaszuba/",
  /** Instagram profile URL. Empty hides the link everywhere. */
  instagram: "https://www.instagram.com/vaniliatime/",
  /**
   * Digits only, country code first, no plus. Empty hides the link.
   */
  whatsapp: "48791696637",
  avatar: "/images/avatar-3.webp",
  role: {
    en: "Web developer & IT support specialist",
    pl: "Web developer i specjalista IT support",
  } satisfies Localized,
};

/**
 * Navigation shared by the header and the footer.
 *
 * Every entry is a real page. An earlier version mixed home-page anchors with
 * routes, which made the menu look like it was duplicating itself: the home
 * page now only teases these sections and links onward.
 */
export const nav: { href: string; label: Localized }[] = [
  { href: "", label: { en: "Home", pl: "Start" } },
  { href: "work", label: { en: "Work", pl: "Projekty" } },
  { href: "services", label: { en: "Services", pl: "Usługi" } },
  { href: "about", label: { en: "About", pl: "O mnie" } },
  { href: "resume", label: { en: "Résumé", pl: "CV" } },
];

export const hero = {
  availability: {
    en: "Taking on side projects",
    pl: "Przyjmuję dodatkowe zlecenia",
  } satisfies Localized,
  headline: {
    en: ["I build websites and", "web apps that work", "on Monday morning."],
    pl: ["Buduję strony", "i aplikacje, które działają", "w poniedziałek rano."],
  } satisfies Localized<string[]>,
  /** The line inside the headline that gets the accent treatment. */
  accentWord: { en: "on Monday morning.", pl: "w poniedziałek rano." } satisfies Localized,
  intro: {
    en: "Most sites get built once, handed over, and left to quietly rot. I come at it from the other end: my day job is keeping enterprise systems alive, so I build the way somebody who takes the support calls builds. Websites, web apps, and the upkeep nobody else wants to do.",
    pl: "Większość stron powstaje raz, zostaje przekazana i po cichu zarasta. Ja podchodzę do tego z drugiej strony: na etacie pilnuję, żeby systemy korporacyjne żyły, więc buduję tak, jak buduje ktoś, kto odbiera telefony po awarii. Strony, aplikacje webowe i to utrzymanie, którego nikt inny nie chce.",
  } satisfies Localized,
  ctaPrimary: { en: "See the work", pl: "Zobacz projekty" } satisfies Localized,
  ctaSecondary: { en: "Start a project", pl: "Zacznijmy projekt" } satisfies Localized,
};


/** Value and suffix are separate so the number can be counted up on screen. */
export const stats: { value: number; suffix?: string; label: Localized }[] = [
  { value: 20, suffix: "+", label: { en: "Sites & apps built", pl: "Zbudowanych stron i aplikacji" } },
  { value: 7, label: { en: "Years working in IT", pl: "Lat pracy w IT" } },
  { value: 100, suffix: "%", label: { en: "Built and maintained solo", pl: "Zbudowane i utrzymywane solo" } },
];

export interface Service {
  id: string;
  icon: "globe" | "layers" | "heart" | "wrench";
  title: Localized;
  body: Localized;
  bullets: Localized<string[]>;
  /**
   * Where the price starts. Deliberately a floor and not a range: the work is
   * quoted per job, and a number that means nothing is worse than none. Set
   * against what a solo developer charges around here, so a visitor can tell in
   * one glance whether we are in the same conversation.
   */
  from: Localized;
}

export const services: Service[] = [
  {
    id: "websites",
    icon: "globe",
    title: { en: "Business websites", pl: "Strony dla firm" },
    body: {
      en: "A site that explains what you do and turns visitors into enquiries. Built fast, structured for search, and simple enough that you can update it yourself.",
      pl: "Strona, która tłumaczy, czym się zajmujesz, i zamienia odwiedzających w zapytania. Szybka, uporządkowana pod wyszukiwarki i na tyle prosta, że sam ją zaktualizujesz.",
    },
    from: { en: "from €500", pl: "od 2200 zł" },
    bullets: {
      en: ["Landing pages and multi-page sites", "Local SEO groundwork", "Contact and booking flows", "WordPress or hand-built"],
      pl: ["Landing page i strony wielopodstronowe", "Fundament pod lokalne SEO", "Ścieżki kontaktu i rezerwacji", "WordPress lub kodowane ręcznie"],
    },
  },
  {
    id: "apps",
    icon: "layers",
    title: { en: "Web applications", pl: "Aplikacje webowe" },
    body: {
      en: "When a website is not enough: people log in, data is stored, and something happens with it. Bookings, orders, a members' area, an internal tool that replaces a spreadsheet. I have taken one of those from an empty folder to a running server, on my own.",
      pl: "Gdy strona to za mało: ludzie się logują, dane są zapisywane i coś się z nimi dzieje. Rezerwacje, zamówienia, strefa dla klientów, narzędzie wewnętrzne zamiast arkusza. Jedną taką doprowadziłem od pustego katalogu po działający serwer, sam.",
    },
    from: { en: "from €1250", pl: "od 5500 zł" },
    bullets: {
      en: [
        "Accounts, logins and password resets",
        "Your data kept safe, and yours to export",
        "A panel where you see what is going on",
        "Email that goes out on its own",
      ],
      pl: [
        "Konta, logowanie i odzyskiwanie hasła",
        "Twoje dane bezpieczne i możliwe do wyeksportowania",
        "Panel, w którym widzisz, co się dzieje",
        "Maile wychodzące automatycznie",
      ],
    },
  },
  {
    id: "invitations",
    icon: "heart",
    title: { en: "Interactive invitations", pl: "Interaktywne zaproszenia" },
    body: {
      en: "Weddings and events, as a web page instead of card stock: your story, the schedule, directions, RSVP straight to your inbox, and something playable if you want guests to remember it.",
      pl: "Wesela i imprezy jako strona zamiast kartonika: wasza historia, harmonogram, dojazd, RSVP prosto na maila oraz coś grywalnego, jeśli chcecie, żeby goście to zapamiętali.",
    },
    from: { en: "from €350", pl: "od 1500 zł" },
    bullets: {
      en: ["Personalised one-page invitation", "RSVP form and guest list", "Photo uploads from guests", "Optional custom mini game"],
      pl: ["Spersonalizowane zaproszenie one-page", "Formularz RSVP i lista gości", "Wgrywanie zdjęć przez gości", "Opcjonalna autorska mini gra"],
    },
  },
  {
    id: "support",
    icon: "wrench",
    title: { en: "Support & maintenance", pl: "Wsparcie i utrzymanie" },
    body: {
      en: "The part most people skip. Hosting, updates, backups, broken forms, the thing that stopped working last Tuesday. That is my day job, five days a week.",
      pl: "Część, którą większość pomija. Hosting, aktualizacje, backupy, zepsute formularze, to coś, co przestało działać w zeszły wtorek. To moja praca od poniedziałku do piątku.",
    },
    from: { en: "from €50 a month", pl: "od 220 zł miesięcznie" },
    bullets: {
      en: ["Hosting and domain setup", "Updates, backups and monitoring", "Bug triage and fixes", "Performance and accessibility passes"],
      pl: ["Konfiguracja hostingu i domeny", "Aktualizacje, backupy i monitoring", "Diagnoza i naprawa błędów", "Przeglądy wydajności i dostępności"],
    },
  },
];

/**
 * Labels inside the little demonstrations on the service cards. Short on
 * purpose: they are set at 10px inside a 130px panel, and anything longer
 * stops looking like a real interface.
 */
export const serviceDemo = {
  websites: {
    nav: { en: "Home", pl: "Start" },
    headline: { en: "Your business", pl: "Twoja firma" },
    cta: { en: "Get a quote", pl: "Wyceń projekt" },
  },
  apps: {
    label: { en: "Signups", pl: "Rejestracje" },
    delta: { en: "+18% this week", pl: "+18% w tym tygodniu" },
  },
  invitations: {
    question: { en: "Coming?", pl: "Będziesz?" },
    yes: { en: "Yes", pl: "Tak" },
    no: { en: "No", pl: "Nie" },
    guests: { en: "Guests", pl: "Goście" },
  },
  support: {
    rows: [
      { en: "Backup", pl: "Backup" },
      { en: "Updates", pl: "Aktualizacje" },
      { en: "Uptime", pl: "Dostępność" },
    ] satisfies Localized[],
    uptime: "99.9%",
  },
};

/** Steps shown on the services page. */
export const process: { step: string; title: Localized; body: Localized }[] = [
  {
    step: "01",
    title: { en: "You tell me what you need", pl: "Mówisz, czego potrzebujesz" },
    body: {
      en: "One email is enough to start. What the thing has to do, roughly when you need it, and whether there is a budget in mind.",
      pl: "Wystarczy jeden mail. Co ma robić, mniej więcej na kiedy i czy masz założony budżet.",
    },
  },
  {
    step: "02",
    title: { en: "I come back with a plan and a price", pl: "Wracam z planem i wyceną" },
    body: {
      en: "Scope, what is in and what is out, a timeline and a fixed price. If I am not the right fit, I say so at this point rather than later.",
      pl: "Zakres, co wchodzi i co nie, harmonogram i stała cena. Jeśli nie jestem właściwą osobą, mówię to na tym etapie, a nie później.",
    },
  },
  {
    step: "03",
    title: { en: "You see it as it is built", pl: "Widzisz to w trakcie budowy" },
    body: {
      en: "Work goes up on a preview link you can open any time. Feedback along the way costs nothing; feedback after launch costs a rebuild.",
      pl: "Praca ląduje pod linkiem podglądowym, który możesz otworzyć w każdej chwili. Uwagi w trakcie nic nie kosztują, uwagi po starcie kosztują przebudowę.",
    },
  },
  {
    step: "04",
    title: { en: "It goes live, and stays live", pl: "Trafia online i tam zostaje" },
    body: {
      en: "Domain, hosting and deployment handled. Afterwards you can keep me on for updates and fixes, or take the keys and run it yourself.",
      pl: "Domena, hosting i wdrożenie po mojej stronie. Potem możesz zostawić mnie do aktualizacji i poprawek albo przejąć klucze i prowadzić to sam.",
    },
  },
];

export const about = {
  /*
   * Short enough to work as a page title. The line it used to carry runs
   * underneath as the lead, where a full sentence belongs.
   */
  heading: {
    en: "Support by day, building by night",
    pl: "W dzień support, po godzinach buduję",
  } satisfies Localized,
  lead: {
    en: "Support work taught me how software breaks. Building taught me how to stop it breaking.",
    pl: "Praca w supporcie nauczyła mnie, jak oprogramowanie się psuje. Budowanie nauczyło, jak temu zapobiegać.",
  } satisfies Localized,
  paragraphs: {
    en: [
      "I have worked in IT since 2019: first as an administrator and then a support engineer at a logistics company, and since 2024 on enterprise systems for the European Commission, triaging incidents, reproducing bugs and working alongside developers in Jira, ServiceNow and Oracle SQL.",
      "Outside work I build. Some of it is client work: a transport operator's three sites, an eBook store. Some of it is mine: a full-stack anime tracker running on my own server, a quiz app for ITIL certification, an interactive wedding invitation that is turning into a product.",
      "I studied game development with C# and Unity. I no longer make games, but the habit of thinking in systems and states never left, and it shows up every time I model data or design an interface.",
    ],
    pl: [
      "W IT pracuję od 2019 roku, najpierw jako administrator, potem support engineer w firmie logistycznej, a od 2024 przy systemach korporacyjnych dla Komisji Europejskiej, gdzie zajmuję się zgłoszeniami, odtwarzaniem błędów i pracą ramię w ramię z deweloperami w Jirze, ServiceNow i Oracle SQL.",
      "Poza pracą buduję. Część to zlecenia: trzy strony przewoźnika, sklep z eBookiem. Część jest moja: full-stackowy tracker anime na własnym serwerze, aplikacja quizowa do certyfikacji ITIL, interaktywne zaproszenie ślubne, które zmienia się w produkt.",
      "Studiowałem game development w C# i Unity. Gier już nie robię, ale nawyk myślenia systemami i stanami został i wraca za każdym razem, gdy modeluję dane albo projektuję interfejs.",
    ],
  } satisfies Localized<string[]>,
  /** Breaks the prose in half, and says the thing the prose dances around. */
  quote: {
    en: "Seven years of watching software break is an odd way into building it. It is also the best one I know.",
    pl: "Siedem lat patrzenia, jak oprogramowanie się psuje, to dziwna droga do budowania go. I najlepsza, jaką znam.",
  } satisfies Localized,
  /** Quick answers to the things people ask before they write. */
  facts: [
    {
      icon: "pin",
      label: { en: "Based in", pl: "Lokalizacja" },
      value: { en: "Belgium", pl: "Belgia" },
    },
    {
      icon: "languages",
      label: { en: "Working languages", pl: "Języki pracy" },
      value: { en: "English, Polish", pl: "Angielski, polski" },
    },
    {
      icon: "briefcase",
      label: { en: "Day job", pl: "Na etacie" },
      value: { en: "Enterprise IT support", pl: "Korporacyjny IT support" },
    },
    {
      icon: "calendar",
      label: { en: "In IT since", pl: "W IT od" },
      value: { en: "2019", pl: "2019" },
    },
  ] satisfies { icon: string; label: Localized; value: Localized }[],
  offscreen: {
    title: { en: "Away from the screen", pl: "Z dala od ekranu" } satisfies Localized,
    items: [
      { icon: "cpu", label: { en: "Building PCs", pl: "Składanie komputerów" } },
      { icon: "ball", label: { en: "Tennis", pl: "Tenis" } },
      { icon: "bike", label: { en: "Cycling", pl: "Rower" } },
    ] satisfies { icon: string; label: Localized }[],
  },
};

export const skillGroups: { title: Localized; items: string[] }[] = [
  {
    title: { en: "Front end", pl: "Front end" },
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion", "HTML & CSS", "Bootstrap"],
  },
  {
    title: { en: "Back end & data", pl: "Back end i dane" },
    items: ["Node.js", "Express", "Prisma", "SQLite", "Oracle SQL", "REST APIs", "NextAuth"],
  },
  {
    title: { en: "Platforms & ops", pl: "Platformy i ops" },
    items: ["WordPress", "WooCommerce", "Linux server", "Hosting & DNS", "Git", "Vite"],
  },
  {
    title: { en: "Support & process", pl: "Support i procesy" },
    items: ["Jira", "ServiceNow", "Incident triage", "ITIL", "Documentation"],
  },
];

export const contact = {
  heading: { en: "Let's build something together", pl: "Zbudujmy coś razem" } satisfies Localized,
  lead: {
    en: "Got something in mind? Even half an idea is enough to start a conversation. Every message gets an answer, even when the honest answer is that someone else suits it better.",
    pl: "Masz coś w głowie? Nawet pół pomysłu wystarczy, żeby zacząć rozmowę. Na każdą wiadomość odpowiadam, nawet jeśli odpowiedź brzmi, że ktoś inny lepiej się do tego nadaje.",
  } satisfies Localized,
  note: {
    en: "Based in Belgium, working remotely with clients in English and Polish.",
    pl: "Mieszkam w Belgii, pracuję zdalnie z klientami po polsku i po angielsku.",
  } satisfies Localized,
};

/** Social links, in the order they appear. Entries without a value drop out. */
export type SocialId = "github" | "linkedin" | "instagram" | "whatsapp";

interface Social {
  id: SocialId;
  label: string;
  href: string;
}

export const socials: Social[] = (
  [
    { id: "github", label: "GitHub", href: profile.github },
    { id: "linkedin", label: "LinkedIn", href: profile.linkedin },
    { id: "instagram", label: "Instagram", href: profile.instagram },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: profile.whatsapp ? `https://wa.me/${profile.whatsapp}` : "",
    },
  ] satisfies Social[]
).filter((social) => social.href.length > 0);

export const ui = {
  allWork: { en: "All work", pl: "Wszystkie" },
  viewProject: { en: "View project", pl: "Zobacz projekt" },
  visitSite: { en: "Visit site", pl: "Otwórz stronę" },
  comingSoon: { en: "Coming soon", pl: "Wkrótce" },
  sourceCode: { en: "Source code", pl: "Kod źródłowy" },
  featured: { en: "Selected work", pl: "Wybrane projekty" },
  featuredHeading: {
    en: "A few things I have built",
    pl: "Kilka rzeczy, które zbudowałem",
  },
  featuredLead: {
    en: "A few examples out of a longer list: work for clients, products of my own, and things still being built. The rest is under Work.",
    pl: "Kilka przykładów z dłuższej listy: prace dla klientów, własne produkty i rzeczy wciąż w budowie. Resztę znajdziesz w Projektach.",
  },
  readMore: { en: "Read more", pl: "Czytaj więcej" },
  viewResume: { en: "View my résumé", pl: "Zobacz moje CV" },
  servicesCta: { en: "See what each one includes", pl: "Zobacz, co obejmuje każda z nich" },
  aboutCta: { en: "More about me", pl: "Więcej o mnie" },
  processHeading: { en: "How working together looks", pl: "Jak wygląda współpraca" },
  processLead: {
    en: "No agency layers. You talk to the person writing the code, from the first message to the site being live.",
    pl: "Bez agencyjnych warstw. Rozmawiasz z osobą, która pisze kod: od pierwszej wiadomości po uruchomienie strony.",
  },
  servicesEyebrow: { en: "Services", pl: "Usługi" },
  pricingNote: {
    en: "Every job is quoted individually, because what a site has to do decides what it costs. The figures below are starting points, not a price list.",
    pl: "Każde zlecenie wyceniam indywidualnie, bo o cenie decyduje to, co strona ma robić. Poniższe kwoty to punkty wyjścia, a nie cennik.",
  },
  faqEyebrow: { en: "Questions", pl: "Pytania" },
  faqHeading: { en: "Things worth asking before you write", pl: "O co warto zapytać przed napisaniem" },
  faqLead: {
    en: "The answers I would want if I were the one hiring.",
    pl: "Odpowiedzi, których sam bym oczekiwał, gdybym to ja zlecał.",
  },
  faqLink: { en: "Questions & answers", pl: "Pytania i odpowiedzi" },
  testimonialsEyebrow: { en: "Clients", pl: "Klienci" },
  testimonialsHeading: { en: "What they said afterwards", pl: "Co powiedzieli po wszystkim" },
  testimonialsNote: {
    en: "Every quote comes with a name, a business and a link to the work, so you can go and check.",
    pl: "Przy każdej opinii jest nazwisko, firma i link do zrealizowanej pracy, więc możesz to sprawdzić.",
  },
  replyTime: {
    en: "An answer within 24 hours, with a first estimate and how I would approach it.",
    pl: "Odpowiedź w ciągu 24 godzin, ze wstępną wyceną i pomysłem na realizację.",
  },
  results: { en: "What it changed", pl: "Co to zmieniło" },
  privacyLink: { en: "Privacy", pl: "Prywatność" },
  sentEyebrow: { en: "Sent", pl: "Wysłane" },
  sentHeading: { en: "Your message is on its way", pl: "Wiadomość poszła w drogę" },
  sentLead: {
    en: "It landed in my inbox, and you get an answer within 24 hours with a first estimate and how I would approach it. If it is urgent, my address and phone are on the contact page.",
    pl: "Trafiła do mojej skrzynki, a odpowiedź dostaniesz w ciągu 24 godzin, ze wstępną wyceną i pomysłem na realizację. Jeśli sprawa pali się bardziej, adres i telefon są na stronie kontaktu.",
  },
  sentMeanwhile: { en: "While you wait", pl: "W międzyczasie" },
  sentBackHome: { en: "Back to the home page", pl: "Wróć na stronę główną" },
  aboutEyebrow: { en: "About", pl: "O mnie" },
  skillsHeading: { en: "Tools I reach for", pl: "Narzędzia, po które sięgam" },
  servicesHeading: { en: "What I can build for you", pl: "Co mogę dla Ciebie zbudować" },
  servicesLead: {
    en: "Four things I take on outside my day job. Something close to one of them? Just ask.",
    pl: "Cztery rzeczy, które biorę poza etatem. Coś podobnego? Po prostu zapytaj.",
  },
  role: { en: "Role", pl: "Rola" },
  year: { en: "Year", pl: "Rok" },
  status: { en: "Status", pl: "Status" },
  previous: { en: "Previous", pl: "Poprzedni" },
  next: { en: "Next", pl: "Następny" },
  stack: { en: "Stack", pl: "Technologie" },
  highlights: { en: "What went into it", pl: "Co się na to złożyło" },
  whatItDoes: { en: "In practice", pl: "Zastosowanie" },
  howItIsBuilt: { en: "How it is built", pl: "Jak jest zrobione" },
  backToWork: { en: "Back to all work", pl: "Wróć do projektów" },
  nextProject: { en: "Next project", pl: "Następny projekt" },
  emailMe: { en: "Email me", pl: "Napisz maila" },
  contactMe: { en: "Contact me", pl: "Skontaktuj się ze mną" },
  backToTop: { en: "Back to top", pl: "Wróć na górę" },
  scrollDown: { en: "Scroll down to the work", pl: "Przewiń w dół do projektów" },
  copyEmail: { en: "Copy address", pl: "Skopiuj adres" },
  copied: { en: "Copied", pl: "Skopiowano" },
  toggleTheme: { en: "Toggle theme", pl: "Przełącz motyw" },
  menu: { en: "Menu", pl: "Menu" },
  close: { en: "Close", pl: "Zamknij" },
  downloadCv: { en: "Download PDF", pl: "Pobierz PDF" },
  rights: { en: "All rights reserved.", pl: "Wszelkie prawa zastrzeżone." },
} satisfies Record<string, Localized>;
