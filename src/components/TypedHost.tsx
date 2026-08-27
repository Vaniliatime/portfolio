"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const STEP_MS = 45;

/**
 * The address bar typing itself out, one letter at a time.
 *
 * Runs on mount and again whenever the host changes, which in the hero is every
 * time the carousel moves on. Reduced motion gets the finished address.
 */
export function TypedHost({ host }: { host: string }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(host);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduced) {
      setShown(host);
      setTyping(false);
      return;
    }

    setShown("");
    setTyping(true);

    let letters = 0;
    const timer = setInterval(() => {
      letters += 1;
      setShown(host.slice(0, letters));
      if (letters >= host.length) {
        clearInterval(timer);
        setTyping(false);
      }
    }, STEP_MS);

    return () => clearInterval(timer);
  }, [host, reduced]);

  return (
    <span className="flex min-w-0 items-center truncate">
      {shown}
      {typing && <span aria-hidden className="type-caret" />}
    </span>
  );
}
