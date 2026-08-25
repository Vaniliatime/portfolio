import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Lock, RotateCw } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { statusLabels, type Project } from "@/content/projects";

/**
 * The featured project shown in a browser chrome in the hero, tilted slightly
 * so it reads as a screen sitting in the page rather than a flat screenshot.
 */
export function HeroShowcase({ project, lang }: { project: Project; lang: Locale }) {
  const host = project.links.find((link) => link.kind === "site")?.label ?? project.title;

  return (
    <div className="relative">
      {/* Violet pool behind the screen. Gradient stops rather than a blur
          filter, which Firefox renders far more cheaply. */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-full"
        style={{
          background:
            "radial-gradient(circle closest-side, var(--blob-core), var(--blob-mid) 50%, transparent 75%)",
        }}
      />

      <Link
        href={localePath(lang, `work/${project.slug}`)}
        className="group relative block [perspective:1400px]"
        aria-label={project.title}
      >
        <div className="beam rounded-2xl shadow-lift transition-transform duration-500 ease-out [transform:rotateY(-7deg)_rotateX(3deg)] group-hover:[transform:rotateY(-2deg)_rotateX(1deg)]">
          <div className="relative z-10 overflow-hidden rounded-[calc(1rem-1px)] bg-surface">
            {/* Browser chrome, spelled out enough to read as a window. */}
            <div className="flex items-center gap-2.5 border-b border-line bg-surface-2 px-3 py-2.5">
              <span aria-hidden className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </span>

              <span aria-hidden className="flex items-center gap-1 text-ink-faint">
                <ChevronLeft className="h-3.5 w-3.5" />
                <ChevronRight className="h-3.5 w-3.5" />
                <RotateCw className="ml-0.5 h-3 w-3" />
              </span>

              <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1 text-[0.7rem] text-ink-faint">
                <Lock className="h-2.5 w-2.5 shrink-0 text-emerald-500" />
                <span className="truncate">{host}</span>
              </span>
            </div>

            <div className="relative aspect-[16/11] bg-surface-2">
              <Image
                src={project.cover ?? ""}
                alt={project.title}
                fill
                priority
                sizes="(min-width: 1024px) 460px, 90vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        <span className="mt-4 inline-flex items-center gap-2 text-sm text-ink-muted">
          <span className="font-medium text-ink">{project.title}</span>
          <span className="text-ink-faint">{t(statusLabels[project.status], lang)}</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </div>
  );
}
