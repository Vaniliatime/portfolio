import type { Localized } from "@/lib/i18n";

/** One position. A company with several of these shows a promotion path. */
export interface ResumeRole {
  title: Localized;
  period: string;
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
  icon?: "work" | "school" | "design" | "tools";
  roles: ResumeRole[];
}

export interface ResumeSection {
  id: string;
  label: Localized;
}

export const resumeSections: ResumeSection[] = [
  { id: "employment", label: { en: "Employment", pl: "Etat" } },
  { id: "freelance", label: { en: "Freelance & side projects", pl: "Freelance i projekty własne" } },
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
    en: "Paid work and products built outside employment.",
    pl: "Płatne zlecenia i produkty budowane poza etatem.",
  },
};

/* ---------------------------------------------------------------------------
   Permanent employment, newest first.
--------------------------------------------------------------------------- */
export const employment: ResumeEntry[] = [
  {
    org: "Venthone (European Commission project)",
    location: { en: "Hybrid, Brussels", pl: "Hybrydowo, Bruksela" },
    period: "Jul 2024 to present",
    icon: "work",
    roles: [
      {
        title: {
          en: "IT Application Support Agent, mid",
          pl: "IT Application Support Agent, mid",
        },
        period: "Apr 2026 to present",
        points: {
          en: [
            "Promoted to mid level after eighteen months on the project.",
            "Own incidents and service requests end to end in Jira and ServiceNow, inside SLA.",
            "Trace data problems through Oracle SQL rather than escalating them blind.",
            "Hand developers bug reports they can act on without a second round of questions.",
          ],
          pl: [
            "Awans na poziom mid po półtora roku na projekcie.",
            "Prowadzenie incydentów i zgłoszeń od początku do końca w Jirze i ServiceNow, w ramach SLA.",
            "Śledzenie problemów z danymi w Oracle SQL zamiast eskalowania ich w ciemno.",
            "Przekazywanie deweloperom raportów, na których mogą działać bez dopytywania.",
          ],
        },
      },
      {
        title: {
          en: "IT Application Support Agent, junior",
          pl: "IT Application Support Agent, junior",
        },
        period: "Jul 2024 to Apr 2026",
        points: {
          en: [
            "First line of defence for EU-wide systems used by 1,000+ internal and 50,000+ external users.",
            "Reproduced reported faults and ran diagnostics before escalation.",
            "Closed the loop with users across multilingual support channels.",
          ],
          pl: [
            "Pierwsza linia wsparcia dla systemów obejmujących całą UE, używanych przez ponad 1000 użytkowników wewnętrznych i 50 000 zewnętrznych.",
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
    icon: "work",
    roles: [
      {
        title: { en: "IT Specialist", pl: "IT Specialist" },
        period: "Nov 2019 to Jun 2024 · Full-time, remote",
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
        period: "Jun 2019 to Nov 2019 · Internship, on-site",
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
    icon: "tools",
    roles: [
      {
        title: { en: "Computer Technician", pl: "Technik komputerowy" },
        period: "2016 · Internship",
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
   Freelance and product work.
--------------------------------------------------------------------------- */
export const freelance: ResumeEntry[] = [
  {
    org: "Licensed passenger transport (three sites)",
    location: { en: "Remote", pl: "Zdalnie" },
    period: "2024 to present",
    projectSlug: "passenger-transport",
    roles: [
      {
        title: { en: "Web developer", pl: "Web developer" },
        period: "2024 to present",
        points: {
          en: [
            "Built and maintain three domains covering one transport operator from three angles: brand, city service and licensing.",
            "Structured each site around booking intent: pricing, routes, fleet and a contact path on every page.",
            "Laid the local SEO groundwork and handle hosting and updates on an ongoing basis.",
          ],
          pl: [
            "Zbudowanie i utrzymanie trzech domen pokazujących jednego przewoźnika z trzech stron: marka, usługa lokalna i licencjonowany przewóz.",
            "Ułożenie każdej strony wokół intencji rezerwacji: cennik, trasy, flota i ścieżka kontaktu na każdej podstronie.",
            "Fundament pod lokalne SEO oraz bieżący hosting i aktualizacje.",
          ],
        },
      },
    ],
  },
  {
    org: "AM Tracker",
    location: { en: "Own product", pl: "Produkt własny" },
    period: "2025 to present",
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
    org: "Kształcenie Słuchu (auditory training eBook)",
    location: { en: "Freelance, remote", pl: "Freelance, zdalnie" },
    period: "Jan 2024 to Jan 2025",
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
    icon: "design",
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

export const education: ResumeEntry[] = [
  {
    // NOTE: WSEI has since been absorbed by another institution. Update the
    // name here if the degree should carry the successor's.
    org: "WSEI, University of Economics and Computer Science",
    location: { en: "Specialisation: game development", pl: "Specjalizacja: game development" },
    period: "10.2018 to 10.2022",
    icon: "school",
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
