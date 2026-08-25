interface LogoProps {
  className?: string;
  /** Unique per instance: gradients need their own ids on the same page. */
  id?: string;
}

/**
 * Monogram mark: a geometric K whose arms meet the stem as a chevron, so it
 * reads as both an initial and the angle brackets of markup.
 */
export function LogoMark({ className, id = "logo" }: LogoProps) {
  const gradientId = `${id}-gradient`;

  return (
    <svg viewBox="0 0 32 32" role="img" aria-hidden className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a855f7" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${gradientId})`} />
      <g
        stroke="#fff"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M11 8.5 V23.5" />
        <path d="M21.5 8.5 L13.5 16 L21.5 23.5" />
      </g>
    </svg>
  );
}
