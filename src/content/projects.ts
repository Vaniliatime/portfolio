import type { Localized } from "@/lib/i18n";

export type Category = "client" | "product" | "game" | "design" | "hardware";

export type ProjectStatus = "live" | "wip" | "done" | "archived";

export interface ProjectLink {
  label: string;
  /** Empty means the destination does not exist yet, and renders as pending. */
  href: string;
  kind: "site" | "repo" | "internal" | "appstore" | "playstore";
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
  /** What it does, for whoever is deciding whether they want one. */
  highlights: Localized<string[]>;
  /**
   * How it is built, for whoever is deciding whether I can build it. Optional:
   * the two readings sit side by side when both exist, and the page falls back
   * to one column when they do not.
   */
  technical?: Localized<string[]>;
  /**
   * What the work changed for the client, as opposed to what it consisted of.
   * Optional, because most of these are my own projects and there is nobody on
   * the other side for it to have changed anything for.
   */
  results?: Localized<string[]>;
  tech: string[];
  links: ProjectLink[];
  cover?: string;
  /**
   * Full-page capture, scrolled through inside the hero's browser frame. The
   * dimensions are what tell the animation how far the picture has to travel,
   * so they belong here rather than being measured in the browser.
   */
  coverTall?: TallCover;
  /**
   * Which heading it files under on the work page, when the category alone
   * does not decide it. A site built for a client and an application built for
   * a client are the same category and belong under different headings.
   */
  group?: string;
  gallery?: string[];
  /**
   * Screenshots split into labelled sets, where a flat strip would leave the
   * reader guessing which side of the product they are looking at. Takes over
   * from gallery wherever it exists; galleryOf() flattens either shape.
   */
  gallerySections?: { label: Localized; images: string[] }[];
  /** Screenshots read better in a landscape grid than a square one. */
  galleryAspect?: "square" | "wide";
}

export interface TallCover {
  src: string;
  width: number;
  height: number;
}

/**
 * How the work page divides itself up.
 *
 * Coarser than the categories on purpose: client work and my own products are
 * the same craft to anyone reading, so they share one heading, and the card's
 * own eyebrow is where the difference between them is still drawn.
 */
export interface ProjectGroup {
  id: string;
  label: Localized;
  categories: Category[];
}

export const projectGroups: ProjectGroup[] = [
  {
    id: "apps",
    label: { en: "Applications", pl: "Aplikacje" },
    categories: ["client", "product"],
  },
  {
    id: "sites",
    label: { en: "Websites", pl: "Strony internetowe" },
    // Nothing lands here by category: a site is marked as one on the project.
    categories: [],
  },
  {
    id: "games",
    label: { en: "Games & level design", pl: "Gry i level design" },
    categories: ["game"],
  },
  { id: "graphics", label: { en: "Graphics", pl: "Grafika" }, categories: ["design"] },
  {
    id: "hardware",
    label: { en: "Hardware & network", pl: "Sprzęt i sieć" },
    categories: ["hardware"],
  },
];

export const categories: { id: Category; label: Localized }[] = [
  { id: "client", label: { en: "Client work", pl: "Prace dla klientów" } },
  { id: "product", label: { en: "Products & apps", pl: "Produkty i aplikacje" } },
  { id: "game", label: { en: "Games & level design", pl: "Gry i level design" } },
  { id: "design", label: { en: "Graphics", pl: "Grafika" } },
  { id: "hardware", label: { en: "Hardware & network", pl: "Sprzęt i sieć" } },
];

/*
 * "Archived" belongs to software that has been retired. A printed business card
 * or a machine that was built and handed over is not archived, it is simply
 * finished, which is what "done" is for.
 */
export const statusLabels: Record<ProjectStatus, Localized> = {
  live: { en: "Live", pl: "Online" },
  wip: { en: "In progress", pl: "W trakcie" },
  done: { en: "Delivered", pl: "Zrealizowane" },
  archived: { en: "Archived", pl: "Archiwum" },
};

