"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

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
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label={label}
          title={label}
          onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.5, y: 16 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.5, y: 16 }}
          transition={
            reduced ? { duration: 0.15 } : { type: "spring", stiffness: 430, damping: 26 }
          }
          whileHover={reduced ? undefined : { y: -4, scale: 1.06 }}
          whileTap={reduced ? undefined : { scale: 0.92 }}
          className="group fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-ink shadow-[0_2px_6px_rgb(124_58_237/0.35),0_14px_30px_-10px_rgb(124_58_237/0.6)] hover:bg-accent-hover"
        >
          {/* Halo that keeps pulsing, so the button reads as live. */}
          {!reduced && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-accent"
              animate={{ scale: [1, 1.35], opacity: [0.45, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut" }}
            />
          )}

          <motion.span
            aria-hidden
            className="relative"
            animate={reduced ? undefined : { y: [0, -3, 0] }}
            transition={reduced ? undefined : { duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
