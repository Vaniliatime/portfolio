import type { Localized } from "@/lib/i18n";

export const profile = {
  name: "Krzysztof Kaszuba",
  shortName: "Chris",
  email: "kaszubakrzysiek@gmail.com",
  domain: "kkaszuba.eu",
  github: "https://github.com/Vaniliatime",
  role: {
    en: "Web developer & IT support specialist",
    pl: "Web developer i specjalista IT support",
  } satisfies Localized,
};

/**
 * Navigation shared by the header and the footer. "anchor" entries scroll to a
 * section on the home page; "route" entries are their own pages.
 */
export const nav: { href: string; label: Localized; type: "route" | "anchor" }[] = [
  { href: "work", type: "route", label: { en: "Work", pl: "Projekty" } },
  { href: "services", type: "anchor", label: { en: "Services", pl: "Usługi" } },
  { href: "about", type: "anchor", label: { en: "About", pl: "O mnie" } },
  { href: "resume", type: "route", label: { en: "Résumé", pl: "CV" } },
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
    en: "I work in enterprise IT support by day and build for clients on the side — from a booking site for a transport company to a full-stack tracking app running on my own server. If you need something built properly and maintained after launch, that is the part I enjoy.",
    pl: "Na co dzień pracuję w korporacyjnym IT support, a po godzinach buduję dla klientów — od strony rezerwacyjnej dla firmy przewozowej po full-stackową aplikację działającą na moim serwerze. Jeśli potrzebujesz czegoś zrobionego porządnie i utrzymywanego po starcie, to jest ta część, którą lubię najbardziej.",
  } satisfies Localized,
  ctaPrimary: { en: "See the work", pl: "Zobacz projekty" } satisfies Localized,
  ctaSecondary: { en: "Start a project", pl: "Zacznijmy projekt" } satisfies Localized,
};

export const stats: { value: string; label: Localized }[] = [
  { value: "6+", label: { en: "Sites & apps shipped", pl: "Wdrożonych stron i aplikacji" } },
  { value: "2+", label: { en: "Years in enterprise IT support", pl: "Lata w korporacyjnym IT support" } },
  { value: "100%", label: { en: "Built and maintained solo", pl: "Zbudowane i utrzymywane solo" } },
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
      en: "Something with accounts, data and logic behind it. I have built and shipped one end to end — schema, auth, two-factor, email, dashboards and deployment.",
      pl: "Coś z kontami, danymi i logiką w tle. Zbudowałem i wdrożyłem taką od początku do końca — schemat bazy, logowanie, 2FA, maile, panele i deployment.",
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
      en: "Weddings and events, as a web page instead of card stock: your story, the schedule, directions, RSVP straight to your inbox — and something playable if you want guests to remember it.",
      pl: "Wesela i imprezy jako strona zamiast kartonika: wasza historia, harmonogram, dojazd, RSVP prosto na maila — i coś grywalnego, jeśli chcecie, żeby goście to zapamiętali.",
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

export const about = {
  heading: { en: "About", pl: "O mnie" } satisfies Localized,
  lead: {
    en: "Support work taught me how software breaks. Building taught me how to stop it breaking.",
    pl: "Praca w supporcie nauczyła mnie, jak oprogramowanie się psuje. Budowanie — jak temu zapobiegać.",
  } satisfies Localized,
  paragraphs: {
    en: [
      "I am an IT support specialist working on enterprise systems at the European Commission, where I have spent over two years triaging incidents, reproducing bugs and working alongside developers in Jira, ServiceNow and Oracle SQL. It is unglamorous, and it is the best possible training for building things that other people have to rely on.",
      "Outside work I build. Some of it is client work — a transport operator's three sites, an eBook store. Some of it is mine — a full-stack anime tracker running on my own server, a quiz app for ITIL certification, an interactive wedding invitation that is turning into a product.",
      "I studied game development with C# and Unity. I no longer make games, but the habit of thinking in systems and states never left, and it shows up every time I model data or design an interface.",
      "Away from a screen you will find me building PCs, playing tennis, or out on a bike.",
    ],
    pl: [
      "Jestem specjalistą IT support przy systemach korporacyjnych w Komisji Europejskiej, gdzie od ponad dwóch lat zajmuję się zgłoszeniami, odtwarzaniem błędów i pracą ramię w ramię z deweloperami w Jirze, ServiceNow i Oracle SQL. Mało efektowne — i najlepszy możliwy trening przed budowaniem rzeczy, na których ktoś musi polegać.",
      "Poza pracą buduję. Część to zlecenia — trzy strony przewoźnika, sklep z eBookiem. Część jest moja — full-stackowy tracker anime na własnym serwerze, aplikacja quizowa do certyfikacji ITIL, interaktywne zaproszenie ślubne, które zmienia się w produkt.",
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
    pl: "Napisz, czego potrzebujesz i mniej więcej na kiedy. Odpisuję na każdą wiadomość — łącznie ze szczerym „nie”, jeśli nie jestem właściwą osobą.",
  } satisfies Localized,
  note: {
    en: "Working English and Polish. Based in Belgium, working remotely.",
    pl: "Pracuję po angielsku i po polsku. Mieszkam w Belgii, pracuję zdalnie.",
  } satisfies Localized,
};

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
  servicesEyebrow: { en: "Services", pl: "Usługi" },
  aboutEyebrow: { en: "About", pl: "O mnie" },
  skillsHeading: { en: "Tools I reach for", pl: "Narzędzia, po które sięgam" },
  servicesHeading: { en: "What I can build for you", pl: "Co mogę dla Ciebie zbudować" },
  servicesLead: {
    en: "Four things I take on outside my day job. Anything adjacent, just ask.",
    pl: "Cztery rzeczy, które biorę poza etatem. Coś pokrewnego — po prostu zapytaj.",
  },
  role: { en: "Role", pl: "Rola" },
  stack: { en: "Stack", pl: "Technologie" },
  highlights: { en: "What went into it", pl: "Co się na to złożyło" },
  backToWork: { en: "Back to all work", pl: "Wróć do projektów" },
  nextProject: { en: "Next project", pl: "Następny projekt" },
  emailMe: { en: "Email me", pl: "Napisz maila" },
  copyEmail: { en: "Copy address", pl: "Skopiuj adres" },
  copied: { en: "Copied", pl: "Skopiowano" },
  toggleTheme: { en: "Toggle theme", pl: "Przełącz motyw" },
  menu: { en: "Menu", pl: "Menu" },
  close: { en: "Close", pl: "Zamknij" },
  downloadCv: { en: "Download PDF", pl: "Pobierz PDF" },
  rights: { en: "All rights reserved.", pl: "Wszelkie prawa zastrzeżone." },
  builtWith: { en: "Built with Next.js and Tailwind CSS.", pl: "Zbudowane w Next.js i Tailwind CSS." },
} satisfies Record<string, Localized>;
