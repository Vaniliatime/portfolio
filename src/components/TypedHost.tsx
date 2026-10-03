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

  /*
   * A block, not a flex row. A flex row with no text in it is only as tall as
   * the caret, so for the first beat of every address the bar lost a few
   * pixels and the frame, caption and dashes all hopped up and back down. A
   * block keeps a full line's height whether there is text in it or not.
   */
  return (
    <span className="block min-w-0 truncate">
      {shown}
      {typing && <span aria-hidden className="type-caret" />}
    </span>
  );
}
