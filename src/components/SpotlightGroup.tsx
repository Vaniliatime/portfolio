"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Lights the card nearest the pointer.
 *
 * One listener on the group rather than one per card, writing each card's own
 * pointer coordinates and a falloff straight onto the element as CSS
 * variables inside a rAF, so moving the mouse never re-renders React.
 *
 * Cards opt in by carrying the `spotlight` class.
 */
export function SpotlightGroup({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        for (const card of root.querySelectorAll<HTMLElement>(".spotlight")) {
          const box = card.getBoundingClientRect();
          const x = event.clientX - box.left;
          const y = event.clientY - box.top;

          // Distance from the card's edges, so a card lights up as the pointer
          // approaches rather than only once it is inside.
          const gapX = Math.max(box.left - event.clientX, event.clientX - box.right, 0);
          const gapY = Math.max(box.top - event.clientY, event.clientY - box.bottom, 0);
          const distance = Math.hypot(gapX, gapY);
          const strength = Math.max(0, 1 - distance / 260);

          card.style.setProperty("--spot-x", `${x}px`);
          card.style.setProperty("--spot-y", `${y}px`);
          card.style.setProperty("--spot-strength", strength.toFixed(3));
        }
      });
    };

    const onLeave = () => {
      for (const card of root.querySelectorAll<HTMLElement>(".spotlight")) {
        card.style.setProperty("--spot-strength", "0");
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
