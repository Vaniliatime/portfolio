import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";

/** Deterministic hue per slug, so a project keeps the same placeholder tint. */
function hueFor(slug: string) {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  // Bias toward the violet/blue/magenta arc rather than the whole wheel.
  return 240 + (hash % 90);
}

function monogram(title: string) {
  return title
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}

interface ProjectCoverProps {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * A project's cover image, or a generated gradient panel when no screenshot
 * has been added yet.
 */
export function ProjectCover({ project, className, priority, sizes }: ProjectCoverProps) {
  if (project.cover) {
    return (
      <Image
        src={project.cover}
        alt={project.title}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
        className={cn("object-cover", className)}
      />
    );
  }

  const hue = hueFor(project.slug);

  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 grid place-items-center", className)}
      style={{
        backgroundImage: `radial-gradient(circle at 25% 15%, hsl(${hue} 85% 72% / 0.85), transparent 55%),
          radial-gradient(circle at 85% 80%, hsl(${hue + 40} 80% 62% / 0.7), transparent 55%),
          linear-gradient(140deg, hsl(${hue} 45% 96%), hsl(${hue + 25} 40% 91%))`,
      }}
    >
      <span
        className="font-display text-6xl font-semibold tracking-tight md:text-7xl"
        style={{ color: `hsl(${hue} 55% 32% / 0.5)` }}
      >
        {monogram(project.title)}
      </span>
    </div>
  );
}
