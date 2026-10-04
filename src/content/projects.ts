import type { Localized } from "@/lib/i18n";
import projectData from "./projects.json";

/**
 * What a project is, and nothing else. Who it was built for is a separate
 * question with a separate answer: see `client` on the project. Mixing the two
 * meant a site built for a client and an application built for a client were
 * the same category while a site and an application were not, which is the
 * wrong way round.
 */
export type Category = "app" | "site" | "game" | "design" | "hardware";

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
  /**
   * Real work, paid for by somebody who needed it, as opposed to something I
   * built because I wanted it to exist. It reads as a tag next to the category
   * rather than as a category of its own, so a card can say "Website" and
   * "Client work" at once instead of having to choose.
   */
  client?: boolean;
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
 * How the work page divides itself up: one heading per kind of thing.
 *
 * The headings are plural and the categories singular, because a heading is
 * over a set and a category is on one card. Nothing here knows about clients:
 * that is a tag, and it cuts across every one of these.
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
    categories: ["app"],
  },
  {
    id: "sites",
    label: { en: "Websites", pl: "Strony internetowe" },
    categories: ["site"],
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
  { id: "app", label: { en: "Application", pl: "Aplikacja" } },
  { id: "site", label: { en: "Website", pl: "Strona internetowa" } },
  { id: "game", label: { en: "Game & level design", pl: "Gra i level design" } },
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

/*
 * The projects themselves live in projects.json, one object per project, in the
 * order the work page shows them. They are data rather than code so that the
 * admin panel (admin.kkaszuba.eu) and ScreenShooter can write them without
 * having to edit TypeScript. Everything that interprets them stays here.
 *
 * JSON has no literal types, so the shape is asserted rather than inferred.
 * Anything that writes the file is expected to keep to the Project interface.
 */
export const projects = projectData as Project[];

export const featuredProjects = projects.filter((p) => p.featured);

/** The project the hero always opens on, whatever the rotation does after it. */
export const leadSlug = "amtracker";

/**
 * Everything the hero carousel may show, in its resting order.
 *
 * The home page cards are four on purpose; the carousel is not, because it
 * costs a reader nothing to sit there and it is the only place the older work
 * gets seen at all.
 *
 * Applications and sites only, and only with a screenshot. The frame around
 * the slide is a browser with an address bar in it, which describes a web
 * application and says nothing true about a game, a business card or a rack of
 * hardware. Those live on the work page, in their own sections.
 *
 * The lead comes first here and the hero keeps it there. The rest are shuffled
 * once per visit, so the second slide is a different project each time.
 */
const showcaseCategories: Category[] = ["app", "site"];

const inShowcase = (p: Project) => Boolean(p.cover) && showcaseCategories.includes(p.category);

export const showcaseProjects = [
  ...projects.filter((p) => p.slug === leadSlug && inShowcase(p)),
  ...projects.filter((p) => p.slug !== leadSlug && inShowcase(p)),
];

/** The heading a project files under, which its category alone decides. */
export function groupOf(project: Project): string {
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
