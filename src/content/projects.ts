import type { Localized } from "@/lib/i18n";

export type Category = "client" | "product" | "game" | "design" | "hardware";

export type ProjectStatus = "live" | "wip" | "archived";

export interface ProjectLink {
  label: string;
  href: string;
  kind: "site" | "repo" | "internal";
}

export interface Project {
  slug: string;
  title: string;
  /** Shown in the card corner and on the case study header. */
  year: string;
  category: Category;
  status: ProjectStatus;
  /** Featured projects lead the home page. */
  featured?: boolean;
  tagline: Localized;
  summary: Localized;
  role: Localized;
  highlights: Localized<string[]>;
  tech: string[];
  links: ProjectLink[];
  cover?: string;
  gallery?: string[];
  /** Screenshots read better in a landscape grid than a square one. */
  galleryAspect?: "square" | "wide";
}

export const categories: { id: Category; label: Localized }[] = [
  { id: "client", label: { en: "Client work", pl: "Prace dla klientów" } },
  { id: "product", label: { en: "Products & apps", pl: "Produkty i aplikacje" } },
  { id: "game", label: { en: "Games & level design", pl: "Gry i level design" } },
  { id: "design", label: { en: "Graphics", pl: "Grafika" } },
  { id: "hardware", label: { en: "PC builds", pl: "Składy PC" } },
];

export const statusLabels: Record<ProjectStatus, Localized> = {
  live: { en: "Live", pl: "Online" },
  wip: { en: "In progress", pl: "W trakcie" },
  archived: { en: "Archived", pl: "Archiwum" },
};

