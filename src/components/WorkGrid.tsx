"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { t, type Locale } from "@/lib/i18n";
import { categories, projects, type Category } from "@/content/projects";
import { ui } from "@/content/site";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

type Filter = Category | "all";

export function WorkGrid({ lang }: { lang: Locale }) {
  const [active, setActive] = useState<Filter>("all");

  // Only offer filters that actually have projects behind them.
  const available = useMemo(
    () => categories.filter((cat) => projects.some((p) => p.category === cat.id)),
    [],
  );

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: t(ui.allWork, lang), count: projects.length },
    ...available.map((cat) => ({
      id: cat.id as Filter,
      label: t(cat.label, lang),
      count: projects.filter((p) => p.category === cat.id).length,
    })),
  ];

  return (
    <div>
      <div role="tablist" aria-label={t(ui.allWork, lang)} className="flex flex-wrap gap-2">
        {chips.map((chip) => {
          const selected = chip.id === active;
          return (
            <button
              key={chip.id}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setActive(chip.id)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                selected ? "text-accent-ink" : "text-ink-muted hover:bg-surface-2 hover:text-ink",
              )}
            >
              {selected && (
                <motion.span
                  layoutId="work-filter-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">
                {chip.label}
                <span className={cn("ml-1.5 text-xs", selected ? "opacity-70" : "text-ink-faint")}>{chip.count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              // Full height, so the card can stretch to match its row.
              className="h-full"
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} lang={lang} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
