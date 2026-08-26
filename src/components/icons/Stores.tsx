/** Store glyphs. Lucide carries no brand marks, so both are drawn here. */
export function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M16.36 12.78c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.42-.14-2.76.83-3.48.83-.72 0-1.82-.81-2.99-.79-1.54.02-2.96.9-3.75 2.27-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.75 2.97-.75 1.39 0 1.78.75 2.99.72 1.24-.02 2.02-1.12 2.78-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.67ZM14.1 5.9c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.67 1.37-.58.68-1.09 1.77-.95 2.81 1.02.08 2.05-.52 2.68-1.28Z" />
    </svg>
  );
}

export function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M3.6 2.4a1 1 0 0 0-.35.76v17.68a1 1 0 0 0 .35.76l.1.06 9.9-9.9v-.23l-9.9-9.9-.1.07Zm10.72 6.6L4.9 3.2l8.9 8.9 2.5-2.5-1.98-1.13Zm3.3 1.88-2.6 1.48 2.6 1.48 2.85-1.63a.86.86 0 0 0 0-1.5l-2.85-1.63v1.8Zm-2.6 3.6-2.5-2.5-8.9 8.9 9.42-5.8 1.98-1.13Z" />
    </svg>
  );
}
