"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Page-wide cursor light.
 *
 * Every layer is fixed to the viewport, so the dot lattice, the violet pool
 * and the emboss stay aligned no matter how far the page is scrolled, and the
 * effect works on every route rather than only the hero.
 *
 * Pointer position goes straight onto the root element as CSS variables inside
 * a rAF, so moving the mouse never re-renders React.
 */
export function CursorLight() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const root = document.documentElement;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${event.clientX}px`);
        root.style.setProperty("--my", `${event.clientY}px`);
        root.style.setProperty("--spot", "1");
      });
    };

    const onLeave = () => root.style.setProperty("--spot", "0");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div aria-hidden className="cursor-light">
      <div className="cursor-light__dots" />
      <div className="cursor-light__blob" />
      <div className="cursor-light__emboss" />
    </div>
  );
}
