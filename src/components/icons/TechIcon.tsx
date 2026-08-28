import {
  siBootstrap,
  siExpress,
  siGit,
  siHtml5,
  siLinux,
  siNextdotjs,
  siNodedotjs,
  siPrisma,
  siReact,
  siSqlite,
  siTailwindcss,
  siTypescript,
  siVite,
  siWoocommerce,
  siWordpress,
} from "simple-icons";
import {
  BadgeCheck,
  Database,
  FileText,
  KeyRound,
  LifeBuoy,
  Server,
  Siren,
  Sparkles,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface Brand {
  path: string;
  hex: string;
}

/**
 * Brand marks for the stack, with a plain glyph wherever there is no brand.
 *
 * Keyed by the exact string in the skills list, so an unlisted tool simply
 * falls back rather than breaking the row. Oracle, ServiceNow and Motion have
 * no mark in the icon set, which is why those three read as generic.
 */
const brands: Record<string, Brand> = {
  React: siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  "Tailwind CSS": siTailwindcss,
  "HTML & CSS": siHtml5,
  Bootstrap: siBootstrap,
  "Node.js": siNodedotjs,
  Express: siExpress,
  Prisma: siPrisma,
  SQLite: siSqlite,
  WordPress: siWordpress,
  WooCommerce: siWoocommerce,
  "Linux server": siLinux,
  Git: siGit,
  Vite: siVite,
};

const glyphs: Record<string, LucideIcon> = {
  Motion: Sparkles,
  "Oracle SQL": Database,
  "REST APIs": Webhook,
  NextAuth: KeyRound,
  "Hosting & DNS": Server,
  Jira: BadgeCheck,
  ServiceNow: LifeBuoy,
  "Incident triage": Siren,
  ITIL: BadgeCheck,
  Documentation: FileText,
};

/**
 * Brand colour, and a readable stand-in for it on the dark theme.
 *
 * Several marks are near black, which is invisible against a dark card. Rather
 * than keeping a second palette by hand, anything this dark is swapped for the
 * page's own muted ink.
 */
function darkSafe(hex: string) {
  const value = parseInt(hex, 16);
  const luminance =
    (0.2126 * ((value >> 16) & 255) + 0.7152 * ((value >> 8) & 255) + 0.0722 * (value & 255)) / 255;

  return luminance < 0.3 ? "#a9a2c0" : `#${hex}`;
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const brand = brands[name];

  if (brand) {
    return (
      <svg
        role="img"
        aria-hidden
        viewBox="0 0 24 24"
        className={cn("tech-icon h-3.5 w-3.5 shrink-0", className)}
        style={{ "--tech": `#${brand.hex}`, "--tech-dark": darkSafe(brand.hex) } as CSSProperties}
        fill="currentColor"
      >
        <path d={brand.path} />
      </svg>
    );
  }

  const Glyph = glyphs[name];
  if (!Glyph) return null;

  return <Glyph aria-hidden className={cn("h-3.5 w-3.5 shrink-0 text-ink-faint", className)} />;
}
