"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** Appears once the page has scrolled, and returns to the top smoothly. */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      // Hidden from the tab order while off screen, so it is not a stop on
      // the way through the page.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
      }
      className={cn(
        "fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink-muted shadow-card transition-all duration-300",
        "hover:border-accent/50 hover:bg-accent hover:text-accent-ink hover:shadow-lift",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
