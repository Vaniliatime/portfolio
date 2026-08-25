import type { Localized } from "@/lib/i18n";

export const profile = {
  name: "Krzysztof Kaszuba",
  shortName: "Chris",
  email: "kaszubakrzysiek@gmail.com",
  domain: "kkaszuba.eu",
  github: "https://github.com/Vaniliatime",
  linkedin: "https://www.linkedin.com/in/krzysztof-kaszuba/",
  /** Instagram profile URL. Empty hides the link everywhere. */
  instagram: "",
  /** Digits only, country code first, no plus. Empty hides the link. */
  whatsapp: "",
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
    pl: "Przyjmuję zlecenia dodatkowe",
  } satisfies Localized,
  headline: {
    en: ["I build websites and", "web apps that", "actually ship."],
    pl: ["Buduję strony i", "aplikacje webowe,", "które trafiają do ludzi."],
  } satisfies Localized<string[]>,
  /** The word inside the headline that gets the accent treatment. */
  accentWord: { en: "actually ship.", pl: "które trafiają do ludzi." } satisfies Localized,
  intro: {
    en: "I work in enterprise IT support by day and build for clients on the side: from a booking site for a transport company to a full-stack tracking app running on my own server. If you need something built properly and maintained after launch, that is the part I enjoy.",
    pl: "Na co dzień pracuję w korporacyjnym IT support, a po godzinach buduję dla klientów: od strony rezerwacyjnej dla firmy przewozowej po full-stackową aplikację działającą na moim serwerze. Jeśli potrzebujesz czegoś zrobionego porządnie i utrzymywanego po starcie, to jest ta część, którą lubię najbardziej.",
  } satisfies Localized,
  ctaPrimary: { en: "See the work", pl: "Zobacz projekty" } satisfies Localized,
  ctaSecondary: { en: "Start a project", pl: "Zacznijmy projekt" } satisfies Localized,
  /** Project put on screen in the hero. Needs a cover image to look right. */
  showcaseSlug: "amtracker",
  /** Chips floating around the showcase: the stack behind what is on screen. */
  badges: {
    en: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    pl: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
  } satisfies Localized<string[]>,
};


/** Value and suffix are separate so the number can be counted up on screen. */
export const stats: { value: number; suffix?: string; label: Localized }[] = [
  { value: 6, suffix: "+", label: { en: "Sites & apps shipped", pl: "Wdrożonych stron i aplikacji" } },
  { value: 7, label: { en: "Years working in IT", pl: "Lat pracy w IT" } },
  { value: 100, suffix: "%", label: { en: "Built and maintained solo", pl: "Zbudowane i utrzymywane solo" } },
];

