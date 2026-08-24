import type { Localized } from "@/lib/i18n";

export interface ResumeEntry {
  title: Localized;
  org: string;
  location: Localized;
  period: string;
  /** Optional link shown under the entry. */
  link?: { label: string; href: string };
  points: Localized<string[]>;
}

export interface ResumeSection {
  id: string;
  label: Localized;
}

export const resumeSections: ResumeSection[] = [
  { id: "experience", label: { en: "Experience", pl: "Doświadczenie" } },
  { id: "education", label: { en: "Education", pl: "Wykształcenie" } },
  { id: "certificates", label: { en: "Certificates", pl: "Certyfikaty" } },
  { id: "languages", label: { en: "Languages", pl: "Języki" } },
];

// NOTE: job title below is the one from the previous site. Update it if the
// recent promotion changed the official title.
export const experience: ResumeEntry[] = [
  {
    title: { en: "IT Application Support Agent", pl: "IT Application Support Agent" },
    org: "Venthone — European Commission project",
    location: { en: "Hybrid, Brussels", pl: "Hybrydowo, Bruksela" },
    period: "07.2024 — present",
    points: {
      en: [
        "Support 1,000+ internal and 50,000+ external users across EU-wide systems.",
        "Handle incidents and service requests in Jira and ServiceNow within SLA.",
        "Reproduce reported issues, run diagnostics and write bug reports developers can act on.",
        "Investigate data problems with Oracle SQL and assist application troubleshooting.",
        "Communicate resolutions across multilingual support channels.",
      ],
      pl: [
        "Wsparcie dla ponad 1000 użytkowników wewnętrznych i 50 000 zewnętrznych w systemach obejmujących całą UE.",
        "Obsługa incydentów i zgłoszeń w Jirze i ServiceNow w ramach SLA.",
        "Odtwarzanie zgłoszonych błędów, diagnostyka i pisanie raportów, na których deweloperzy mogą pracować.",
        "Analiza problemów z danymi w Oracle SQL i wsparcie w diagnozowaniu aplikacji.",
        "Komunikacja rozwiązań w wielojęzycznych kanałach wsparcia.",
      ],
    },
  },
  {
    title: { en: "Co-author & content developer", pl: "Współautor i twórca treści" },
    org: "Auditory Training eBook",
    location: { en: "Remote", pl: "Zdalnie" },
    period: "01.2024 — 01.2025",
    link: { label: "ksztalcenie-sluchu.pl", href: "https://www.ksztalcenie-sluchu.pl" },
    points: {
      en: [
        "Co-authored and published a digital eBook combining auditory training with music theory.",
        "Processed and corrected 500+ scanned music sheets and designed the final PDF layout.",
        "Built the sales and distribution website end to end.",
        "Implemented checkout with automatic download access for buyers.",
        "Managed publishing, hosting and ongoing updates.",
      ],
      pl: [
        "Współautorstwo i publikacja eBooka łączącego kształcenie słuchu z teorią muzyki.",
        "Obróbka i korekta ponad 500 zeskanowanych nut oraz projekt finalnego layoutu PDF.",
        "Zbudowanie strony sprzedażowej i dystrybucyjnej od początku do końca.",
        "Wdrożenie koszyka z automatycznym dostępem do pobrania dla kupujących.",
        "Zarządzanie publikacją, hostingiem i bieżącymi aktualizacjami.",
      ],
    },
  },
  {
    title: { en: "IT support engineer", pl: "IT support engineer" },
    org: "Clickbus LTD",
    location: { en: "Hybrid, Birmingham", pl: "Hybrydowo, Birmingham" },
    period: "07.2019 — 06.2024",
    points: {
      en: [
        "Started as an onsite intern and grew into a full-time remote support engineer.",
        "Supported logistics, operations and back-office teams.",
        "Managed Windows Server and user workstations for uptime and data integrity.",
        "Handled onboarding and offboarding, hardware setup and user provisioning.",
        "Maintained the company WordPress site — content and plugin updates.",
        "Cut resolution times by improving internal documentation and standardising IT setup.",
      ],
      pl: [
        "Start jako stażysta on-site, rozwój do pełnoetatowego zdalnego support engineera.",
        "Wsparcie zespołów logistyki, operacji i back office.",
        "Zarządzanie Windows Server i stacjami roboczymi pod kątem dostępności i spójności danych.",
        "Obsługa onboardingu i offboardingu, przygotowanie sprzętu i kont użytkowników.",
        "Utrzymanie firmowej strony na WordPressie — treści i aktualizacje wtyczek.",
        "Skrócenie czasu rozwiązywania zgłoszeń przez lepszą dokumentację i standaryzację konfiguracji IT.",
      ],
    },
  },
  {
    title: { en: "Postproduction editor", pl: "Montażysta postprodukcji" },
    org: "DIMK cultural project",
    location: { en: "Remote", pl: "Zdalnie" },
    period: "01.2023 — 01.2024",
    points: {
      en: [
        "Edited and assembled audio-visual material for a concert project.",
        "Audio cleanup and mastering in Audacity; video editing and colour correction in DaVinci Resolve.",
        "Produced presentation folders and multimedia showcase materials.",
        "Organised and archived assets in structured libraries for team access.",
      ],
      pl: [
        "Montaż i składanie materiału audiowizualnego dla projektu koncertowego.",
        "Czyszczenie i mastering dźwięku w Audacity; montaż i korekcja koloru w DaVinci Resolve.",
        "Przygotowanie folderów prezentacyjnych i materiałów multimedialnych.",
        "Uporządkowanie i archiwizacja materiałów w strukturze dostępnej dla zespołu.",
      ],
    },
  },
];

