"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { t, type Locale } from "@/lib/i18n";
import { groupOf, projectGroups, projects } from "@/content/projects";
import { ui } from "@/content/site";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

type Filter = string;

/**
 * Every project, grouped under its own heading.
 *
 * The filters stay, but they are no longer the only way through: one flat grid
 * of ten cards read as a pile, and most people never touch a filter row. Each
 * group now announces itself, so scrolling alone tells you where the web work
 * ends and the games begin. A heading says what kind of thing this is; whether
 * it was paid for by somebody else is a tag on the card and a chip of its own.
 */
export function WorkGrid({ lang }: { lang: Locale }) {
  const [active, setActive] = useState<Filter>("all");

  // Only offer groups that actually have projects behind them.
  const available = useMemo(
    () =>
      projectGroups
        .map((group) => ({
          ...group,
          items: projects.filter((p) => groupOf(p) === group.id),
        }))
        .filter((group) => group.items.length > 0),
    [],
  );

  /*
   * "Client work" is not a sixth group, it is a cut across all of them: the
   * chip keeps the headings and drops everything I built for myself, which is
   * the one question a paying visitor actually arrives with.
   */
  const clientCount = projects.filter((p) => p.client).length;

  const groups = useMemo(() => {
    if (active === "client") {
      return available
        .map((group) => ({ ...group, items: group.items.filter((p) => p.client) }))
        .filter((group) => group.items.length > 0);
    }

    return available.filter((group) => active === "all" || group.id === active);
  }, [available, active]);

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: t(ui.allWork, lang), count: projects.length },
    ...available.map((group) => ({
      id: group.id,
      label: t(group.label, lang),
      count: group.items.length,
    })),
    { id: "client", label: t(ui.clientWork, lang), count: clientCount },
  ];

  return (
    <div>
      {/*
       * A control rather than a row of words. As plain text on the page
       * background the filters read as a caption under the heading and most
       * people scrolled straight past them, so they sit in a raised track of
       * their own with the counts as chips inside the chips.
       */}
      <div
        role="tablist"
        aria-label={t(ui.allWork, lang)}
        className="inline-flex flex-wrap gap-1 rounded-full border border-line bg-surface p-1.5 shadow-card"
      >
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
                  className="absolute inset-0 rounded-full bg-accent shadow-lift"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {/* Ties the filter to the tag it selects for, which is the only
                    blue on the page. */}
                {chip.id === "client" && (
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                )}
                {chip.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[0.7rem] font-semibold tabular-nums",
                    selected ? "bg-accent-ink/20 text-accent-ink" : "bg-surface-2 text-ink-faint",
                  )}
                >
                  {chip.count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 space-y-16">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`group-${group.id}`}>
            <header className="flex items-center gap-4">
              <h2 id={`group-${group.id}`} className="font-display text-xl font-semibold md:text-2xl">
                {t(group.label, lang)}
              </h2>
              <span className="text-sm font-medium text-ink-faint">{group.items.length}</span>
              {/* Rule to the edge, so the heading reads as a divider between
                  sets rather than as a label floating over the first card. */}
              <span aria-hidden className="h-px flex-1 bg-line" />
            </header>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((project, i) => (
                <motion.div
                  // Keyed by the filter as well, so the cards play their arrival
                  // again when the set changes rather than snapping into place.
                  key={`${active}-${project.slug}`}
                  className="h-full"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard project={project} lang={lang} index={i} />
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
