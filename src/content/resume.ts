import type { Localized } from "@/lib/i18n";

/** One position. A company with several of these shows a promotion path. */
export interface ResumeRole {
  title: Localized;
  period: string;
  /** Seniority or employment type, shown as a badge beside the title. */
  level?: Localized;
  points: Localized<string[]>;
}

export interface ResumeEntry {
  org: string;
  location: Localized;
  /** Whole-company span, shown when an entry holds more than one role. */
  period?: string;
  link?: { label: string; href: string };
  /** Pulls the thumbnail and the case study link from src/content/projects. */
  projectSlug?: string;
  /** Logo file in /public. Falls back to a themed icon when absent. */
  logo?: string;
  /** Fallback glyph, keyed in the resume page. */
  icon?:
    | "work"
    | "institution"
    | "logistics"
    | "transport"
    | "product"
    | "book"
    | "media"
    | "school"
    | "design"
    | "tools"
    | "hardware"
    | "learning"
    | "event";
  /** Drawn panel for entries with nothing to screenshot. */
  visual?: "editing";
  /** One short line under the header. Keep it to a fact worth the space. */
  note?: Localized;
  roles: ResumeRole[];
}

export interface ResumeSection {
  id: string;
  label: Localized;
}

export const resumeSections: ResumeSection[] = [
  { id: "employment", label: { en: "Employment", pl: "Etat" } },
  { id: "freelance", label: { en: "Freelance", pl: "Freelance" } },
  { id: "projects", label: { en: "Own projects", pl: "Projekty własne" } },
  { id: "education", label: { en: "Education", pl: "Wykształcenie" } },
  { id: "certificates", label: { en: "Certificates", pl: "Certyfikaty" } },
  { id: "languages", label: { en: "Languages", pl: "Języki" } },
];

export const sectionLeads: Record<string, Localized> = {
  employment: {
    en: "Permanent roles, in reverse order.",
    pl: "Stanowiska etatowe, od najnowszego.",
  },
  freelance: {
    en: "Paid client work taken on outside employment.",
    pl: "Płatne zlecenia dla klientów, brane poza etatem.",
  },
  projects: {
    en: "Products I build for myself, and keep running.",
    pl: "Produkty, które buduję dla siebie i utrzymuję.",
  },
};