export const projects: Project[] = [
  /* ----------------------------------------------------------------------
     Featured — the work that should sell side projects.
  ---------------------------------------------------------------------- */
  {
    slug: "amtracker",
    title: "AM Tracker",
    year: "2026",
    category: "product",
    status: "live",
    featured: true,
    tagline: {
      en: "A full-stack tracker for anime and manga collections.",
      pl: "Full-stackowy tracker kolekcji anime i mangi.",
    },
    summary: {
      en: "A production web app where users track what they watch and read, rate it, and see their habits as charts. Built end to end: schema, auth, email, UI, deployment.",
      pl: "Produkcyjna aplikacja webowa, w której użytkownicy śledzą, co oglądają i czytają, oceniają tytuły i oglądają swoje nawyki na wykresach. Zbudowana od zera: schemat bazy, autoryzacja, mailing, UI, wdrożenie.",
    },
    role: {
      en: "Solo — design, front end, back end, database, hosting.",
      pl: "Solo — projekt, front end, back end, baza danych, hosting.",
    },
    highlights: {
      en: [
        "Account system with credentials auth, email verification and TOTP two-factor login.",
        "Relational data modelled in Prisma — titles, entries, ratings, progress and user settings.",
        "Personal statistics dashboard built with Recharts: watch time, score spread, completion rate.",
        "Dark and light themes, fully responsive layout, animated route transitions.",
        "Deployed and maintained on my own server, including backups and updates.",
      ],
      pl: [
        "System kont z logowaniem, weryfikacją e-mail i dwuskładnikowym uwierzytelnianiem TOTP.",
        "Model relacyjny w Prisma — tytuły, wpisy, oceny, postęp i ustawienia użytkownika.",
        "Panel statystyk osobistych na Recharts: czas oglądania, rozkład ocen, wskaźnik ukończeń.",
        "Motyw jasny i ciemny, w pełni responsywny layout, animowane przejścia między widokami.",
        "Wdrożone i utrzymywane na własnym serwerze, razem z backupami i aktualizacjami.",
      ],
    },
    tech: ["Next.js", "React 19", "TypeScript", "Prisma", "NextAuth", "Recharts", "Tailwind CSS", "Nodemailer"],
    links: [{ label: "amtracker.eu", href: "https://amtracker.eu/", kind: "site" }],
    cover: "/images/amtracker/library.webp",
    gallery: [
      "/images/amtracker/library.webp",
      "/images/amtracker/dashboard.webp",
      "/images/amtracker/currently-airing.webp",
      "/images/amtracker/season-browser.webp",
      "/images/amtracker/latest-releases.webp",
      "/images/amtracker/achievements.webp",
      "/images/amtracker/add-entry.webp",
      "/images/amtracker/settings-2fa.webp",
      "/images/amtracker/notifications.webp",
      "/images/amtracker/friends.webp",
    ],
    galleryAspect: "wide",
  },
  {
    slug: "passenger-transport",
    title: "Licensed Passenger Transport",
    year: "2024—2026",
    category: "client",
    status: "live",
    featured: true,
    tagline: {
      en: "Three connected sites for one passenger transport business.",
      pl: "Trzy powiązane strony dla jednej firmy przewozowej.",
    },
    summary: {
      en: "A small network of sites covering the same operator from three angles — brand, city-level service and licensing — so each one can rank for what its own audience actually searches for.",
      pl: "Sieć stron pokazujących tego samego przewoźnika z trzech stron — marka, usługa lokalna i licencjonowany przewóz — tak, aby każda z nich odpowiadała na inne zapytania klientów.",
    },
    role: {
      en: "Design, build, content structure, SEO and ongoing maintenance.",
      pl: "Projekt, wykonanie, struktura treści, SEO i bieżące utrzymanie.",
    },
    highlights: {
      en: [
        "Three separate domains sharing a visual language but written for distinct search intent.",
        "Booking-focused layouts: pricing, routes, fleet and a contact path on every page.",
        "Local SEO groundwork — structured headings, service pages per city, fast static delivery.",
        "Built for a non-technical owner to update without breaking anything.",
      ],
      pl: [
        "Trzy osobne domeny o wspólnym języku wizualnym, pisane pod różne intencje wyszukiwania.",
        "Layout nastawiony na rezerwacje: cennik, trasy, flota i ścieżka kontaktu na każdej podstronie.",
        "Fundament pod lokalne SEO — struktura nagłówków, podstrony usług dla miast, szybkie ładowanie.",
        "Zbudowane tak, aby nietechniczny właściciel mógł je aktualizować bez ryzyka.",
      ],
    },
    tech: ["WordPress", "PHP", "Custom CSS", "SEO", "Hosting"],
    links: [
      { label: "klikbus.pl", href: "https://klikbus.pl/", kind: "site" },
      { label: "przewozy-katowice.pl", href: "https://przewozy-katowice.pl/", kind: "site" },
      { label: "licencjonowany-przewoz-osob.pl", href: "https://licencjonowany-przewoz-osob.pl/", kind: "site" },
    ],
  },
  {
    slug: "wedding-invitations",
    title: "Interactive Wedding Invitations",
    year: "2026",
    category: "product",
    status: "wip",
    featured: true,
    tagline: {
      en: "A wedding invitation you open in a browser — with a mini game inside.",
      pl: "Zaproszenie ślubne, które otwierasz w przeglądarce — z mini grą w środku.",
    },
    summary: {
      en: "A paper invitation replaced by a personal web page: the story, the schedule, the venue, an RSVP form the couple actually receives — and a small playable game so guests share the link instead of filing it away.",
      pl: "Papierowe zaproszenie zastąpione osobistą stroną: historia pary, harmonogram, miejsce, formularz RSVP, który naprawdę do nich trafia — i mała grywalna gra, dzięki której goście podają dalej link, zamiast odkładać zaproszenie do szuflady.",
    },
    role: {
      en: "Product idea, front end, API, image pipeline and mail delivery.",
      pl: "Pomysł na produkt, front end, API, obsługa zdjęć i wysyłka maili.",
    },
    highlights: {
      en: [
        "Animated single-page invitation with scroll-driven scenes and a countdown.",
        "RSVP form writing to a SQLite database, with email notifications to the couple.",
        "Guest photo uploads processed and resized server-side with Sharp.",
        "A custom mini game built into the invitation as a keepsake for guests.",
        "Groundwork for a separate company site selling these as a service.",
      ],
      pl: [
        "Animowane zaproszenie one-page ze scenami sterowanymi scrollem i odliczaniem.",
        "Formularz RSVP zapisujący do bazy SQLite, z powiadomieniami e-mail dla pary młodej.",
        "Wgrywanie zdjęć przez gości, przetwarzane i skalowane po stronie serwera przez Sharp.",
        "Autorska mini gra wbudowana w zaproszenie jako pamiątka dla gości.",
        "Podstawa pod osobną stronę firmową sprzedającą to jako usługę.",
      ],
    },
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Express", "SQLite", "Sharp", "Nodemailer"],
    links: [],
  },
  {
    slug: "itil-quiz",
    title: "ITIL 5 Exam Prep Quiz",
    year: "2026",
    category: "product",
    status: "wip",
    featured: true,
    tagline: {
      en: "A practice app for the ITIL 5 service management certification.",
      pl: "Aplikacja do nauki przed certyfikacją ITIL 5 z zarządzania usługami IT.",
    },
    summary: {
      en: "A quiz app built from my own day-to-day service management work and my own ITIL 5 exam: a structured question bank, timed mock exams, and feedback that explains why an answer was wrong instead of just marking it.",
      pl: "Aplikacja quizowa zbudowana na bazie mojej codziennej pracy w service management i własnego egzaminu ITIL 5: uporządkowana baza pytań, egzaminy próbne na czas i feedback tłumaczący, dlaczego odpowiedź była błędna, zamiast samego zaznaczenia.",
    },
    role: {
      en: "Solo — question bank, app, tooling.",
      pl: "Solo — baza pytań, aplikacja, narzędzia.",
    },
    highlights: {
      en: [
        "Question bank written against the ITIL 5 syllabus and graded by difficulty, kept as structured JSON.",
        "Timed exam mode alongside a relaxed practice mode with instant explanations.",
        "Progress tracking so weak areas resurface more often.",
        "Built on the current React and Vite toolchain with a typed data layer.",
      ],
      pl: [
        "Baza pytań pisana pod sylabus ITIL 5, z przypisanym poziomem trudności, trzymana jako uporządkowany JSON.",
        "Tryb egzaminu na czas obok spokojnego trybu nauki z natychmiastowym wyjaśnieniem.",
        "Śledzenie postępów — słabsze obszary wracają częściej.",
        "Zbudowane na aktualnym stacku React + Vite z typowaną warstwą danych.",
      ],
    },
    tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS"],
    links: [],
  },

  /* ----------------------------------------------------------------------
     Earlier client and web work.
  ---------------------------------------------------------------------- */
  {
    slug: "ksztalcenie-sluchu",
    title: "Kształcenie Słuchu — eBook Store",
    year: "2023",
    category: "client",
    status: "live",
    tagline: {
      en: "An online store selling and delivering an educational eBook.",
      pl: "Sklep internetowy sprzedający i dostarczający eBook edukacyjny.",
    },
    summary: {
      en: "A small commerce site for a music education eBook — product page, checkout, payment handling and automatic delivery of the file after purchase.",
      pl: "Niewielki sklep dla eBooka o kształceniu słuchu — strona produktu, koszyk, obsługa płatności i automatyczne dostarczenie pliku po zakupie.",
    },
    role: {
      en: "Build, store setup, hosting and payment integration.",
      pl: "Wykonanie, konfiguracja sklepu, hosting i integracja płatności.",
    },
    highlights: {
      en: [
        "WooCommerce store configured for a single digital product.",
        "Secure payment processing and automated file delivery.",
        "Responsive Bootstrap layout with a focused purchase path.",
        "Hosting, performance and ongoing upkeep handled by me.",
      ],
      pl: [
        "Sklep WooCommerce skonfigurowany pod jeden produkt cyfrowy.",
        "Bezpieczna obsługa płatności i automatyczne dostarczanie pliku.",
        "Responsywny layout na Bootstrapie ze skróconą ścieżką zakupu.",
        "Hosting, wydajność i bieżące utrzymanie po mojej stronie.",
      ],
    },
    tech: ["WordPress", "WooCommerce", "PHP", "Bootstrap"],
    links: [{ label: "ksztalcenie-sluchu.pl", href: "https://www.ksztalcenie-sluchu.pl", kind: "site" }],
    cover: "/images/ksztalcenie-sluchu.webp",
  },
  {
    slug: "lineup-ev",
    title: "LineUp EV",
    year: "2025",
    category: "product",
    status: "archived",
    tagline: {
      en: "A concept app for queue etiquette at EV charging stations.",
      pl: "Koncepcyjna aplikacja porządkująca kolejkę na ładowarkach elektryków.",
    },
    summary: {
      en: "A design-led concept exploring a real annoyance: not knowing whether a charger is free, occupied, or blocked by a car that finished charging an hour ago.",
      pl: "Koncept skupiony na projekcie, rozwiązujący realną irytację: brak informacji, czy ładowarka jest wolna, zajęta, czy blokowana przez auto, które skończyło ładowanie godzinę temu.",
    },
    role: { en: "Concept, design and front end.", pl: "Koncept, projekt i front end." },
    highlights: {
      en: [
        "Charger availability, status and estimated wait time as the core screen.",
        "Animated phone mockups with an interactive status and map preview.",
        "Modular components with scroll-triggered animation throughout.",
        "Roadmap, FAQ and an animated battery-fill footer.",
      ],
      pl: [
        "Dostępność ładowarki, status i szacowany czas oczekiwania jako główny ekran.",
        "Animowane makiety telefonu z interaktywnym statusem i podglądem mapy.",
        "Modularne komponenty z animacjami wyzwalanymi scrollem.",
        "Roadmapa, FAQ i animowana stopka wypełniająca się jak bateria.",
      ],
    },
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    links: [{ label: "vaniliatime.eu", href: "https://vaniliatime.eu/", kind: "site" }],
    cover: "/images/lineup-ev.webp",
  },
  {
    slug: "old-portfolio",
    title: "Portfolio, Bootstrap Edition",
    year: "2023",
    category: "client",
    status: "archived",
    tagline: {
      en: "My first developer portfolio, kept online on purpose.",
      pl: "Moje pierwsze portfolio deweloperskie, celowo trzymane online.",
    },
    summary: {
      en: "The site that came before this one. Left up as an honest before-and-after of how my front-end work has changed.",
      pl: "Strona, która była przed obecną. Zostawiona jako uczciwe „przed i po” tego, jak zmienił się mój front end.",
    },
    role: { en: "Solo build.", pl: "Wykonanie solo." },
    highlights: {
      en: [
        "Core skills and sample projects in a clean, mobile-first layout.",
        "Fully responsive Bootstrap 5 grid with custom animations.",
        "A deliberate stepping stone toward the current portfolio.",
      ],
      pl: [
        "Kluczowe umiejętności i przykładowe projekty w czytelnym, mobile-first layoucie.",
        "W pełni responsywna siatka Bootstrap 5 z autorskimi animacjami.",
        "Świadomy krok pośredni w stronę obecnego portfolio.",
      ],
    },
    tech: ["Bootstrap", "PHP", "JavaScript"],
    links: [{ label: "View site", href: "https://kkaszuba.eu/old_portfolio", kind: "site" }],
    cover: "/images/old_portfolio.webp",
  },
  {
    slug: "pc-builds-landing",
    title: "Landing Page: 3 PC Builds",
    year: "2022",
    category: "client",
    status: "archived",
    tagline: {
      en: "An early static landing page for three PC configurations.",
      pl: "Wczesny statyczny landing page dla trzech konfiguracji PC.",
    },
    summary: {
      en: "One of my first layout projects — a single-page comparison of three builds, written by hand before any framework habits set in.",
      pl: "Jeden z moich pierwszych projektów layoutu — jednostronicowe porównanie trzech zestawów, pisane ręcznie, zanim wyrobiłem sobie nawyki frameworkowe.",
    },
    role: { en: "Solo build.", pl: "Wykonanie solo." },
    highlights: {
      en: [
        "Responsive single-page layout showcasing three PC builds.",
        "Product specs paired with a simple call to action.",
        "An early foundation for everything that came after.",
      ],
      pl: [
        "Responsywny layout one-page prezentujący trzy zestawy PC.",
        "Specyfikacja produktu zestawiona z prostym call to action.",
        "Wczesny fundament pod wszystko, co przyszło później.",
      ],
    },
    tech: ["HTML", "CSS", "Bootstrap"],
    links: [{ label: "View site", href: "https://vaniliatime.github.io/", kind: "site" }],
    cover: "/images/bootstrap1.webp",
  },
  {
    slug: "anime-heaven",
    title: "Anime Heaven",
    year: "2022",
    category: "client",
    status: "archived",
    tagline: {
      en: "A themed fan site prototype from my student years.",
      pl: "Prototyp tematycznej strony fanowskiej z czasów studiów.",
    },
    summary: {
      en: "An anime-themed content site built to practise structuring a layout around categories and a strong visual theme.",
      pl: "Strona contentowa o tematyce anime, zbudowana dla wprawy w organizowaniu layoutu wokół kategorii i mocnego motywu wizualnego.",
    },
    role: { en: "Solo build.", pl: "Wykonanie solo." },
    highlights: {
      en: [
        "Anime-themed layout with a fully responsive grid.",
        "Categorised content for manga, news and highlights.",
        "Navigation tuned for both desktop and mobile.",
      ],
      pl: [
        "Layout w klimacie anime z w pełni responsywną siatką.",
        "Treść podzielona na kategorie: manga, newsy i wyróżnione.",
        "Nawigacja dopracowana pod desktop i mobile.",
      ],
    },
    tech: ["HTML", "CSS", "Bootstrap"],
    links: [{ label: "View site", href: "https://vaniliatime.github.io/", kind: "site" }],
    cover: "/images/anime1.webp",
  },

  /* ----------------------------------------------------------------------
     Games and level design — the Unity background.
  ---------------------------------------------------------------------- */
  {
    slug: "vanilia-runner",
    title: "Vanilia Runner",
    year: "2021",
    category: "game",
    status: "archived",
    tagline: { en: "An endless 3D runner built in Unity.", pl: "Nieskończony runner 3D zbudowany w Unity." },
    summary: {
      en: "A complete endless runner with scoring, achievements and difficulty that scales as you survive — my main gameplay programming project.",
      pl: "Kompletny endless runner z punktacją, osiągnięciami i trudnością rosnącą wraz z przetrwaniem — mój główny projekt z programowania rozgrywki.",
    },
    role: { en: "Gameplay programming and design.", pl: "Programowanie rozgrywki i projekt." },
    highlights: {
      en: [
        "Endless runner mechanics written in C#.",
        "Automatic forward movement with player-controlled lateral steering.",
        "Crystal-based point system with persistent score tracking.",
        "Achievement system with three unlockable tiers.",
        "Fog of war plus randomisation and speed scaling for rising difficulty.",
      ],
      pl: [
        "Mechanika endless runnera napisana w C#.",
        "Automatyczny bieg do przodu ze sterowaniem na boki przez gracza.",
        "System punktów oparty na kryształach z zapisem wyniku.",
        "System osiągnięć z trzema poziomami do odblokowania.",
        "Mgła wojny oraz losowość i skalowanie prędkości dla rosnącej trudności.",
      ],
    },
    tech: ["Unity", "C#"],
    links: [
      { label: "Play on itch.io", href: "https://vaniliatime.itch.io/vanilliarunner", kind: "site" },
      { label: "Source", href: "https://github.com/Vaniliatime/Vanilla-Runner", kind: "repo" },
    ],
    cover: "/images/runner1.webp",
  },
  {
    slug: "jumping-jesus",
    title: "Jumping Jesus",
    year: "2021",
    category: "game",
    status: "archived",
    tagline: { en: "An arcade platformer built in Unity.", pl: "Zręcznościowa platformówka zbudowana w Unity." },
    summary: {
      en: "An arcade platformer where jumping is automatic and the challenge is where you steer — a study in stripping controls down to one meaningful input.",
      pl: "Zręcznościowa platformówka, w której skok jest automatyczny, a wyzwaniem jest kierunek — ćwiczenie ze sprowadzania sterowania do jednego istotnego wejścia.",
    },
    role: { en: "Gameplay programming and design.", pl: "Programowanie rozgrywki i projekt." },
    highlights: {
      en: [
        "Arcade platformer developed in Unity with C#.",
        "Automatic jumping combined with player-controlled movement.",
        "Distance-based scoring and collectible items.",
        "Jump pads and power-ups that raise the ceiling on good play.",
      ],
      pl: [
        "Platformówka arcade wykonana w Unity w C#.",
        "Automatyczny skok połączony ze sterowaniem ruchem przez gracza.",
        "Punktacja oparta na dystansie i przedmioty do zebrania.",
        "Odskocznie i power-upy podnoszące sufit dla dobrej gry.",
      ],
    },
    tech: ["Unity", "C#"],
    links: [{ label: "Source", href: "https://github.com/Vaniliatime/Jumping-Jesus", kind: "repo" }],
    cover: "/images/jesus1.webp",
  },
  {
    slug: "surf-level",
    title: "Surf Level",
    year: "2021",
    category: "game",
    status: "archived",
    tagline: { en: "A custom parkour level built around movement.", pl: "Autorski poziom parkourowy zbudowany wokół ruchu." },
    summary: {
      en: "A level designed so that mastering the movement system opens shortcuts — the layout teaches its own mechanics through colour instead of tutorials.",
      pl: "Poziom zaprojektowany tak, aby opanowanie systemu ruchu otwierało skróty — layout uczy własnych mechanik kolorem zamiast samouczkiem.",
    },
    role: { en: "Level design and mechanics.", pl: "Level design i mechaniki." },
    highlights: {
      en: [
        "Wall attachment, double jump and boost platform mechanics.",
        "Multiple shortcuts designed for advanced movement routes.",
        "Varied surfaces: ladders, pads and dynamic ground.",
        "Colour-coded platforms teaching mechanics without a tutorial: orange wall-run, green climb, blue ground, red launch up, yellow launch forward.",
      ],
      pl: [
        "Mechaniki przyczepiania się do ścian, podwójnego skoku i platform przyspieszających.",
        "Liczne skróty zaprojektowane pod zaawansowane trasy ruchu.",
        "Zróżnicowane powierzchnie: drabiny, platformy i dynamiczne podłoże.",
        "Platformy kodowane kolorem uczące mechanik bez samouczka: pomarańczowy bieg po ścianie, zielony wspinaczka, niebieski podłoże, czerwony wyrzut w górę, żółty wyrzut w przód.",
      ],
    },
    tech: ["Unity", "C#"],
    links: [{ label: "Source", href: "https://github.com/Vaniliatime/Jumping-Jesus", kind: "repo" }],
    cover: "/images/surf1.webp",
  },

  /* ----------------------------------------------------------------------
     Visual and hardware work.
  ---------------------------------------------------------------------- */
  {
    slug: "2d-arts",
    title: "2D Arts",
    year: "2020—2023",
    category: "design",
    status: "archived",
    tagline: {
      en: "Vector illustration drawn from scratch.",
      pl: "Ilustracja wektorowa rysowana od zera.",
    },
    summary: {
      en: "A set of digital illustrations built in Illustrator and Photoshop. The reason I care about colour, spacing and contrast in the interfaces I build.",
      pl: "Zestaw ilustracji cyfrowych wykonanych w Illustratorze i Photoshopie. Powód, dla którego zwracam uwagę na kolor, odstępy i kontrast w interfejsach, które buduję.",
    },
    role: { en: "Illustration.", pl: "Ilustracja." },
    highlights: {
      en: [
        "Digital vector artworks created from scratch.",
        "Custom brushes, gradients and hand-picked palettes.",
        "Presented in a responsive grid with a zoom lightbox.",
      ],
      pl: [
        "Cyfrowe prace wektorowe tworzone od zera.",
        "Autorskie pędzle, gradienty i ręcznie dobierane palety.",
        "Prezentowane w responsywnej siatce z lightboxem.",
      ],
    },
    tech: ["Illustrator", "Photoshop"],
    links: [],
    cover: "/images/2d-art/02.webp",
    gallery: ["/images/2d-art/02.webp", "/images/2d-art/01.webp", "/images/2d-art/03.webp", "/images/2d-art/04.webp"],
  },
  {
    slug: "pc-builds",
    title: "PC Builds & Mining Rigs",
    year: "2018—2024",
    category: "hardware",
    status: "archived",
    tagline: {
      en: "Gaming machines and mining rigs, built and tuned by hand.",
      pl: "Maszyny do gier i koparki, składane i strojone ręcznie.",
    },
    summary: {
      en: "Years of building, tuning and troubleshooting hardware. It is where the debugging instinct I use on software came from.",
      pl: "Lata składania, strojenia i diagnozowania sprzętu. Stąd wziął się instynkt diagnostyczny, którego używam w oprogramowaniu.",
    },
    role: { en: "Build, tuning and maintenance.", pl: "Skład, strojenie i utrzymanie." },
    highlights: {
      en: [
        "High-performance gaming PCs and mining rigs built from parts.",
        "Tuned for demanding gaming, streaming and mining workloads.",
        "Careful cable management, thermals and lighting.",
      ],
      pl: [
        "Wydajne komputery do gier i koparki składane z części.",
        "Strojone pod wymagające granie, streaming i kopanie.",
        "Dopracowane prowadzenie kabli, temperatury i oświetlenie.",
      ],
    },
    tech: ["Hardware", "Diagnostics", "Thermals"],
    links: [],
    cover: "/images/rigs/pc01.webp",
    gallery: ["/images/rigs/pc01.webp", "/images/rigs/pc02.webp", "/images/rigs/pc03.webp", "/images/rigs/pc04.webp"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
