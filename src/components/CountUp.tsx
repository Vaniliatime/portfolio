"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** useLayoutEffect warns during SSR, where there is nothing to lay out anyway. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

interface CountUpProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

/**
 * Counts from zero up to the value the first time it scrolls into view.
 *
 * The final number is what gets rendered on the server, so the static HTML a
 * crawler or a JS-less visitor sees is correct rather than a row of zeroes.
 * The client resets it to zero in a layout effect, before the browser paints,
 * so the handover is invisible. Reduced motion keeps the number still.
 */
export function CountUp({ value, suffix = "", className, duration = 1.4 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useIsomorphicLayoutEffect(() => {
    if (!reduced) setDisplay(0);
  }, [reduced]);

  useEffect(() => {
    if (!inView || reduced) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