export const education: ResumeEntry[] = [
  {
    title: { en: "Engineer, Computer Science & Econometrics", pl: "Inżynier, informatyka i ekonometria" },
    org: "College of Economics and Computer Science",
    location: { en: "Specialisation: game development", pl: "Specjalizacja: game development" },
    period: "10.2018 — 10.2022",
    link: { label: "Thesis project: Vanilia Runner", href: "https://github.com/Vaniliatime/Vanilla-Runner" },
    points: {
      en: [
        "Engineering degree with a focus on game development.",
        "Specialised in Unity and C# for interactive applications and gameplay systems.",
        "Built a 3D Unity game as the thesis project, including mechanics, achievements and UI logic.",
      ],
      pl: [
        "Tytuł inżyniera ze specjalizacją w game development.",
        "Specjalizacja w Unity i C# dla aplikacji interaktywnych i systemów rozgrywki.",
        "Gra 3D w Unity jako projekt dyplomowy — mechaniki, osiągnięcia i logika UI.",
      ],
    },
  },
  {
    title: { en: "Graphic & multimedia design", pl: "Grafika i projektowanie multimediów" },
    org: "Gloker Post-Secondary School",
    location: { en: "Poland", pl: "Polska" },
    period: "09.2017 — 07.2018",
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
  {
    title: { en: "IT technician", pl: "Technik informatyk" },
    org: "Complex of Printing and Mechanical Schools, Katowice",
    location: { en: "Katowice, Poland", pl: "Katowice" },
    period: "09.2013 — 06.2017",
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
];

export const certificates: string[] = [
  "MTA: Security Fundamentals (98-367)",
  "MTA: Software Development (98-361)",
  "MTA: HTML5 App Development (98-375)",
  "MTA: Database Fundamentals (98-364)",
];

export const languages: { code: string; name: Localized; level: Localized }[] = [
  { code: "PL", name: { en: "Polish", pl: "Polski" }, level: { en: "Native", pl: "Ojczysty" } },
  { code: "GB", name: { en: "English", pl: "Angielski" }, level: { en: "C1", pl: "C1" } },
];

export const resumeMeta = {
  /** Drop the file in /public to enable the download button. */
  pdf: "/Krzysztof_Kaszuba_CV.pdf",
  extras: {
    en: ["Driving licence: category B"],
    pl: ["Prawo jazdy: kategoria B"],
  } satisfies Localized<string[]>,
};