/* ---------------------------------------------------------------------------
   Permanent employment, newest first.
--------------------------------------------------------------------------- */
export const employment: ResumeEntry[] = [
  {
    org: "Venthone (European Commission project)",
    location: { en: "Hybrid, Brussels, Belgium", pl: "Hybrydowo, Bruksela, Belgia" },
    period: "Jul 2024 to present",
    icon: "institution",
    roles: [
      {
        title: { en: "IT Application Support Agent", pl: "IT Application Support Agent" },
        level: { en: "Mid", pl: "Mid" },
        period: "Apr 2026 to present",
        points: {
          en: [
            "Moved to third line on promotion, with direct database access.",
            "Investigate data-level faults in Oracle SQL instead of passing them further up.",
            "Write investigation reports and feed findings into problem management.",
            "Own incidents and service requests end to end in Jira and ServiceNow, inside SLA.",
            "Hand developers bug reports they can act on without a second round of questions.",
          ],
          pl: [
            "Po awansie przejście na trzecią linię, z bezpośrednim dostępem do bazy danych.",
            "Analiza błędów na poziomie danych w Oracle SQL zamiast przekazywania ich wyżej.",
            "Pisanie raportów z analiz i przekazywanie wniosków do problem managementu.",
            "Prowadzenie incydentów i zgłoszeń od początku do końca w Jirze i ServiceNow, w ramach SLA.",
            "Przekazywanie deweloperom raportów, na których mogą działać bez dopytywania.",
          ],
        },
      },
      {
        title: { en: "IT Application Support Agent", pl: "IT Application Support Agent" },
        level: { en: "Junior", pl: "Junior" },
        period: "Jul 2024 to Apr 2026",
        points: {
          en: [
            "First and second line: first line for end users, second for internal teams.",
            "Covered EU-wide systems used by 1,000+ internal and 50,000+ external users.",
            "Reproduced reported faults and ran diagnostics before escalation.",
            "Closed the loop with users across multilingual support channels.",
          ],
          pl: [
            "Pierwsza i druga linia: pierwsza dla użytkowników końcowych, druga dla zespołów wewnętrznych.",
            "Obsługa systemów obejmujących całą UE, używanych przez ponad 1000 użytkowników wewnętrznych i 50 000 zewnętrznych.",
            "Odtwarzanie zgłoszonych usterek i diagnostyka przed eskalacją.",
            "Domykanie komunikacji z użytkownikami w wielojęzycznych kanałach wsparcia.",
          ],
        },
      },
    ],
  },
  {
    org: "Clickbus LTD",
    location: { en: "Birmingham, United Kingdom", pl: "Birmingham, Wielka Brytania" },
    period: "Jun 2019 to Jun 2024 · 5 yrs 1 mo",
    icon: "logistics",
    roles: [
      {
        title: { en: "IT Specialist", pl: "IT Specialist" },
        level: { en: "Full-time", pl: "Pełny etat" },
        period: "Nov 2019 to Jun 2024 · Remote",
        points: {
          en: [
            "Sole remote IT support for the internal teams of a logistics company.",
            "Ran Windows Server systems and configured every user workstation.",
            "Owned onboarding, account provisioning and hardware troubleshooting end to end.",
            "Kept the company WordPress site current, from content through to plugin updates.",
            "Cut resolution times by writing the internal documentation that did not exist.",
          ],
          pl: [
            "Jedyne zdalne wsparcie IT dla zespołów wewnętrznych firmy logistycznej.",
            "Utrzymanie systemów Windows Server i konfiguracja wszystkich stacji roboczych.",
            "Pełna odpowiedzialność za onboarding, zakładanie kont i diagnostykę sprzętu.",
            "Bieżące utrzymanie firmowej strony na WordPressie, od treści po aktualizacje wtyczek.",
            "Skrócenie czasu rozwiązywania zgłoszeń przez napisanie nieistniejącej wcześniej dokumentacji.",
          ],
        },
      },
      {
        title: { en: "IT Technician", pl: "Technik IT" },
        level: { en: "Internship", pl: "Staż" },
        period: "Jun 2019 to Nov 2019 · On-site",
        points: {
          en: [
            "Troubleshot hardware and software issues under supervision.",
            "Supported daily IT operations, user account management and device configuration.",
            "Worked hands-on with Windows environments and basic network diagnostics.",
            "Maintained IT documentation and inventory records.",
            "Helped senior IT staff smooth out onboarding for new employees.",
          ],
          pl: [
            "Diagnozowanie problemów sprzętowych i programowych pod nadzorem.",
            "Wsparcie codziennych operacji IT, zarządzania kontami i konfiguracji urządzeń.",
            "Praktyczna praca ze środowiskami Windows i podstawową diagnostyką sieci.",
            "Utrzymanie dokumentacji IT i ewidencji sprzętu.",
            "Wsparcie starszych specjalistów IT przy onboardingu nowych pracowników.",
          ],
        },
      },
    ],
  },
  {
    org: "FafNet",
    location: { en: "Katowice Metropolitan Area, on-site", pl: "Aglomeracja katowicka, stacjonarnie" },
    period: "2016",
    icon: "hardware",
    roles: [
      {
        title: { en: "Computer Technician", pl: "Technik komputerowy" },
        level: { en: "Internship", pl: "Staż" },
        period: "2016",
        points: {
          en: [
            "Installed and repaired computer hardware.",
            "Assisted in managing network infrastructure.",
          ],
          pl: [
            "Instalacja i naprawa sprzętu komputerowego.",
            "Wsparcie przy zarządzaniu infrastrukturą sieciową.",
          ],
        },
      },
    ],
  },
];

