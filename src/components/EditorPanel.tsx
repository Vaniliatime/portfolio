/**
 * Drawn stand-in for entries with nothing to screenshot.
 *
 * Deliberately abstract rather than a mock of any real editor: a video track,
 * an audio waveform and a playhead. It illustrates the work without pretending
 * to be a capture of software that is not mine to show.
 */
export function EditorPanel({ label }: { label: string }) {
  // Fixed pseudo-random heights, so the waveform is stable between renders.
  const bars = [
    4, 9, 14, 7, 18, 11, 22, 16, 26, 13, 8, 19, 24, 12, 6, 15, 21, 10, 17, 23,
    9, 5, 13, 20, 25, 11, 7, 16, 12, 8,
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-card">
      <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-2 py-1.5">
        <span aria-hidden className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
        </span>
        <span className="truncate text-[0.55rem] text-ink-faint">{label}</span>
      </div>

      <div className="relative aspect-[16/11] bg-surface-2 p-3">
        {/* Preview pane */}
        <div className="h-1/2 rounded bg-gradient-to-br from-accent/25 via-accent-soft/15 to-transparent" />

        {/* Video track */}
        <div className="mt-2 flex h-3 gap-0.5">
          <span className="w-1/3 rounded-sm bg-accent/50" />
          <span className="w-1/4 rounded-sm bg-accent/35" />
          <span className="flex-1 rounded-sm bg-accent/25" />
        </div>

        {/* Audio waveform */}
        <div className="mt-2 flex h-8 items-center gap-[2px]">
          {bars.map((height, i) => (
            <span
              key={i}
              className="flex-1 rounded-full bg-accent/45"
              style={{ height: `${(height / 26) * 100}%` }}
            />
          ))}
        </div>

        {/* Playhead */}
        <span aria-hidden className="absolute bottom-3 left-[38%] top-[52%] w-px bg-accent">
          <span className="absolute -left-[3px] -top-1 h-1.5 w-1.5 rotate-45 bg-accent" />
        </span>
      </div>
    </div>
  );
}
