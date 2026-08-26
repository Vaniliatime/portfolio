/**
 * Flags drawn inline rather than as emoji: Windows ships no flag glyphs, so
 * the emoji fall back to bare letter pairs there.
 */
export function FlagPL({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" aria-hidden className={className}>
      <rect width="24" height="16" rx="2" fill="#fff" />
      <path d="M0 8h24v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8Z" fill="#dc143c" />
      <rect width="24" height="16" rx="2" fill="none" stroke="rgb(0 0 0 / 0.12)" />
    </svg>
  );
}

export function FlagGB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" aria-hidden className={className}>
      <defs>
        <clipPath id="flag-gb-clip">
          <rect width="24" height="16" rx="2" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-gb-clip)">
        <rect width="24" height="16" fill="#012169" />
        {/* Diagonals: white saltire, then the narrower red one on top. */}
        <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="3.2" />
        <path d="M0 0 24 16M24 0 0 16" stroke="#c8102e" strokeWidth="1.6" />
        {/* Upright cross. */}
        <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5.4" />
        <path d="M12 0v16M0 8h24" stroke="#c8102e" strokeWidth="3.2" />
      </g>
      <rect width="24" height="16" rx="2" fill="none" stroke="rgb(0 0 0 / 0.12)" />
    </svg>
  );
}