/* ---------------------------------------------------------------------------
   Client work taken on outside employment.
--------------------------------------------------------------------------- */
export const freelance: ResumeEntry[] = [
  {
    org: "Klikbus",
    location: { en: "Remote", pl: "Zdalnie" },
    period: "2024 to present",
    icon: "transport",
    projectSlug: "passenger-transport",
    roles: [
      {
        title: { en: "Web developer & maintenance", pl: "Web developer i utrzymanie" },
        period: "2024 to present",
        points: {
          en: [
            "Rebuilt the operator's WordPress site on Next.js and Tailwind, inheriting it from a previous developer.",
            "Grew it into three domains covering the business from three angles: brand, city service and licensing.",
            "Structured each site around booking intent: pricing, routes, fleet and a contact path on every page.",
            "Laid the local SEO groundwork and handle hosting and updates on an ongoing basis.",
          ],
          pl: [
            "Przebudowa strony przewoźnika z WordPressa na Next.js i Tailwind, przejętej po poprzednim wykonawcy.",
            "Rozwinięcie jej w trzy domeny pokazujące firmę z trzech stron: marka, usługa lokalna i licencjonowany przewóz.",
            "Ułożenie każdej strony wokół intencji rezerwacji: cennik, trasy, flota i ścieżka kontaktu na każdej podstronie.",
            "Fundament pod lokalne SEO oraz bieżący hosting i aktualizacje.",
          ],
        },
      },
    ],
  },
  {
    org: "Kształcenie Słuchu (auditory training eBook)",
    location: { en: "Freelance, remote", pl: "Freelance, zdalnie" },
    period: "Jan 2024 to Jan 2025",
    icon: "book",
    projectSlug: "ksztalcenie-sluchu",
    roles: [
      {
        title: { en: "Co-author & content developer", pl: "Współautor i twórca treści" },
        period: "Jan 2024 to Jan 2025 · 1 yr 1 mo",
        points: {
          en: [
            "Co-authored and published a digital eBook combining auditory training with music theory.",
            "Processed and corrected 500+ scanned music sheets and designed the final PDF layout.",
            "Built the store that sells it, with checkout and automatic download access for buyers.",
            "Handled publishing, hosting and ongoing updates.",
          ],
          pl: [
            "Współautorstwo i publikacja eBooka łączącego kształcenie słuchu z teorią muzyki.",
            "Obróbka i korekta ponad 500 zeskanowanych nut oraz projekt finalnego layoutu PDF.",
            "Zbudowanie sklepu, który go sprzedaje, z koszykiem i automatycznym dostępem do pobrania.",
            "Publikacja, hosting i bieżące aktualizacje.",
          ],
        },
      },
    ],
  },
  {
    org: "Diecezjalny Instytut Muzyki Kościelnej",
    location: { en: "Freelance, remote", pl: "Freelance, zdalnie" },
    period: "Jan 2023 to Jan 2024",
    icon: "media",
    visual: "editing",
    roles: [
      {
        title: {
          en: "Multimedia & postproduction specialist",
          pl: "Specjalista ds. multimediów i postprodukcji",
        },
        period: "Jan 2023 to Jan 2024 · 1 yr 1 mo",
        points: {
          en: [
            "Edited and assembled the audio-visual material for a concert project.",
            "Audio cleanup and mastering in Audacity; video editing and colour correction in DaVinci Resolve.",
            "Produced presentation folders and multimedia showcase materials.",
            "Organised and archived every asset in structured libraries the team could actually navigate.",
          ],
          pl: [
            "Montaż i składanie materiału audiowizualnego dla projektu koncertowego.",
            "Czyszczenie i mastering dźwięku w Audacity; montaż i korekcja koloru w DaVinci Resolve.",
            "Przygotowanie folderów prezentacyjnych i materiałów multimedialnych.",
            "Uporządkowanie i archiwizacja wszystkich materiałów w strukturze, po której zespół potrafił się poruszać.",
          ],
        },
      },
    ],
  },
];