export interface Service {
  id: string;
  icon: "globe" | "layers" | "heart" | "wrench";
  title: Localized;
  body: Localized;
  bullets: Localized<string[]>;
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
      en: "Something with accounts, data and logic behind it. I have built and shipped one end to end: schema, auth, two-factor, email, dashboards and deployment.",
      pl: "Coś z kontami, danymi i logiką w tle. Zbudowałem i wdrożyłem taką od początku do końca: schemat bazy, logowanie, 2FA, maile, panele i deployment.",
    },
    bullets: {
      en: ["React and Next.js front ends", "Databases and REST APIs", "Authentication and user accounts", "Charts, dashboards and reporting"],
      pl: ["Front end w React i Next.js", "Bazy danych i REST API", "Uwierzytelnianie i konta użytkowników", "Wykresy, panele i raportowanie"],
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
      en: "The part most people skip. Hosting, updates, backups, broken forms, the thing that stopped working last Tuesday. This is literally my day job.",
      pl: "Część, którą większość pomija. Hosting, aktualizacje, backupy, zepsute formularze, to coś, co przestało działać w zeszły wtorek. To dosłownie moja codzienna praca.",
    },
    bullets: {
      en: ["Hosting and domain setup", "Updates, backups and monitoring", "Bug triage and fixes", "Performance and accessibility passes"],
      pl: ["Konfiguracja hostingu i domeny", "Aktualizacje, backupy i monitoring", "Diagnoza i naprawa błędów", "Przeglądy wydajności i dostępności"],
    },
  },
];

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
  heading: { en: "About", pl: "O mnie" } satisfies Localized,
  lead: {
    en: "Support work taught me how software breaks. Building taught me how to stop it breaking.",
    pl: "Praca w supporcie nauczyła mnie, jak oprogramowanie się psuje. Budowanie nauczyło, jak temu zapobiegać.",
  } satisfies Localized,
  paragraphs: {
    en: [
      "I have worked in IT since 2019: first as an administrator and then a support engineer at a logistics company, and since 2024 on enterprise systems at the European Commission, triaging incidents, reproducing bugs and working alongside developers in Jira, ServiceNow and Oracle SQL. It is unglamorous, and it is the best possible training for building things that other people have to rely on.",
      "Outside work I build. Some of it is client work: a transport operator's three sites, an eBook store. Some of it is mine: a full-stack anime tracker running on my own server, a quiz app for ITIL certification, an interactive wedding invitation that is turning into a product.",
      "I studied game development with C# and Unity. I no longer make games, but the habit of thinking in systems and states never left, and it shows up every time I model data or design an interface.",
      "Away from a screen you will find me building PCs, playing tennis, or out on a bike.",
    ],
    pl: [
      "W IT pracuję od 2019 roku, najpierw jako administrator, potem support engineer w firmie logistycznej, a od 2024 przy systemach korporacyjnych w Komisji Europejskiej, gdzie zajmuję się zgłoszeniami, odtwarzaniem błędów i pracą ramię w ramię z deweloperami w Jirze, ServiceNow i Oracle SQL. Mało efektowne, a przy tym najlepszy możliwy trening przed budowaniem rzeczy, na których ktoś musi polegać.",
      "Poza pracą buduję. Część to zlecenia: trzy strony przewoźnika, sklep z eBookiem. Część jest moja: full-stackowy tracker anime na własnym serwerze, aplikacja quizowa do certyfikacji ITIL, interaktywne zaproszenie ślubne, które zmienia się w produkt.",
      "Studiowałem game development w C# i Unity. Gier już nie robię, ale nawyk myślenia systemami i stanami został i wraca za każdym razem, gdy modeluję dane albo projektuję interfejs.",
      "Z dala od ekranu składam komputery, gram w tenisa albo jeżdżę na rowerze.",
    ],
  } satisfies Localized<string[]>,
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
  heading: { en: "Let's build something", pl: "Zbudujmy coś razem" } satisfies Localized,
  lead: {
    en: "Tell me what you need and roughly when. I reply to everything, including a straight no if I am not the right fit.",
    pl: "Napisz, czego potrzebujesz i mniej więcej na kiedy. Odpisuję na każdą wiadomość, łącznie ze szczerym „nie”, jeśli nie jestem właściwą osobą.",
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
  sourceCode: { en: "Source code", pl: "Kod źródłowy" },
  featured: { en: "Selected work", pl: "Wybrane projekty" },
  featuredHeading: {
    en: "Things I built, shipped and still look after",
    pl: "Rzeczy, które zbudowałem, wdrożyłem i wciąż utrzymuję",
  },
  featuredLead: {
    en: "Four projects that show the range: a product, a client engagement, and two things still being built.",
    pl: "Cztery projekty pokazujące zakres: produkt, zlecenie komercyjne i dwie rzeczy wciąż w budowie.",
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
  aboutEyebrow: { en: "About", pl: "O mnie" },
  skillsHeading: { en: "Tools I reach for", pl: "Narzędzia, po które sięgam" },
  servicesHeading: { en: "What I can build for you", pl: "Co mogę dla Ciebie zbudować" },
  servicesLead: {
    en: "Four things I take on outside my day job. Anything adjacent, just ask.",
    pl: "Cztery rzeczy, które biorę poza etatem. Coś pokrewnego? Po prostu zapytaj.",
  },
  role: { en: "Role", pl: "Rola" },
  stack: { en: "Stack", pl: "Technologie" },
  highlights: { en: "What went into it", pl: "Co się na to złożyło" },
  backToWork: { en: "Back to all work", pl: "Wróć do projektów" },
  nextProject: { en: "Next project", pl: "Następny projekt" },
  emailMe: { en: "Email me", pl: "Napisz maila" },
  contactMe: { en: "Contact me", pl: "Skontaktuj się ze mną" },
  backToTop: { en: "Back to top", pl: "Wróć na górę" },
  copyEmail: { en: "Copy address", pl: "Skopiuj adres" },
  copied: { en: "Copied", pl: "Skopiowano" },
  toggleTheme: { en: "Toggle theme", pl: "Przełącz motyw" },
  menu: { en: "Menu", pl: "Menu" },
  close: { en: "Close", pl: "Zamknij" },
  downloadCv: { en: "Download PDF", pl: "Pobierz PDF" },
  rights: { en: "All rights reserved.", pl: "Wszelkie prawa zastrzeżone." },
  builtWith: { en: "Built with Next.js and Tailwind CSS.", pl: "Zbudowane w Next.js i Tailwind CSS." },
} satisfies Record<string, Localized>;
