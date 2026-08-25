"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";

/**
 * Skill chips parked around the portrait.
 *
 * The drift is a CSS keyframe on an inner span while the entrance fade is a
 * motion transform on the outer one. Splitting them across two elements is
 * what keeps it smooth: both animate `transform`, and running them on the
 * same node made JavaScript overwrite the CSS transform every frame.
 *
 * Only floats from lg up, where the column is wide enough to keep the chips
 * clear of the frame. The hero renders a plain row underneath below that.
 */
interface Spot {
  style: CSSProperties;
  distance: string;
  duration: string;
}

const spots: Spot[] = [
  { style: { left: "-14%", top: "10%" }, distance: "-11px", duration: "5.4s" },
  { style: { right: "-15%", top: "32%" }, distance: "10px", duration: "6.3s" },
  { style: { left: "-10%", bottom: "26%" }, distance: "-9px", duration: "5.9s" },
  { style: { right: "-7%", bottom: "9%" }, distance: "12px", duration: "6.8s" },
  { style: { left: "26%", top: "-7%" }, distance: "-8px", duration: "5.1s" },
];

export function FloatingChips({ badges }: { badges: string[] }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {badges.slice(0, spots.length).map((badge, i) => {
        const spot = spots[i];

        return (
          <motion.span
            key={badge}
            style={{ position: "absolute", ...spot.style }}
            initial={reduced ? undefined : { opacity: 0, scale: 0.85 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={reduced ? undefined : { duration: 0.5, delay: 0.6 + i * 0.1 }}
          >
            <span
              className="chip-float block whitespace-nowrap rounded-full border border-line bg-surface/95 px-3 py-1.5 text-xs font-medium text-ink shadow-card backdrop-blur"
              style={
                {
                  "--float-distance": spot.distance,
                  "--float-duration": spot.duration,
                  "--float-delay": `${i * 0.4}s`,
                } as CSSProperties
              }
            >
              {badge}
            </span>
          </motion.span>
        );
      })}
    </div>
  );
}