/* ---------------------------------------------------------------------------
   Own products, kept separate from client work: nobody commissioned these.
--------------------------------------------------------------------------- */
export const ownProjects: ResumeEntry[] = [
  {
    org: "AM Tracker",
    location: { en: "Own product", pl: "Produkt własny" },
    period: "2025 to present",
    icon: "product",
    projectSlug: "amtracker",
    roles: [
      {
        title: { en: "Full-stack developer", pl: "Full-stack developer" },
        period: "2025 to present",
        points: {
          en: [
            "Designed and shipped a production web app end to end: schema, authentication, email, UI and deployment.",
            "Built account handling with email verification and TOTP two-factor login.",
            "Modelled the domain in Prisma and surfaced it as a personal statistics dashboard.",
            "Run it on my own server, including backups and updates.",
          ],
          pl: [
            "Zaprojektowanie i wdrożenie produkcyjnej aplikacji webowej od zera: schemat bazy, autoryzacja, mailing, UI i deployment.",
            "Obsługa kont z weryfikacją e-mail i logowaniem dwuskładnikowym TOTP.",
            "Model domeny w Prisma wystawiony jako panel statystyk osobistych.",
            "Utrzymanie na własnym serwerze, razem z backupami i aktualizacjami.",
          ],
        },
      },
    ],
  },
  {
    org: "ITIL 5 Exam Prep Quiz",
    location: { en: "Own product", pl: "Produkt własny" },
    period: "2026 to present",
    icon: "learning",
    projectSlug: "itil-quiz",
    roles: [
      {
        title: { en: "Solo build", pl: "Wykonanie solo" },
        period: "2026 to present",
        points: {
          en: [
            "Writing the question bank against the ITIL 5 syllabus, graded by difficulty and kept as structured JSON.",
            "Timed exam mode alongside a practice mode that explains why an answer was wrong.",
            "Progress tracking that brings weak areas back more often.",
            "Built on React 19 and Vite with a typed data layer.",
          ],
          pl: [
            "Pisanie bazy pytań pod sylabus ITIL 5, z poziomem trudności, trzymanej jako uporządkowany JSON.",
            "Tryb egzaminu na czas obok trybu nauki, który tłumaczy, dlaczego odpowiedź była błędna.",
            "Śledzenie postępów, które częściej przywraca słabsze obszary.",
            "Zbudowane na React 19 i Vite z typowaną warstwą danych.",
          ],
        },
      },
    ],
  },
  {
    org: "Interactive Wedding Invitations",
    location: { en: "Own product", pl: "Produkt własny" },
    period: "2026 to present",
    icon: "event",
    projectSlug: "wedding-invitations",
    roles: [
      {
        title: { en: "Product and build", pl: "Produkt i wykonanie" },
        period: "2026 to present",
        points: {
          en: [
            "Started as the invitation for my own wedding, built to find out whether the idea holds up.",
            "Animated one-page invitation with scroll-driven scenes, a countdown and a custom mini game.",
            "RSVP form writing to SQLite, with email notifications and guest photo uploads resized server-side.",
            "Groundwork for a separate company site selling these as a service.",
          ],
          pl: [
            "Zaczęło się jako zaproszenie na mój własny ślub, zbudowane po to, żeby sprawdzić, czy pomysł się broni.",
            "Animowane zaproszenie one-page ze scenami sterowanymi scrollem, odliczaniem i autorską mini grą.",
            "Formularz RSVP zapisujący do SQLite, z powiadomieniami e-mail i zdjęciami gości skalowanymi po stronie serwera.",
            "Podstawa pod osobną stronę firmową sprzedającą to jako usługę.",
          ],
        },
      },
    ],
  },
];

export const education: ResumeEntry[] = [
  {
    // The diploma carries the original name, so that is what is shown. The
    // successor gets one line, for anyone who goes looking for the school.
    org: "WSEI Kraków",
    location: { en: "Specialisation: game development", pl: "Specjalizacja: game development" },
    period: "10.2018 to 10.2022",
    icon: "school",
    logo: "/images/logos/wsei.webp",
    note: {
      en: "Now Uniwersytet DSW Ideis Kraków",
      pl: "Obecnie Uniwersytet DSW Ideis Kraków",
    },
    link: { label: "Thesis project: Vanilia Runner", href: "https://github.com/Vaniliatime/Vanilla-Runner" },
    roles: [
      {
        title: { en: "Engineer, Computer Science & Econometrics", pl: "Inżynier, informatyka i ekonometria" },
        period: "10.2018 to 10.2022",
        points: {
          en: [
            "Engineering degree with a focus on game development.",
            "Specialised in Unity and C# for interactive applications and gameplay systems.",
            "Built a 3D Unity game as the thesis project, including mechanics, achievements and UI logic.",
          ],
          pl: [
            "Tytuł inżyniera ze specjalizacją w game development.",
            "Specjalizacja w Unity i C# dla aplikacji interaktywnych i systemów rozgrywki.",
            "Gra 3D w Unity jako projekt dyplomowy: mechaniki, osiągnięcia i logika UI.",
          ],
        },
      },
    ],
  },
  {
    org: "Gloker Post-Secondary School",
    location: { en: "Poland", pl: "Polska" },
    period: "09.2017 to 07.2018",
    icon: "design",
    logo: "/images/logos/gloker.webp",
    roles: [
      {
        title: { en: "Graphic & multimedia design", pl: "Grafika i projektowanie multimediów" },
        period: "09.2017 to 07.2018",
        points: {
          en: [
            "Post-secondary programme in graphic and multimedia design.",
            "Hands-on work in Photoshop, Illustrator and the wider Adobe toolset.",
            "Studied visual storytelling, layout and user-centred digital design.",
          ],
          pl: [
            "Szkoła policealna w kierunku grafiki i multimediów.",
            "Praktyczna praca w Photoshopie, Illustratorze i pozostałych narzędziach Adobe.",
            "Nauka narracji wizualnej, layoutu i projektowania zorientowanego na użytkownika.",
          ],
        },
      },
    ],
  },
  {
    org: "Complex of Printing and Mechanical Schools, Katowice",
    location: { en: "Katowice, Poland", pl: "Katowice" },
    period: "09.2013 to 06.2017",
    icon: "tools",
    roles: [
      {
        title: { en: "IT technician", pl: "Technik informatyk" },
        period: "09.2013 to 06.2017",
        points: {
          en: [
            "Graduated as an IT technician focused on computer systems and networking.",
            "Built and maintained PC hardware, configured software and resolved technical issues.",
            "Laid the foundation for later work in IT support and systems administration.",
          ],
          pl: [
            "Dyplom technika informatyka ze specjalizacją w systemach komputerowych i sieciach.",
            "Składanie i utrzymanie sprzętu PC, konfiguracja oprogramowania i rozwiązywanie problemów.",
            "Fundament pod późniejszą pracę w IT support i administracji systemami.",
          ],
        },
      },
    ],
  },
];

