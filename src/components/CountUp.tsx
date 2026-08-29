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
  /** Hold off so the count does not finish while the page is still settling. */
  delay?: number;
}

/**
 * Counts from zero up to the value the first time it scrolls into view.
 *
 * The final number is what gets rendered on the server, so the static HTML a
 * crawler or a JS-less visitor sees is correct rather than a row of zeroes.
 * The client resets it to zero in a layout effect, before the browser paints,
 * so the handover is invisible. Reduced motion keeps the number still.
 */
export function CountUp({ value, suffix = "", className, duration = 2.4, delay = 0.9 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  /*
   * Bottom edge only. Shrinking the viewport from every side asks the number to
   * be 80px inside a screen that, on a phone, is barely wider than the row it
   * sits in, and the count never started.
   */
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useIsomorphicLayoutEffect(() => {
    if (!reduced) setDisplay(0);
  }, [reduced]);

  useEffect(() => {
    if (!inView || reduced) return;

    const controls = animate(0, value, {
      duration,
      delay,
      // Slow, decelerating finish, so the last digits are the ones you notice.
      ease: [0.12, 0.7, 0.15, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, duration, delay, reduced]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
