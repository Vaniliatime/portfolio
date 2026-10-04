import type { Localized } from "@/lib/i18n";
import resumeData from "./resume.json";

/** One position. A company with several of these shows a promotion path. */
export interface ResumeRole {
  title: Localized;
  period: string;
  /** Seniority or employment type, shown as a badge beside the title. */
  level?: Localized;
  points: Localized<string[]>;
}

/**
 * Most names read the same in both languages, so a plain string is the common
 * case. Institutions whose Polish name means nothing to an English reader
 * carry both.
 */
export type OrgName = string | Localized;

export interface ResumeEntry {
  org: OrgName;
  location: Localized;
  /** Whole-company span, shown when an entry holds more than one role. */
  period?: string;
  link?: { label: string; href: string };
  /** Pulls the thumbnail and the case study link from src/content/projects. */
  projectSlug?: string;
  /** Logo file in /public. Falls back to a themed icon when absent. */
  logo?: string;
  /** Logo brings its own background: let it fill the tile edge to edge. */
  logoFill?: boolean;
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
    | "event"
    | "gift";
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

/** Accessible name of the section list. */
export const resumeNavLabel: Localized = { en: "Sections", pl: "Sekcje" };

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

export interface CertificateGroup {
  title: Localized;
  note?: Localized;
  items: Certificate[];
}

export interface Language {
  code: string;
  name: Localized;
  level: Localized;
}

/*
 * The entries themselves live in resume.json, newest first within each
 * section. They are data rather than code so that the admin panel
 * (admin.kkaszuba.eu) can edit them; everything that interprets them stays
 * here. JSON has no literal types, so the shapes are asserted.
 */
export const employment = resumeData.employment as ResumeEntry[];
export const freelance = resumeData.freelance as ResumeEntry[];
/** Own products, kept separate from client work: nobody commissioned these. */
export const ownProjects = resumeData.ownProjects as ResumeEntry[];
export const education = resumeData.education as ResumeEntry[];
export const certificateGroups = resumeData.certificateGroups as CertificateGroup[];
export const languages = resumeData.languages as Language[];

export const resumeMeta = {
  /** Drop the file in /public to enable the download button. */
  pdf: "/Krzysztof_Kaszuba_CV.pdf",
};