/* ---------------------------------------------------------------------------
   Certificates. Taken from the PDFs in /certs: those are the exact titles,
   issuers and dates as printed.
--------------------------------------------------------------------------- */
export type CertificateIcon =
  | "process"
  | "security"
  | "code"
  | "ai"
  | "osint"
  | "monitoring"
  | "microsoft";

export interface Certificate {
  name: string;
  issuer?: string;
  period?: string;
  /** Training hours, where the certificate states them. */
  hours?: string;
  icon?: CertificateIcon;
}

export const certificateGroups: { title: Localized; note?: Localized; items: Certificate[] }[] = [
  {
    title: { en: "Service management", pl: "Zarządzanie usługami" },
    items: [
      {
        name: "ITIL Foundation, version 5",
        issuer: "PeopleCert",
        period: "Aug 2026 to Aug 2029",
        icon: "process",
      },
    ],
  },
  {
    title: { en: "Security & AI training", pl: "Szkolenia z bezpieczeństwa i AI" },
    note: {
      en: "Securitum / Sekurak.Academy: 155 hours of training in total.",
      pl: "Securitum / Sekurak.Academy, łącznie 155 godzin szkoleń.",
    },
    items: [
      {
        name: "Sekurak.Academy 2025, semester II",
        issuer: "Securitum",
        period: "Jul 2025 to Jan 2026",
        hours: "50 h",
        icon: "security",
      },
      {
        name: "Practical Python: 12 step-by-step projects, extended edition",
        issuer: "Securitum / HexArcana",
        period: "Nov 2025 to Feb 2026",
        hours: "36 h",
        icon: "code",
      },
      {
        name: "AI Toolbox 2.0 Reloaded",
        issuer: "Securitum",
        period: "Sep to Dec 2025",
        hours: "26 h",
        icon: "ai",
      },
      {
        name: "OSINT 2.0 Toolkit Reloaded",
        issuer: "Securitum",
        period: "Oct to Dec 2025",
        hours: "26 h",
        icon: "osint",
      },
      {
        name: "AI Toolbox, a practical review of AI tools, 2025 edition",
        issuer: "Securitum",
        period: "May to Jun 2025",
        hours: "15 h",
        icon: "ai",
      },
      {
        name: "Introduction to Wazuh (SIEM)",
        issuer: "Securitum",
        period: "Jun 2025",
        hours: "1.5 h",
        icon: "monitoring",
      },
    ],
  },
  {
    title: { en: "Microsoft", pl: "Microsoft" },
    items: [
      { name: "MTA: Security Fundamentals (98-367)", issuer: "Microsoft", icon: "microsoft" },
      { name: "MTA: Software Development (98-361)", issuer: "Microsoft", icon: "microsoft" },
      { name: "MTA: HTML5 App Development (98-375)", issuer: "Microsoft", icon: "microsoft" },
      { name: "MTA: Database Fundamentals (98-364)", issuer: "Microsoft", icon: "microsoft" },
    ],
  },
];

export const languages: { code: string; name: Localized; level: Localized }[] = [
  { code: "PL", name: { en: "Polish", pl: "Polski" }, level: { en: "Native", pl: "Ojczysty" } },
  { code: "GB", name: { en: "English", pl: "Angielski" }, level: { en: "C1", pl: "C1" } },
];

export const resumeMeta = {
  /** Drop the file in /public to enable the download button. */
  pdf: "/Krzysztof_Kaszuba_CV.pdf",
};
