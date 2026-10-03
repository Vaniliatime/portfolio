"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ResumeNavProps {
  sections: { id: string; label: string }[];
  label: string;
}

/**
 * Section jump list for the résumé.
 *
 * A row of pills on narrow screens, where there is no room beside the content.
 * From lg up it becomes a column on the left that stays put while the page
 * scrolls, and marks the section being read, so the list doubles as a sense of
 * where you are in a long page.
 */
export function ResumeNav({ sections, label }: ResumeNavProps) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    let frame = 0;

    // The current section is the last one whose top has passed a line a third
    // of the way down the screen. An observer per section kept losing track of
    // the short ones (languages) that never fill enough of the viewport.
    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      let current = sections[0]?.id;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= line) current = section.id;
      }

      // At the foot of the page the last sections cannot scroll up to the
      // line, so the bottom of the page counts as reaching the last one.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1]?.id;
      }

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <nav aria-label={label} className="lg:sticky lg:top-28">
      <ul className="flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:gap-0 lg:border-l lg:border-line">
        {sections.map((section) => {
          const current = section.id === active;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "block rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  "lg:-ml-px lg:rounded-none lg:border-0 lg:border-l-2 lg:py-2 lg:pl-4",
                  current
                    ? "border-accent/50 bg-accent-wash text-accent lg:border-accent lg:bg-transparent"
                    : "border-line bg-surface text-ink-muted hover:border-accent/50 hover:bg-accent-wash hover:text-accent lg:border-transparent lg:bg-transparent lg:hover:border-accent/40 lg:hover:bg-transparent",
                )}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
