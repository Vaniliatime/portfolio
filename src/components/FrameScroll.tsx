import Image from "next/image";
import type { CSSProperties } from "react";
import type { TallCover } from "@/content/projects";

/** Longest travel, in frame-heights, whatever the page's own length. */
const MAX_TRAVEL_FRAMES = 3.5;
/** Frame-heights per second. One speed for every page, short or long. */
const SPEED = 0.25;
/**
 * Share of the run spent still, at the top and again at the foot. Matches the
 * CSS keyframe. The rest at the bottom is deliberate: the page comes to a stop
 * and stays stopped for a moment before anything else happens.
 */
const HOLDS = 0.2;
/** How long a page with nothing to scroll stays up. */
const STILL_SECONDS = 6;

export interface ScrollPlan {
  /** Share of the picture's own height it travels, as a percentage. */
  travel: number;
  /** How long that takes, top hold included. */
  seconds: number;
}

/**
 * How far a capture scrolls and how long it takes.
 *
 * Lives next to the animation so the carousel's timer and the movement itself
 * cannot disagree: the showcase holds a project for this long plus a beat, so a
 * short page moves on quickly and a long one gets the time it needs.
 */
export function scrollPlan(cover: TallCover | undefined, ratio: number): ScrollPlan {
  if (!cover) return { travel: 0, seconds: STILL_SECONDS };

  /*
   * Measured in frame-heights so the speed does not depend on how long the page
   * happens to be. Without the cap the wedding invitation, six screens tall,
   * went past at twice the pace of the others.
   */
  const framesTall = cover.height / cover.width / ratio;
  const travelFrames = Math.min(Math.max(0, framesTall - 1), MAX_TRAVEL_FRAMES);

  if (travelFrames < 0.05) return { travel: 0, seconds: STILL_SECONDS };

  return {
    travel: (travelFrames / framesTall) * 100,
    seconds: travelFrames / SPEED / (1 - HOLDS),
  };
}

interface FrameScrollProps {
  cover: TallCover;
  alt: string;
  plan: ScrollPlan;
  priority?: boolean;
}

/**
 * A full-page capture scrolled through inside the browser frame.
 *
 * The picture is laid out at its natural height and travels up by exactly the
 * part of itself that hangs out of the frame, so it stops with its own bottom
 * on the frame's bottom rather than at some guessed offset.
 *
 * A CSS keyframe, deliberately, not a motion animation: motion's AnimatePresence
 * passes initial={false} down through context and it wins over the child's own
 * prop, so the first slide skipped straight to the last keyframe and sat there
 * showing the foot of the page. A CSS animation always starts where it says.
 */
export function FrameScroll({ cover, alt, plan, priority }: FrameScrollProps) {
  /*
   * Some captures are barely taller than the frame, because the page itself
   * fits on one screen. Laid out at their natural height those leave a strip of
   * empty card under them, so they fill the frame instead and simply hold
   * still: there is nothing to scroll to.
   */
  if (plan.travel < 2) {
    return (
      <Image
        src={cover.src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1920px) 620px, (min-width: 1024px) 480px, 90vw"
        className="object-cover object-top"
      />
    );
  }

  return (
    <div
      className="page-scroll absolute inset-x-0 top-0"
      style={
        {
          "--scroll-travel": `-${plan.travel.toFixed(2)}%`,
          "--scroll-duration": `${plan.seconds.toFixed(2)}s`,
        } as CSSProperties
      }
    >
      <Image
        src={cover.src}
        alt={alt}
        width={cover.width}
        height={cover.height}
        priority={priority}
        sizes="(min-width: 1920px) 620px, (min-width: 1024px) 480px, 90vw"
        className="h-auto w-full"
      />
    </div>
  );
}
