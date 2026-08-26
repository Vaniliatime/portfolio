import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Lock, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  host: string;
  children: ReactNode;
  className?: string;
  /** Thumbnail size: drops the nav arrows, which turn to mush when small. */
  compact?: boolean;
}

/** Browser chrome around a screenshot, shared by the hero and the resume. */
export function BrowserFrame({ host, children, className, compact }: BrowserFrameProps) {
  return (
    <div className={cn("overflow-hidden bg-surface", className)}>
      <div
        className={cn(
          "flex items-center border-b border-line bg-surface-2",
          compact ? "gap-1.5 px-2 py-1.5" : "gap-2.5 px-3 py-2.5",
        )}
      >
        <span aria-hidden className={cn("flex", compact ? "gap-1" : "gap-1.5")}>
          <span className={cn("rounded-full bg-red-400/80", compact ? "h-1.5 w-1.5" : "h-2.5 w-2.5")} />
          <span className={cn("rounded-full bg-amber-400/80", compact ? "h-1.5 w-1.5" : "h-2.5 w-2.5")} />
          <span className={cn("rounded-full bg-emerald-400/80", compact ? "h-1.5 w-1.5" : "h-2.5 w-2.5")} />
        </span>

        {!compact && (
          <span aria-hidden className="flex items-center gap-1 text-ink-faint">
            <ChevronLeft className="h-3.5 w-3.5" />
            <ChevronRight className="h-3.5 w-3.5" />
            <RotateCw className="ml-0.5 h-3 w-3" />
          </span>
        )}

        <span
          className={cn(
            "flex min-w-0 flex-1 items-center rounded-md border border-line bg-surface text-ink-faint",
            compact ? "gap-1 px-1.5 py-0.5 text-[0.55rem]" : "gap-1.5 px-2.5 py-1 text-[0.7rem]",
          )}
        >
          <Lock className={cn("shrink-0 text-emerald-500", compact ? "h-2 w-2" : "h-2.5 w-2.5")} />
          <span className="truncate">{host}</span>
        </span>
      </div>

      {children}
    </div>
  );
}
