interface LogoProps {
  className?: string;
  /** Unique per instance: gradients need their own ids on the same page. */
  id?: string;
}

/**
 * KK monogram.
 *
 * Two K forms mirrored across the centre, so their arms run at each other and
 * close into a symmetrical mark. Reads as the initials without being a plain
 * pair of letters, and the converging arms keep the nod to angle brackets.
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

      <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Left K */}
        <path d="M8.5 8 V24" />
        <path d="M15 9.5 L8.5 16 L15 22.5" />

        {/* Right K, mirrored */}
        <g opacity="0.72">
          <path d="M23.5 8 V24" />
          <path d="M17 9.5 L23.5 16 L17 22.5" />
        </g>
      </g>
    </svg>
  );
}