export const projects: Project[] = [
  {
    slug: "amtracker",
    title: "AM Tracker",
    year: "2026",
    category: "product",
    status: "live",
    featured: true,
    tagline: {
      en: "A self-hosted tracker for anime, manga, manhwa and manhua.",
      pl: "Self-hostowany tracker anime, mangi, manhwy i manhui.",
    },
    summary: {
      en: "For people who would rather keep their own library than rent it: everything they watch and read in one place, what they are in the middle of at a glance, and a notification when the next episode or chapter is out. It runs on my own hardware, not on somebody's platform.",
      pl: "Dla osób, które wolą trzymać swoją bibliotekę u siebie, niż ją wynajmować: wszystko, co oglądają i czytają, w jednym miejscu, rzut oka na to, co jest w trakcie, i powiadomienie, gdy wyjdzie kolejny odcinek albo rozdział. Stoi na moim sprzęcie, a nie na czyjejś platformie.",
    },
    role: {
      en: "Solo: design, front end, back end, database, hosting.",
      pl: "Solo: projekt, front end, back end, baza danych, hosting.",
    },
    highlights: {
      en: [
        "One library out of four catalogues: the search merges AniList, MyAnimeList, MangaDex and MangaUpdates, drops the duplicates, and adds a title with its full metadata in one click.",
        "Progress in one tap. It notices when a series has finished, and counts rewatches as their own cycles.",
        "It tells you when the next one is out: anime to the hour from AniList, manga and manhwa from a nightly sweep, because nobody publishes a schedule for those.",
        "What lands today, as a list or a month at a time, either from your own shelf or from everything there is.",
        "Two-factor with trusted devices, each one revocable on its own, so losing a phone is not losing the account.",
        "Bring years of history in from MAL or AniList, and take the whole lot back out whenever you like.",
        "See what friends are on, and add it to your own list from their profile.",
      ],
      pl: [
        "Jedna biblioteka z czterech katalogów: wyszukiwarka scala AniList, MyAnimeList, MangaDex i MangaUpdates, usuwa duplikaty i dodaje tytuł z pełnymi danymi jednym kliknięciem.",
        "Postęp jednym dotknięciem. Sama zauważa koniec serii i liczy ponowne przejścia jako osobne cykle.",
        "Mówi, kiedy wyjdzie kolejny: anime co do godziny z AniList, manga i manhwa z nocnego przeglądu, bo dla nich nikt harmonogramu nie publikuje.",
        "Co wychodzi dzisiaj, listą albo miesiącem naraz, z własnej półki lub ze wszystkiego, co jest.",
        "Dwa składniki logowania z zaufanymi urządzeniami, każde odwoływalne osobno, więc zgubiony telefon to nie zgubione konto.",
        "Wciągnięcie lat historii z MAL-a albo AniList i wyciągnięcie całości z powrotem, kiedy tylko chcesz.",
        "Podgląd tego, co oglądają znajomi, i dodanie czegoś do siebie prosto z ich profilu.",
      ],
    },
    technical: {
      en: [
        "Next.js 16 on the App Router with Turbopack, Prisma 6 over MySQL, NextAuth on JWTs. Self-hosted in an LXC container under Proxmox, reached through a Cloudflare Tunnel, kept alive by PM2.",
        "User pages are force-dynamic; the heavy public feeds are cached server-side with stale-while-revalidate on a 5 to 15 minute window, with in-flight coalescing so a hundred readers do not each start their own probe.",
        "AniList is queried in batches through GraphQL aliases, up to 50 records a request, with a cron refreshing airing status and totals every six hours.",
        "Manga has no public schedule anywhere, so a nightly cron sweeps MangaUpdates, links new entries by title, and builds the release history the calendar reads.",
        "Sessions die the moment they should: passwordChangedAt and twoFactorChangedAt are compared against the token's issued-at, so changing a password drops every older session instantly.",
        "Rate limiting in three layers, per address, per email and per account, each with its own window. Strict CSP, HSTS preload, magic-byte sniffing on avatar uploads, and a URL sanitiser standing between the fetcher and SSRF.",
        "An operator's panel behind it all: five crons with their last result and next run, live health checks on all four upstreams, 30 days of server logs, and a banner on the site itself the moment an upstream goes down.",
        "Roughly 14 Prisma models, 40 API routes, 20 pages and 5 crons, against 4 external APIs.",
      ],
      pl: [
        "Next.js 16 na App Routerze z Turbopackiem, Prisma 6 na MySQL, NextAuth na tokenach JWT. Self-hostowane w kontenerze LXC pod Proxmoxem, ruch przez Cloudflare Tunnel, proces pilnowany przez PM2.",
        "Strony użytkownika są force-dynamic, a ciężkie publiczne feedy cache'owane po stronie serwera w trybie stale-while-revalidate z oknem 5 do 15 minut i scalaniem żądań w locie, żeby stu czytelników nie ruszyło każdy z własnym zapytaniem.",
        "AniList odpytywany paczkami przez aliasy GraphQL, do 50 rekordów na żądanie, plus cron odświeżający status emisji i sumy co sześć godzin.",
        "Manga nie ma nigdzie publicznego harmonogramu, więc nocny cron przeczesuje MangaUpdates, dowiązuje nowe wpisy po tytule i buduje historię wydań, z której korzysta kalendarz.",
        "Sesje umierają dokładnie wtedy, kiedy powinny: passwordChangedAt i twoFactorChangedAt porównywane ze znacznikiem wystawienia tokenu, więc zmiana hasła natychmiast wywala wszystkie starsze.",
        "Ograniczanie ruchu w trzech warstwach, po adresie, po mailu i po koncie, każda z własnym oknem. Ostre CSP, HSTS preload, sprawdzanie bajtów nagłówka przy wgrywaniu awatara i sanitizer adresów stojący między pobieraniem a SSRF.",
        "Pod spodem panel operatora: pięć cronów z ostatnim wynikiem i czasem kolejnego uruchomienia, żywe health checki wszystkich czterech źródeł, trzydzieści dni logów serwera i baner na samej stronie w chwili, gdy któreś źródło padnie.",
        "Około 14 modeli Prisma, 40 tras API, 20 stron i 5 cronów, na czterech zewnętrznych API.",
      ],
    },
    tech: [
      "Next.js 16",
      "React",
      "TypeScript",
      "Prisma 6",
      "MySQL",
      "NextAuth",
      "Tailwind CSS",
      "Framer Motion",
      "Proxmox",
    ],
    links: [
      { label: "amtracker.eu", href: "https://amtracker.eu/", kind: "site" },
      // Apps are not published yet; empty hrefs render as pending.
      { label: "App Store", href: "", kind: "appstore" },
      { label: "Google Play", href: "", kind: "playstore" },
    ],
    cover: "/images/amtracker/library.webp",
    coverTall: { src: "/images/amtracker/full.webp", width: 1100, height: 2628 },
    gallerySections: [
      {
        label: { en: "The app", pl: "Aplikacja" },
        images: [
          "/images/amtracker/library.webp",
          "/images/amtracker/dashboard.webp",
          "/images/amtracker/currently-airing.webp",
          "/images/amtracker/season-browser.webp",
          "/images/amtracker/latest-releases.webp",
          "/images/amtracker/notifications-inbox.webp",
          "/images/amtracker/achievements.webp",
          "/images/amtracker/add-entry.webp",
          "/images/amtracker/settings-2fa.webp",
          "/images/amtracker/notifications.webp",
          "/images/amtracker/friends.webp",
        ],
      },
      {
        label: { en: "Admin panel", pl: "Panel administratora" },
        images: [
          "/images/amtracker/admin-statistics.webp",
          "/images/amtracker/admin-crons.webp",
          "/images/amtracker/admin-api-status.webp",
          "/images/amtracker/admin-logs.webp",
        ],
      },
    ],
    galleryAspect: "wide",
  },
  {
    slug: "passenger-transport",
    title: "Licensed Passenger Transport",
    year: "2024-2026",
    category: "client",
    status: "live",
    group: "sites",
    featured: true,
    tagline: {
      en: "Three connected sites for one passenger transport business.",
      pl: "Trzy powiązane strony dla jednej firmy przewozowej.",
    },
    summary: {
      en: "A WordPress site inherited from a previous developer, rebuilt on Next.js, then grown into three domains covering the same operator from three angles (brand, city-level service and licensing), so each one can rank for what its own audience actually searches for.",
      pl: "Strona na WordPressie odziedziczona po poprzednim wykonawcy, przebudowana na Next.js, a potem rozwinięta w trzy domeny pokazujące tego samego przewoźnika z trzech stron (marka, usługa lokalna, licencjonowany przewóz), tak aby każda z nich odpowiadała na inne zapytania klientów.",
    },
    role: {
      en: "Rebuild from WordPress, design, SEO and ongoing maintenance.",
      pl: "Przebudowa z WordPressa, projekt, SEO i bieżące utrzymanie.",
    },
    highlights: {
      en: [
        "Somebody looking for a coach in Katowice and somebody looking for a licensed operator find different pages, both of them his.",
        "Every page ends where a booking starts: prices, routes, the fleet and a way to call.",
        "The owner adds his own posts now, and no longer pays a studio to publish one.",
        "It opens quickly on a phone at a bus stop, which is where half of this traffic is.",
        "Nothing on it can be broken by editing it, which matters when the person editing is not technical.",
      ],
      pl: [
        "Ktoś szukający autokaru w Katowicach i ktoś szukający licencjonowanego przewoźnika trafiają na inne strony, obie jego.",
        "Każda podstrona kończy się tam, gdzie zaczyna się rezerwacja: cennik, trasy, flota i sposób, żeby zadzwonić.",
        "Właściciel sam dodaje wpisy i nie płaci już studiu za publikację każdego z nich.",
        "Otwiera się szybko na telefonie na przystanku, a stamtąd bierze się połowa tego ruchu.",
        "Edytowaniem nie da się tego zepsuć, co ma znaczenie, gdy edytuje osoba nietechniczna.",
      ],
    },
    technical: {
      en: [
        "Rebuilt off the previous developer's WordPress onto Next.js and Tailwind, then split into three domains.",
        "One visual language across all three, with copy and structure written for distinct search intent.",
        "The brand site carries a Sanity studio at /studio, which is how posts get written and published without touching code.",
        "Enquiries reach the owner as email through a server route, with the form checked in the browser and again before anything is sent.",
        "SEO groundwork: generated sitemap and robots, a heading structure per intent, and LocalBusiness structured data for the operator.",
        "The city and licensing sites are deliberately leaner (no CMS, no forms), because their job is to be found and to hand the visitor onward.",
        "Hosting, deployment and ongoing maintenance handled by me.",
      ],
      pl: [
        "Zejście z WordPressa poprzedniego wykonawcy na Next.js i Tailwind, potem rozbicie na trzy domeny.",
        "Wspólny język wizualny we wszystkich trzech, przy treści i strukturze pisanych pod różne intencje wyszukiwania.",
        "Strona marki ma wbudowane Sanity Studio pod /studio i to nim powstają oraz publikują się wpisy, bez dotykania kodu.",
        "Zapytania trafiają do właściciela mailem przez trasę serwerową, a formularz jest sprawdzany w przeglądarce i jeszcze raz przed wysyłką.",
        "Fundament pod SEO: generowany sitemap i robots, struktura nagłówków pod intencję, dane strukturalne LocalBusiness dla przewoźnika.",
        "Strony miejska i licencyjna są celowo lżejsze (bez CMS-a i bez formularzy), bo ich zadaniem jest zostać znalezionym i przekazać odwiedzającego dalej.",
        "Hosting, wdrożenie i bieżące utrzymanie po mojej stronie.",
      ],
    },
    results: {
      en: [
        "Rebuilt off WordPress at the turn of March and April 2026, after which search impressions climbed to their highest point of the year.",
        "A blog the owner publishes to himself, so nothing gets paid to a studio per post any more.",
        "Around 90,000 search impressions and 630 clicks across the sites over twelve months.",
      ],
      pl: [
        "Zejście z WordPressa na przełomie marca i kwietnia 2026, po którym wyświetlenia w wyszukiwarce doszły do najwyższego poziomu w roku.",
        "Blog, który właściciel prowadzi sam, więc za publikację wpisu nie płaci już studiu.",
        "Około 90 000 wyświetleń w wyszukiwarce i 630 kliknięć na wszystkich stronach przez dwanaście miesięcy.",
      ],
    },
    tech: ["Next.js", "React", "Tailwind CSS", "Sanity", "SEO", "Hosting"],
    links: [
      { label: "klikbus.pl", href: "https://klikbus.pl/", kind: "site" },
      { label: "przewozy-katowice.pl", href: "https://przewozy-katowice.pl/", kind: "site" },
      { label: "licencjonowany-przewoz-osob.pl", href: "https://licencjonowany-przewoz-osob.pl/", kind: "site" },
    ],
    cover: "/images/transport/home.webp",
    coverTall: { src: "/images/transport/full.webp", width: 1100, height: 1725 },
    gallerySections: [
      {
        label: { en: "klikbus.pl", pl: "klikbus.pl" },
        images: [
          "/images/transport/home.webp",
          "/images/transport/fleet.webp",
          "/images/transport/vans.webp",
          "/images/transport/coaches.webp",
          "/images/transport/international.webp",
          "/images/transport/services.webp",
          "/images/transport/standards.webp",
          "/images/transport/booking.webp",
          "/images/transport/news.webp",
        ],
      },
      {
        label: { en: "przewozy-katowice.pl", pl: "przewozy-katowice.pl" },
        images: ["/images/transport/katowice.webp"],
      },
      {
        label: { en: "licencjonowany-przewoz-osob.pl", pl: "licencjonowany-przewoz-osob.pl" },
        images: ["/images/transport/licensed.webp"],
      },
    ],
    galleryAspect: "wide",
  },
  {
    slug: "prox-hub",
    title: "Prox Hub",
    year: "2026",
    category: "product",
    status: "wip",
    featured: true,
    tagline: {
      en: "A deploy panel for my own homelab, so shipping is a button rather than an SSH session.",
      pl: "Panel wdrożeniowy do własnego homelabu, żeby wypuszczenie zmiany było przyciskiem, a nie sesją SSH.",
    },
    summary: {
      en: "Ten things of mine run on my own server, and every update used to mean logging in, pulling, building and restarting the right one by hand. This is the panel that does it instead: every project on one screen, the version actually deployed, whether that matches the repository, and the button that fixes it when it does not. The site you are reading was published from it.",
      pl: "Dziesięć moich rzeczy stoi na własnym serwerze, a każda aktualizacja oznaczała zalogowanie się, pobranie zmian, zbudowanie i zrestartowanie właściwej ręcznie. To jest panel, który robi to za mnie: wszystkie projekty na jednym ekranie, wersja faktycznie wdrożona, informacja, czy zgadza się z repozytorium, i przycisk, gdy się nie zgadza. Strona, którą właśnie czytasz, została opublikowana właśnie z niego.",
    },
    role: {
      en: "Solo: design, front end, back end, deployment.",
      pl: "Solo: projekt, front end, back end, wdrożenie.",
    },
    highlights: {
      en: [
        "Every project on one screen: whether it answers, what it costs in processor and memory, when it last went out, and the commit message of the version actually running.",
        "It says out loud when the repository has moved ahead of what is deployed, so nothing sits quietly a fortnight out of date.",
        "Deploy, restart and stop from the card, and any commit in the history can be deployed, which turns a rollback into a click on the previous line rather than a rescue operation.",
        "Adding a project is pasting a repository address in whatever form it comes in. The panel reads the repository, works out how it is built, writes the container definition, claims a subdomain and puts it on the internet.",
        "Projects that belong together sit in a row of their own, and the board sorts by name or holds whatever order you dragged the cards into.",
        "It also publishes to hosting I do not run: it builds here and mirrors the result over FTPS, showing exactly what a deploy would delete before it deletes anything.",
        "Sites it must not touch are watched instead: whether the address answers, how long it took, and the newest commit in its repository. No buttons, because a button that cannot work is worse than none.",
        "The containers underneath in the same place: processor, memory and disk against their limits, uptime, and start, reboot or shut down where it is needed.",
        "Behind a login, and removing a project removes only the panel's own entry. Anything running keeps running, because a deploy tool that can delete what it deploys is one bad click from a bad evening.",
      ],
      pl: [
        "Wszystkie projekty na jednym ekranie: czy odpowiadają, ile biorą procesora i pamięci, kiedy ostatnio wyjechały i z jakim opisem commita chodzi aktualna wersja.",
        "Mówi wprost, gdy repozytorium wyprzedziło to, co wdrożone, więc nic nie stoi po cichu dwa tygodnie nieaktualne.",
        "Wdrożenie, restart i zatrzymanie prosto z kafelka, a każdy commit z historii da się wdrożyć: cofnięcie się to kliknięcie w poprzedni wiersz, a nie akcja ratunkowa.",
        "Dodanie projektu to wklejenie adresu repozytorium w dowolnej postaci. Panel czyta repozytorium, ustala jak się je buduje, pisze definicję kontenera, bierze subdomenę i wystawia całość do internetu.",
        "Projekty, które należą do siebie, stoją we własnym rzędzie, a tablica sortuje się po nazwie albo trzyma kolejność, w którą przeciągnęło się kafelki.",
        "Publikuje też na hosting, którego nie prowadzę: buduje u siebie i wysyła wynik przez FTPS, pokazując dokładnie co wdrożenie skasuje, zanim cokolwiek skasuje.",
        "Strony, których ruszać mu nie wolno, są tylko obserwowane: czy adres odpowiada, jak szybko i jaki jest najnowszy commit w repozytorium. Bez przycisków, bo przycisk, który nie może zadziałać, jest gorszy niż jego brak.",
        "Kontenery pod spodem w tym samym miejscu: procesor, pamięć i dysk względem limitów, czas działania oraz start, restart albo wyłączenie.",
        "Całość za logowaniem, a usunięcie projektu kasuje wyłącznie wpis w panelu. To, co działa, działa dalej, bo narzędzie do wdrożeń, które potrafi skasować to, co wdraża, jest o jedno kliknięcie od zepsutego wieczoru.",
      ],
    },
    technical: {
      en: [
        "Next.js 15 on the App Router, React 19, TypeScript and Tailwind 4, over SQLite through better-sqlite3. One container, no external services, no database to run beside it.",
        "Two abstractions that know nothing about each other. An executor answers where a command runs: in this container, or over SSH on another host. A runtime answers how a project is built and swapped: compose, a PM2 process, an FTPS mirror, or nothing at all. Adding a fourth kind of project meant one new file.",
        "A probe reads the repository and writes the Dockerfile and compose file to match, including finding the application when it lives in a subdirectory. The build has to succeed before anything running is touched, so a broken commit fails the deploy instead of taking the site down with it.",
        "Logs stream over server-sent events with replay, so opening the drawer late still shows the run from its first line, and a keep-alive note distinguishes a slow step from a hung one.",
        "Environment variables are encrypted at rest with AES-256-GCM. Upload credentials are lifted out before the build runs, so they never reach a .env sitting in the checkout where every npm script could read them.",
        "One account, and the check lives in middleware rather than in each route, because a guard that has to be remembered is only as good as the memory of whoever adds the next route. Middleware runs on the edge, where SQLite cannot, so the cookie carries a signed claim; server code re-checks it against the database, which is what makes a password change end other sessions at once.",
        "Publishing a subdomain is two Cloudflare calls (an ingress rule on the tunnel and a DNS record pointing at it), with the zone looked up from the hostname rather than configured, so a second domain works without a second deployment of the panel.",
        "Migrations run at boot and are idempotent. A rebuild that would drop a column the canonical schema does not define refuses and says which one, because a migration that cannot be done without losing something has to stop rather than proceed quietly.",
        "Traefik routes by host label on a shared network; the containers are LXC on Proxmox, which is also where the resource figures and the power controls come from, through a token scoped to exactly those two rights.",
      ],
      pl: [
        "Next.js 15 na App Routerze, React 19, TypeScript i Tailwind 4, na SQLite przez better-sqlite3. Jeden kontener, żadnych zewnętrznych usług, żadnej bazy do postawienia obok.",
        "Dwie abstrakcje, które nic o sobie nie wiedzą. Executor odpowiada, gdzie polecenie się wykonuje: w tym kontenerze czy przez SSH na innym hoście. Runtime odpowiada, jak projekt się buduje i podmienia: compose, proces PM2, lustro FTPS albo wcale. Dodanie czwartego rodzaju projektu to był jeden nowy plik.",
        "Sonda czyta repozytorium i pisze pod nie Dockerfile oraz compose, łącznie ze znalezieniem aplikacji, gdy ta siedzi w podkatalogu. Build musi się udać, zanim cokolwiek działającego zostanie ruszone, więc zepsuty commit wywala wdrożenie, a nie stronę razem z nim.",
        "Logi lecą przez server-sent events z odtworzeniem od początku, więc otwarcie szuflady w połowie i tak pokazuje przebieg od pierwszej linijki, a linia podtrzymująca odróżnia krok wolny od zawieszonego.",
        "Zmienne środowiskowe szyfrowane w spoczynku AES-256-GCM. Dane do wysyłki wyjmowane przed buildem, żeby nigdy nie trafiły do .env w katalogu roboczym, gdzie przeczytałby je każdy skrypt npm.",
        "Jedno konto, a sprawdzenie siedzi w middleware, nie w każdej trasie osobno, bo strażnik, o którym trzeba pamiętać, jest wart tyle, ile pamięć tego, kto dodaje kolejną trasę. Middleware chodzi na edge, gdzie SQLite nie wejdzie, więc ciasteczko niesie podpisaną deklarację, a kod serwerowy sprawdza ją jeszcze w bazie i to sprawia, że zmiana hasła natychmiast kończy pozostałe sesje.",
        "Opublikowanie subdomeny to dwa wywołania Cloudflare (reguła wejściowa na tunelu i rekord DNS na nią wskazujący), przy czym strefa jest wyszukiwana z nazwy hosta, a nie skonfigurowana na sztywno, więc druga domena działa bez drugiego wdrożenia panelu.",
        "Migracje wykonują się przy starcie i są idempotentne. Przebudowa, która skasowałaby kolumnę nieopisaną w kanonicznym schemacie, odmawia i mówi którą, bo migracja, której nie da się zrobić bez straty, ma się zatrzymać, a nie przejść po cichu.",
        "Traefik trasuje po etykiecie hosta we wspólnej sieci, a kontenery to LXC na Proxmoksie i stamtąd biorą się odczyty zasobów oraz sterowanie zasilaniem, przez token o uprawnieniach dokładnie do tych dwóch rzeczy.",
      ],
    },
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "SQLite",
      "Docker",
      "Proxmox",
      "LXC",
      "Traefik",
      "Cloudflare Tunnel",
      "PM2",
      "SSH",
      "FTPS",
      "SSE",
    ],
    links: [],
    cover: "/images/prox-hub/projects.webp",
    coverTall: { src: "/images/prox-hub/projects.webp", width: 1600, height: 1424 },
    gallerySections: [
      {
        label: { en: "Dashboard", pl: "Pulpit" },
        images: ["/images/prox-hub/projects.webp", "/images/prox-hub/new-project.webp"],
      },
      {
        label: { en: "A project", pl: "Projekt" },
        images: [
          "/images/prox-hub/project.webp",
          "/images/prox-hub/settings.webp",
          "/images/prox-hub/history.webp",
        ],
      },
      {
        label: { en: "Hosts", pl: "Hosty" },
        images: ["/images/prox-hub/hosts.webp"],
      },
    ],
    galleryAspect: "wide",
  },
  {
    slug: "itil-quiz",
    title: "ITIL 5 Foundation Exam Trainer",
    year: "2026",
    category: "product",
    status: "live",
    featured: true,
    tagline: {
      en: "Practice for an exam nobody has written practice material for yet.",
      pl: "Nauka do egzaminu, do którego nikt jeszcze nie napisał materiałów.",
    },
    summary: {
      en: "ITIL 4 has hundreds of mock exams and question dumps behind it. Version 5 has essentially nothing, and people are being sent to sit it by their employers. I took it myself, and without the two mocks my employer paid for I would not have known what to expect, which is the whole reason this exists.",
      pl: "Za ITIL 4 stoją setki mock testów i zestawów pytań. Za wersją piątą praktycznie nic, a ludzie są na nią wysyłani przez pracodawców. Sam do niej podchodziłem i bez dwóch mocków wykupionych przez firmę nie miałbym pojęcia, czego się spodziewać. Stąd wzięła się ta aplikacja.",
    },
    role: {
      en: "Solo: question bank, application, tooling, source research.",
      pl: "Solo: baza pytań, aplikacja, narzędzia, praca ze źródłami.",
    },
    highlights: {
      en: [
        "The exam as it really runs: 40 questions, 60 minutes, a pass at 26, no hints. You can flag a question and come back to it from the grid, the way you can on the day.",
        "In practice mode every answer explains itself, including the wrong ones: not only that it is wrong, but what it actually describes, because the wrong options here are almost always definitions of the neighbouring term.",
        "The result is not one number. It breaks down by exam criterion, by syllabus section, and separately by question type.",
        "That last one is the useful part: scoring 85% on plain questions and 40% on the ones containing NOT is not a gap in knowledge, it is a gap in reading, and it needs a different response. Plain category tracking never catches it.",
        "Each of those qualifiers, PRIMARY, BEST, MAIN and NOT, explains what the question is really testing and which trap it is setting.",
        "A mode that builds a set out of nothing but the questions you have already got wrong.",
        "A glossary of 131 terms where each one carries a definition, a note on what the exam catches people out on, and the terms it is most often confused with.",
      ],
      pl: [
        "Egzamin taki, jaki jest naprawdę: 40 pytań, 60 minut, próg 26, zero podpowiedzi. Pytanie można oflagować i wrócić do niego z siatki, dokładnie jak na miejscu.",
        "W trybie nauki każda odpowiedź się tłumaczy, także ta błędna: nie tylko że jest zła, ale co właściwie opisuje, bo złe odpowiedzi są tu prawie zawsze definicjami pojęcia sąsiedniego.",
        "Wynik to nie jedna liczba. Rozbija się na kryteria egzaminacyjne, sekcje sylabusa i osobno na typ pytania.",
        "To ostatnie jest najbardziej użyteczne: 85% na pytaniach prostych i 40% na tych z NOT to nie luka w wiedzy, tylko w czytaniu, i wymaga zupełnie innej reakcji. Zwykłe śledzenie kategorii tego nie wyłapie.",
        "Każdy z kwalifikatorów, PRIMARY, BEST, MAIN i NOT, tłumaczy, czego pytanie naprawdę szuka i jaką pułapkę zastawia.",
        "Tryb, który buduje zestaw wyłącznie z pytań wcześniej obłamanych.",
        "Słownik 131 pojęć, gdzie każde ma definicję, notatkę o tym, na czym egzamin łapie, i listę pojęć, z którymi bywa mylone.",
      ],
    },
    technical: {
      en: [
        "React 19 and TypeScript on Vite 8, Tailwind v4 configured in CSS rather than a config file. No back end at all: progress lives in the browser. Two production dependencies.",
        "The question bank is TypeScript modules rather than JSON or a database. An odd choice for 309 records until you see what it buys: the type demands exactly four options and a correct index between 0 and 3, so a typo in a criterion code or a fifth option breaks the build instead of the exam.",
        "Wrong answers are not invented. Reading the official sample papers, the distractors are always definitions of adjacent concepts, so I built a graph of which terms get confused with which, 302 edges across 131 entries, and wrote the wrong answers out of it. The distractor for a question about output is the definition of outcome.",
        "The 95 assessment criteria from the official syllabus are the backbone: questions map onto them, progress is measured against them, and coverage is verified by a script rather than claimed. It reads 95 out of 95.",
        "Getting there was the lesson. Reconstructing the criteria from sample paper rationales produced 35, mining the course transcripts another 145 hits, and when the official syllabus finally arrived it turned out I had 38 of 95. Closing the rest was mechanical; knowing the gap existed was not.",
        "One source of truth, in order: syllabus, then handbook, then sample paper rationales, then course recordings. It caught four of my own mistakes, including a warning I had written that version 5 redefines output. Section 3.1.1.1 says otherwise, and the error had come from an accredited course recording.",
        "The handbook exists only in an online reader, so verification ran off 210 screenshots ordered by creation time, through a crop and resize pipeline built to get under an image size limit.",
        "Thirty course recordings transcribed with faster-whisper on a CUDA card, which needed the pip-installed CUDA DLLs registered by hand and a correction pass afterwards: the model insisted on hearing ITIL as IDIL, Hytil and once Hytale.",
        "The version 4 transcripts were analysed and then deliberately left out. Their densest topics are exactly the areas version 5 rebuilt, so feeding them in would have injected wrong answers.",
        "Nothing in the application is copied from the handbook: PeopleCert holds the copyright and the glossary forbids text and data mining outright. Every definition is paraphrased and carries a reference to the section it came from, which is the condition of ever publishing any of it.",
        "309 questions, 1,236 answer options with 831 written rationales, 131 glossary entries, a 155 kB gzipped bundle built in 358 ms.",
      ],
      pl: [
        "React 19 i TypeScript na Vite 8, Tailwind v4 konfigurowany w CSS, nie w pliku konfiguracyjnym. Zero backendu: postęp siedzi w przeglądarce. Dwie zależności produkcyjne.",
        "Bank pytań to moduły TypeScriptu, a nie JSON czy baza. Dziwny wybór dla 309 rekordów, dopóki nie zobaczy się, co daje: typ wymusza dokładnie cztery opcje i indeks poprawnej w zakresie od zera do trzech, więc literówka w kodzie kryterium albo piąta opcja wywalają build, a nie egzamin.",
        "Złe odpowiedzi nie są wymyślane. Z oficjalnych sample paperów wynika, że dystraktory to zawsze definicje pojęć sąsiednich, więc zbudowałem graf tego, co z czym bywa mylone, 302 krawędzie na 131 hasłach, i pisałem je z niego. Dystraktorem do pytania o output jest definicja outcome.",
        "Kręgosłupem jest 95 kryteriów oceny z oficjalnego sylabusa: pytania są do nich przypisane, postęp mierzony względem nich, a pokrycie weryfikowane skryptem, nie deklarowane. Wychodzi 95 na 95.",
        "Droga do tego była pouczająca. Rekonstrukcja kryteriów z uzasadnień w sample paperach dała 35, przekopanie transkryptów kursu kolejne 145 trafień, a gdy w końcu dotarł oficjalny sylabus, okazało się, że mam 38 z 95. Domknięcie reszty było mechaniczne, wiedza o tym, że jest co domykać, już nie.",
        "Jedno źródło prawdy, w kolejności: sylabus, podręcznik, uzasadnienia z sample paperów, nagrania kursu. Wyłapało cztery moje własne błędy, w tym ostrzeżenie, które sam napisałem, że wersja piąta zmienia definicję output. Sekcja 3.1.1.1 mówi co innego, a błąd wziął się z nagrania kursu akredytowanego.",
        "Podręcznik istnieje wyłącznie w czytniku online, więc weryfikacja szła z 210 zrzutów ekranu sortowanych po dacie utworzenia, przez pipeline przycinania i skalowania zbudowany po to, żeby zmieścić się w limicie rozmiaru obrazu.",
        "Trzydzieści nagrań szkoleniowych przepuszczonych przez faster-whisper na karcie CUDA, co wymagało ręcznego rejestrowania bibliotek CUDA instalowanych przez pip i przebiegu korekt na końcu: model uparcie słyszał ITIL jako IDIL, Hytil, a raz Hytale.",
        "Transkrypty z wersji czwartej przeanalizowałem i świadomie odrzuciłem. Ich najgęstsze tematy to dokładnie te obszary, które piątka przebudowała, więc wciągnięcie ich wstrzyknęłoby błędne odpowiedzi.",
        "W aplikacji nie ma ani jednego zdania przepisanego z podręcznika: prawa ma PeopleCert, a słownik wprost zakazuje eksploracji tekstu i danych. Każda definicja jest sparafrazowana i wskazuje sekcję źródła, i to jest warunek, żeby cokolwiek dało się kiedykolwiek opublikować.",
        "309 pytań, 1236 wariantów odpowiedzi z 831 napisanymi uzasadnieniami, 131 haseł słownika, paczka 155 kB po gzipie budowana w 358 ms.",
      ],
    },
    tech: ["React 19", "TypeScript", "Vite 8", "Tailwind CSS", "Python", "faster-whisper"],
    links: [{ label: "itil.kkaszuba.eu", href: "https://itil.kkaszuba.eu/", kind: "site" }],
    cover: "/images/itil/overview.webp",
    coverTall: { src: "/images/itil/full.webp", width: 1100, height: 680 },
    gallerySections: [
      {
        label: { en: "Sitting the exam", pl: "Podejście do egzaminu" },
        images: [
          "/images/itil/overview.webp",
          "/images/itil/tests.webp",
          "/images/itil/plans.webp",
        ],
      },
      {
        label: { en: "Where you are losing marks", pl: "Gdzie tracisz punkty" },
        images: [
          "/images/itil/progress.webp",
          "/images/itil/scope.webp",
          "/images/itil/glossary.webp",
        ],
      },
    ],
    galleryAspect: "wide",
  },

  {
    slug: "wedding-invitations",
    title: "Interactive Wedding Invitation",
    year: "2026",
    category: "product",
    status: "live",
    featured: true,
    tagline: {
      en: "An invitation that is also the event's website, its RSVP system and its guest list.",
      pl: "Zaproszenie, które jest zarazem stroną wydarzenia, systemem potwierdzeń i listą gości.",
    },
    summary: {
      en: "A four-day wedding in Sicily for several dozen people scattered across Poland. The guests need to know where they are flying, where they are sleeping and what they have to confirm; the couple need to know who is coming and what they cannot eat. Every guest gets their own link, and that is the whole of it: no registration, no password, no account. The address is the identity.",
      pl: "Czterodniowe wesele na Sycylii dla kilkudziesięciu osób rozrzuconych po Polsce. Goście muszą wiedzieć, gdzie lecą, gdzie śpią i co potwierdzić, a para młoda, kto przyjedzie i czego nie może jeść. Każdy gość dostaje własny link i na tym koniec: żadnej rejestracji, hasła ani konta. Adres jest tożsamością.",
    },
    role: {
      en: "Solo: design, front end, back end, organiser panel.",
      pl: "Solo: projekt, front end, back end, panel organizatora.",
    },
    highlights: {
      en: [
        "A guest confirms they are coming, says how many of them there will be and what they cannot eat, and can come back and change their mind until the deadline.",
        "The whole weekend in one place: the schedule, the address with a pin on the map, how to get there and where to sleep, so nobody has to ask the couple.",
        "Everyone puts songs on the shared playlist, by pasting a Spotify link or typing a title from memory, and sees what the others have suggested.",
        "Photos go up straight from a phone during the party, and come back out full size, without anybody signing up to anything.",
        "A question nothing on the page answered goes to the couple by email.",
        "The couple add guests one at a time or paste the whole list at once, fix a typo where they see it, and send the invitations in one go to everyone still waiting.",
        "Who has answered, how many are coming in total and every dietary note, exportable as a spreadsheet for the venue.",
        "One click turns the suggestions into an actual playlist on Spotify.",
      ],
      pl: [
        "Gość potwierdza obecność, deklaruje, ile osób przyjedzie i czego nie może jeść, a do terminu może wrócić i zmienić zdanie.",
        "Cały weekend w jednym miejscu: plan, adres z pinezką w mapach, warianty dojazdu i szczegóły noclegu, więc nikt nie musi dopytywać pary młodej.",
        "Każdy zgłasza utwory na wspólną playlistę, wklejając link ze Spotify albo wpisując tytuł z pamięci, i widzi, co zaproponowali inni.",
        "Zdjęcia lecą prosto z telefonu w trakcie imprezy i wracają w powiększeniu, bez zakładania konta gdziekolwiek.",
        "Pytanie, na które nie odpowiedziała żadna sekcja, trafia do pary młodej mailem.",
        "Para dodaje gości pojedynczo albo wkleja całą listę naraz, poprawia literówkę w miejscu i wysyła zaproszenia hurtem do wszystkich, którzy jeszcze czekają.",
        "Kto odpowiedział, ile osób łącznie przyjedzie i wszystkie ograniczenia dietetyczne, do wyeksportowania w arkuszu dla obiektu.",
        "Jedno kliknięcie zamienia zgłoszone propozycje w prawdziwą playlistę na Spotify.",
      ],
    },
    technical: {
      en: [
        "React 18 and TypeScript on Vite, Tailwind and Framer Motion in front; Node and Express behind, with SQLite through better-sqlite3, Nodemailer for the invitations and Sharp for the thumbnails.",
        "SQLite rather than a database server: the scale is dozens of records, not millions. One file means no maintenance, a backup is a copy of it, and the driver is synchronous, so there is not a single await around a query.",
        "A token in the address instead of accounts, because a wedding guest will not open an account to say they are coming. It is only written to the browser once the server has accepted it, so a typo in the link never sticks.",
        "One source for the words: the invitation text lives in a file that both the page and the email template read, so neither can be changed while the other is forgotten.",
        "Photographs are served through the API rather than statically. The originals sit outside the public directory and the server makes and caches the WebP thumbnails, so hiding a photo in the panel actually hides it instead of leaving a working direct link.",
        "Three animated interludes stood still despite correct code: Framer Motion maps x and y onto SVG attributes a group element does not have, so the animation quietly did nothing while the rotations kept working and hid it. All horizontal movement moved to native SMIL.",
        "Spotify metadata with no registered application: the official API when keys are configured, the Open Graph tags on the track page when they are not, oEmbed as the last resort. It works on first run and improves itself once configured.",
      ],
      pl: [
        "React 18 i TypeScript na Vite, Tailwind i Framer Motion z przodu, Node z Expressem z tyłu, SQLite przez better-sqlite3, Nodemailer do zaproszeń i Sharp do miniatur.",
        "SQLite zamiast serwera bazy: skala to kilkadziesiąt rekordów, nie miliony. Jeden plik oznacza zero utrzymania, kopia zapasowa to jego skopiowanie, a sterownik jest synchroniczny, więc w kodzie nie ma ani jednego await wokół zapytania.",
        "Token w adresie zamiast kont, bo gość weselny nie założy konta, żeby powiedzieć, że przyjedzie. Zapisuje się w przeglądarce dopiero po potwierdzeniu przez serwer, więc literówka w linku nie zostaje na stałe.",
        "Jedno źródło treści: teksty zaproszenia leżą w pliku, który czyta i strona, i szablon maila, więc nie da się zmienić jednego, zapominając o drugim.",
        "Zdjęcia idą przez API, nie statycznie. Oryginały leżą poza katalogiem publicznym, a serwer generuje i cache'uje miniatury WebP, więc ukrycie zdjęcia w panelu naprawdę je ukrywa, zamiast zostawiać działający bezpośredni link.",
        "Trzy animowane przerywniki stały nieruchomo mimo poprawnego kodu: Framer Motion mapuje x i y na atrybuty SVG, których element g nie ma, więc animacja cicho nic nie robiła, a działające obroty to maskowały. Cały ruch w poziomie przeszedł na natywny SMIL.",
        "Metadane ze Spotify bez rejestrowania aplikacji: oficjalne API, gdy klucze są skonfigurowane, znaczniki Open Graph ze strony utworu, gdy ich nie ma, oEmbed jako ostatnia deska ratunku. Działa od pierwszego uruchomienia i samo się poprawia po konfiguracji.",
      ],
    },
    tech: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Express",
      "SQLite",
      "Sharp",
      "Nodemailer",
      "Spotify API",
    ],
    links: [{ label: "sicily.kkaszuba.eu", href: "https://sicily.kkaszuba.eu/", kind: "site" }],
    cover: "/images/wedding/invitation.webp",
    coverTall: { src: "/images/wedding/full.webp", width: 1100, height: 4630 },
    gallerySections: [
      {
        label: { en: "The invitation", pl: "Zaproszenie" },
        images: [
          "/images/wedding/invitation.webp",
          "/images/wedding/venue.webp",
          "/images/wedding/schedule.webp",
          "/images/wedding/food-music.webp",
        ],
      },
      {
        label: { en: "What a guest does", pl: "Co robi gość" },
        images: [
          "/images/wedding/rsvp.webp",
          "/images/wedding/travel.webp",
          "/images/wedding/stay.webp",
          "/images/wedding/photos.webp",
        ],
      },
    ],
    galleryAspect: "wide",
  },
  {
    slug: "ksztalcenie-sluchu",
    title: "Kształcenie Słuchu eBook Store",
    year: "2023",
    category: "client",
    status: "live",
    group: "sites",
    tagline: {
      en: "An online store selling and delivering an educational eBook.",
      pl: "Sklep internetowy sprzedający i dostarczający eBook edukacyjny.",
    },
    summary: {
      en: "A small commerce site for a music education eBook: product page, checkout, payment handling and automatic delivery of the file after purchase.",
      pl: "Niewielki sklep dla eBooka o kształceniu słuchu: strona produktu, koszyk, obsługa płatności i automatyczne dostarczenie pliku po zakupie.",
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

  /* ----------------------------------------------------------------------
     Games and level design: the Unity background.
  ---------------------------------------------------------------------- */
  {
    slug: "secret-santa",
    title: "Secret Santa",
    year: "2026",
    category: "product",
    status: "live",
    featured: true,
    tagline: {
      en: "Gift-exchange draws where even the organiser does not know the result.",
      pl: "Losowanie par na wymianę prezentów, w którym nawet organizator nie zna wyników.",
    },
    summary: {
      en: "The organiser types in the participants, the app draws the pairs and gives each person their own signed link. Only the owner of a link sees what is behind it: the organiser, even when taking part, sees only who has looked already. No accounts for participants, no email addresses collected.",
      pl: "Organizator wpisuje uczestników, a aplikacja losuje pary i generuje osobny, podpisany link dla każdej osoby. Wynik widzi wyłącznie właściciel danego linku, a organizator, nawet gdy sam bierze udział, widzi tylko to, kto już zajrzał. Bez kont po stronie uczestników, bez zbierania adresów e-mail.",
    },
    role: {
      en: "Solo: back end, front end, security.",
      pl: "Solo: backend, frontend, bezpieczeństwo.",
    },
    highlights: {
      en: [
        "Nobody draws themselves, and no two people draw each other: a shuffled cycle when there are no restrictions, and a solver with a hard step limit when couples have to be kept apart.",
        "A link that cannot be forged or reused by somebody it was not meant for: each one is signed, and the part that identifies you rides in the piece of the address a browser never sends to the server, so it stays out of the logs.",
        "The organiser can see who has already looked and nothing else, which is checked by a test that fails if a pair ever appears in that response.",
        "An optional account that grants no extra sight: it remembers your events, and that is all it does.",
        "Works on the cheapest hosting there is: no build step, no Node, and the same code runs on SQLite at home and MySQL in production.",
      ],
      pl: [
        "Nikt nie losuje samego siebie i nikt nie trafia na osobę, która wylosowała jego: przy braku ograniczeń przetasowany cykl, a gdy trzeba rozdzielić pary, solver z twardym limitem kroków.",
        "Linku nie da się podrobić ani użyć nie tej osobie: każdy jest podpisany, a część rozpoznająca uczestnika jedzie w tym kawałku adresu, którego przeglądarka nie wysyła na serwer, więc nie zostaje w logach.",
        "Organizator widzi tylko to, kto już zajrzał, i pilnuje tego test, który nie przejdzie, jeśli w tej odpowiedzi kiedykolwiek pojawi się para.",
        "Konto jest opcjonalne i celowo bezsilne: pamięta Twoje wydarzenia i na tym kończą się jego uprawnienia.",
        "Działa na najtańszym hostingu, jaki jest: bez kroku budowania, bez Node'a, a ten sam kod stoi na SQLite lokalnie i na MySQL na produkcji.",
      ],
    },
    technical: {
      en: [
        "A REST API kept clear of the static front end: 15 endpoints, 81 tests under pytest.",
        "Draw: a Hamiltonian cycle in linear time with no exclusions, backtracking with an MRV heuristic and a step ceiling when there are, seeded from a CSPRNG.",
        "Tokens signed with HMAC over a separate salt, carrying a one-time component from the database so a single link can be revoked.",
        "Sessions with CSRF protection scoped to cookie-authenticated requests only, and a password reset with no token table: the payload holds a fingerprint of the current hash, so changing the password spends the link.",
        "SQLAlchemy throughout, so SQLite locally and MySQL or PostgreSQL in production without touching the code.",
      ],
      pl: [
        "REST API odseparowane od statycznego frontendu: 15 endpointów, 81 testów w pytest.",
        "Losowanie: cykl Hamiltona w czasie liniowym bez wykluczeń, backtracking z heurystyką MRV i limitem kroków przy wykluczeniach, losowość z CSPRNG.",
        "Tokeny podpisane HMAC na osobnej soli, ze składnikiem jednorazowym z bazy, dzięki czemu pojedynczy link da się unieważnić.",
        "Sesje z ochroną CSRF ograniczoną do żądań uwierzytelnianych ciasteczkiem oraz reset hasła bez tabeli tokenów: w ładunku siedzi odcisk aktualnego hasła, więc zmiana zużywa link.",
        "SQLAlchemy w całości, więc SQLite lokalnie i MySQL albo PostgreSQL na produkcji bez zmian w kodzie.",
      ],
    },
    tech: [
      "Python",
      "Flask 3",
      "SQLAlchemy 2",
      "itsdangerous",
      "pytest",
      "Vanilla JS",
      "REST APIs",
    ],
    links: [{ label: "santa.kkaszuba.eu", href: "https://santa.kkaszuba.eu/", kind: "site" }],
    cover: "/images/santa/home.webp",
    gallerySections: [
      {
        label: { en: "Organiser", pl: "Organizator" },
        images: [
          "/images/santa/home.webp",
          "/images/santa/new-event.webp",
          "/images/santa/links.webp",
          "/images/santa/panel.webp",
          "/images/santa/events.webp",
        ],
      },
      {
        label: { en: "Participant", pl: "Uczestnik" },
        images: ["/images/santa/reveal.webp", "/images/santa/result.webp"],
      },
    ],
    galleryAspect: "wide",
  },

  {
    slug: "vanilia-runner",
    title: "Vanilia Runner",
    year: "2021",
    category: "game",
    status: "archived",
    tagline: { en: "An endless 3D runner built in Unity.", pl: "Nieskończony runner 3D zbudowany w Unity." },
    summary: {
      en: "A complete endless runner with scoring, achievements and difficulty that scales as you survive: my main gameplay programming project.",
      pl: "Kompletny endless runner z punktacją, osiągnięciami i trudnością rosnącą wraz z przetrwaniem: mój główny projekt z programowania rozgrywki.",
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
      en: "An arcade platformer where jumping is automatic and the challenge is where you steer, a study in stripping controls down to one meaningful input.",
      pl: "Zręcznościowa platformówka, w której skok jest automatyczny, a wyzwaniem jest kierunek: ćwiczenie ze sprowadzania sterowania do jednego istotnego wejścia.",
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
      en: "A level designed so that mastering the movement system opens shortcuts: the layout teaches its own mechanics through colour instead of tutorials.",
      pl: "Poziom zaprojektowany tak, aby opanowanie systemu ruchu otwierało skróty: layout uczy własnych mechanik kolorem zamiast samouczkiem.",
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
    links: [{ label: "Source", href: "https://github.com/Vaniliatime/Level-Design-Surf", kind: "repo" }],
    cover: "/images/surf1.webp",
  },

  /* ----------------------------------------------------------------------
     Visual and hardware work.
  ---------------------------------------------------------------------- */
  {
    slug: "klikbus-card",
    title: "Klikbus Business Card",
    year: "2020-2023",
    category: "design",
    status: "done",
    tagline: {
      en: "A two-sided card for the transport company, in its own colours.",
      pl: "Dwustronna wizytówka firmy przewozowej, w jej własnych barwach.",
    },
    summary: {
      en: "A card for the same operator whose sites I later rebuilt. Split down the middle: the details sit on a solid blue panel so they read first when the card changes hands, and the mark gets the white half to itself.",
      pl: "Wizytówka tego samego przewoźnika, któremu później przebudowałem strony. Podzielona na pół: dane siedzą na pełnym niebieskim polu, żeby przeczytać je jako pierwsze przy wręczaniu, a znak dostaje białą połowę wyłącznie dla siebie.",
    },
    role: { en: "Design and print preparation.", pl: "Projekt i przygotowanie do druku." },
    highlights: {
      en: [
        "Built on the company's existing blue and red, so the card sits with the rest of its branding.",
        "Contact block set against the solid panel, with red rules marking each group.",
        "Drawn as vectors, so it holds at any print size.",
        "Front and back prepared for print.",
      ],
      pl: [
        "Zbudowana na firmowym niebieskim i czerwonym, żeby wizytówka trzymała się reszty identyfikacji.",
        "Blok kontaktowy na pełnym polu koloru, z czerwonymi kreskami rozdzielającymi grupy danych.",
        "Rysowana wektorowo, więc trzyma się w każdym rozmiarze druku.",
        "Awers i rewers przygotowane do druku.",
      ],
    },
    tech: ["Illustrator", "Photoshop"],
    links: [],
    cover: "/images/2d-art/01.webp",
  },
  {
    slug: "guesthouse-card",
    title: "Guesthouse Business Card",
    year: "2020-2023",
    category: "design",
    status: "done",
    tagline: {
      en: "A card for a mountain guesthouse, mark included.",
      pl: "Wizytówka dla górskiego pensjonatu, razem ze znakiem.",
    },
    summary: {
      en: "Rooms and board in Biały Dunajec, so the mark is the skyline behind the house: a red peak over a grey ridge. The details are stacked against an icon column, which lets someone find the phone number without reading the rest.",
      pl: "Pokoje i wyżywienie w Białym Dunajcu, więc znakiem jest to, co widać za oknem: czerwony szczyt nad szarą granią. Dane ułożone przy kolumnie ikon, dzięki czemu numer telefonu znajduje się bez czytania reszty.",
    },
    role: { en: "Mark, layout and print preparation.", pl: "Znak, layout i przygotowanie do druku." },
    highlights: {
      en: [
        "Mountain mark drawn for the business rather than picked off a stock library.",
        "Icon column separating name, phone, address and web, each field findable at a glance.",
        "Soft geometric pattern behind the layout, kept pale enough to stay out of the way.",
        "Serif type for a warmer register than the sans on the transport card.",
      ],
      pl: [
        "Znak z górami narysowany dla tej firmy, a nie wzięty z banku grafik.",
        "Kolumna ikon rozdzielająca nazwisko, telefon, adres i stronę, każde pole do znalezienia rzutem oka.",
        "Delikatny wzór geometryczny pod spodem, na tyle blady, żeby nie wchodził w drogę.",
        "Szeryfowy krój dla cieplejszego tonu niż bezszeryfowy na wizytówce przewoźnika.",
      ],
    },
    tech: ["Illustrator", "Photoshop"],
    links: [],
    cover: "/images/2d-art/02.webp",
  },
  {
    slug: "pc-builds",
    title: "PC Builds",
    year: "2018-2024",
    category: "hardware",
    status: "done",
    tagline: {
      en: "Gaming machines built and tuned by hand.",
      pl: "Maszyny do gier składane i strojone ręcznie.",
    },
    summary: {
      en: "Years of picking parts, assembling and troubleshooting machines for gaming and streaming. It is where the debugging instinct I use on software came from: hardware tells you nothing, so you learn to bisect a problem until it does.",
      pl: "Lata dobierania części, składania i diagnozowania maszyn do grania i streamingu. Stąd wziął się instynkt diagnostyczny, którego używam w oprogramowaniu: sprzęt nic sam nie powie, więc uczysz się dzielić problem na pół, aż powie.",
    },
    role: { en: "Build, tuning and maintenance.", pl: "Składanie, strojenie i utrzymanie." },
    highlights: {
      en: [
        "High-performance gaming PCs built from parts, chosen for the budget in front of me.",
        "Tuned for demanding gaming and streaming workloads.",
        "Careful cable management, thermals and lighting.",
        "Fault finding on machines that came in dead: power, memory, storage, thermals.",
      ],
      pl: [
        "Wydajne komputery do gier składane z części dobieranych pod konkretny budżet.",
        "Strojone pod wymagające granie i streaming.",
        "Dopracowane prowadzenie kabli, temperatury i oświetlenie.",
        "Diagnostyka maszyn przyniesionych jako martwe: zasilanie, pamięć, dyski, chłodzenie.",
      ],
    },
    tech: ["Hardware", "Diagnostics", "Thermals"],
    links: [],
    cover: "/images/rigs/pc01.webp",
    gallery: [
      "/images/rigs/pc01.webp",
      "/images/rigs/pc02.webp",
      "/images/rigs/pc03.webp",
      "/images/rigs/pc04.webp",
      "/images/rigs/pc05.webp",
    ],
  },
  {
    slug: "mining-rigs",
    title: "Mining Rigs",
    // Built during the GPU mining boom: confirm the years.
    year: "2021-2022",
    category: "hardware",
    status: "done",
    tagline: {
      en: "Multi-GPU rigs built for round-the-clock running.",
      pl: "Koparki wielokartowe budowane pod pracę bez przerwy.",
    },
    summary: {
      en: "Open-frame rigs assembled to run flat out for months at a time. A different problem to a gaming PC: nothing is being looked at, so everything is about power draw, airflow and what happens when a card drops out at four in the morning.",
      pl: "Koparki na otwartych stelażach, składane pod pracę na pełnych obrotach przez miesiące. Zupełnie inny problem niż komputer do gier: nikt na to nie patrzy, więc liczy się pobór prądu, przepływ powietrza i to, co się dzieje, gdy karta wypada o czwartej nad ranem.",
    },
    role: { en: "Build, tuning and monitoring.", pl: "Składanie, strojenie i monitoring." },
    highlights: {
      en: [
        "Open-frame builds with multiple GPUs on risers.",
        "Undervolting and clock tuning for output against power draw.",
        "Airflow and temperature control for hardware left running unattended.",
        "Monitoring and remote restarts, because a rig that stops earns nothing.",
      ],
      pl: [
        "Konstrukcje na otwartych stelażach z wieloma kartami na risersach.",
        "Undervolting i strojenie zegarów pod stosunek wyniku do poboru prądu.",
        "Przepływ powietrza i kontrola temperatur dla sprzętu zostawionego samemu sobie.",
        "Monitoring i zdalne restarty, bo koparka, która stoi, nic nie zarabia.",
      ],
    },
    tech: ["Hardware", "GPU tuning", "Monitoring"],
    links: [],
    cover: "/images/rigs/rig01.webp",
    gallery: ["/images/rigs/rig01.webp", "/images/rigs/rig02.webp", "/images/rigs/rig03.webp"],
  },
  {
    slug: "home-lab",
    title: "Home Server & Network",
    year: "2026",
    category: "hardware",
    status: "live",
    tagline: {
      en: "The network and server my own projects actually run on.",
      pl: "Sieć i serwer, na których naprawdę stoją moje projekty.",
    },
    summary: {
      en: "AM Tracker and the rest are not hosted on somebody's platform: they run here, on hardware I own, behind a router running firmware I chose. It doubles as the place where I get to be the administrator again rather than the person raising the ticket.",
      pl: "AM Tracker i reszta nie stoją na cudzej platformie: działają tutaj, na sprzęcie, który jest mój, za routerem z firmware'em, który sam wybrałem. Przy okazji to miejsce, gdzie znowu jestem administratorem, a nie osobą zgłaszającą problem.",
    },
    role: {
      en: "Hardware, network, virtualisation and backups.",
      pl: "Sprzęt, sieć, wirtualizacja i backupy.",
    },
    highlights: {
      en: [
        "Proxmox on an ACEMAGIC mini PC (Ryzen 7 7730U, 16 GB RAM, 512 GB), with each project in its own virtual machine.",
        "Dynalink DL-WRX36 running OpenWrt instead of stock firmware, so routing, DNS and firewall rules are mine.",
        "Synology DS923+ with 12 TB of WD Red Plus for storage and scheduled backups.",
        "TP-Link TL-SG108 switch tying the rack together on wired links.",
        "Updates, backups and uptime handled the way I handle them at work.",
      ],
      pl: [
        "Proxmox na mini PC ACEMAGIC (Ryzen 7 7730U, 16 GB RAM, 512 GB), każdy projekt w osobnej maszynie wirtualnej.",
        "Dynalink DL-WRX36 z OpenWrt zamiast fabrycznego firmware'u, więc routing, DNS i reguły zapory są moje.",
        "Synology DS923+ z 12 TB WD Red Plus na dane i zaplanowane kopie zapasowe.",
        "Switch TP-Link TL-SG108 spinający całość po kablu.",
        "Aktualizacje, backupy i dostępność prowadzone tak, jak prowadzę je w pracy.",
      ],
    },
    tech: ["Proxmox", "OpenWrt", "Synology DSM", "Linux", "Networking"],
    links: [],
    // No photographs yet: the card falls back to a generated cover until there
    // are some.
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

/** The heading a project files under: its own if it names one, else its category's. */
export function groupOf(project: Project): string {
  if (project.group) return project.group;

  const byCategory = projectGroups.find((group) => group.categories.includes(project.category));

  return byCategory?.id ?? "apps";
}

/** Every screenshot a project has, in order, whichever shape it stores them in. */
export function galleryOf(project: Project): string[] {
  if (project.gallerySections) {
    return project.gallerySections.flatMap((section) => section.images);
  }

  return project.gallery ?? [];
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
