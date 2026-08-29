"use client";

import { useEffect, useState } from "react";

/**
 * Tracks a media query from React.
 *
 * Starts false so the server and the first client render agree, which means
 * anything gated on it has to be safe in its off state: the pointer-device
 * behaviour is the default, and touch is the adjustment.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const update = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);

  return matches;
}
