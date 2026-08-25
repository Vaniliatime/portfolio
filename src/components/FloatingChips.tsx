"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Skill chips parked around the portrait, each drifting on its own slow loop
 * so they read as floating rather than pinned. Hidden below lg, where the
 * column is too narrow to hold them clear of the frame; the hero renders a
 * plain row underneath at those sizes instead.
 */
const spots = [
  "left-0 top-10 -translate-x-1/3",
  "right-0 top-1/3 translate-x-1/3",
  "left-0 bottom-1/4 -translate-x-1/4",
  "right-1 bottom-8 translate-x-1/3",
  "left-1/4 -top-5",
];

/** Distinct drift timings, so the chips never bob in unison. */
const drift = [
  { y: [0, -9, 0], duration: 5.2 },
  { y: [0, 8, 0], duration: 6.1 },
  { y: [0, -7, 0], duration: 5.8 },
  { y: [0, 9, 0], duration: 6.6 },
  { y: [0, -6, 0], duration: 4.9 },
];

export function FloatingChips({ badges }: { badges: string[] }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {badges.slice(0, spots.length).map((badge, i) => (
        <motion.span
          key={badge}
          initial={reduced ? undefined : { opacity: 0, scale: 0.85 }}
          animate={
            reduced
              ? undefined
              : { opacity: 1, scale: 1, y: drift[i].y }
          }
          transition={
            reduced
              ? undefined
              : {
                  opacity: { duration: 0.45, delay: 0.6 + i * 0.1 },
                  scale: { duration: 0.45, delay: 0.6 + i * 0.1 },
                  y: {
                    duration: drift[i].duration,
                    delay: 0.6 + i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
          className={cn(
            "absolute whitespace-nowrap rounded-full border border-line bg-surface/95 px-3 py-1.5 text-xs font-medium text-ink shadow-card backdrop-blur",
            spots[i],
          )}
        >
          {badge}
        </motion.span>
      ))}
    </div>
  );
}
