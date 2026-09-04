"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";

const HOLD_MS = 6000;
const FADE_MS = 1100;
/** Gap between neighbouring cards, so a row turns over as a wave. */
const STAGGER_MS = 1000;
/*
 * A phone shows one card at a time and you scroll past it in a couple of
 * seconds. Waiting a full hold plus a stagger meant the first change never
 * arrived before the card left the screen and reset itself, so on a phone the
 * pictures looked frozen. There the first turn is quick and the queue behind
 * the other cards does not apply, because no other card is on screen.
 */
const TOUCH_FIRST_MS = 1400;
const TOUCH_HOLD_MS = 3200;
/** Movement past this, and across rather than down, counts as a swipe. */
const SWIPE_PX = 40;

interface CardSlideshowProps {
  images: string[];
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Position in the grid. Offsets this card's turn against its neighbours. */
  offset?: number;
  /** Where a tap on the picture should go, on a device that cannot hover. */
  href?: string;
}

/**
 * Cross-fades through a project's screenshots while the card is on screen.
 *
 * The incoming frame fades in over the outgoing one, which stays fully opaque
 * underneath until the fade finishes. Fading both at once looked like a jump:
 * halfway through, neither is opaque and the card's own background shows
 * through as a flash.
 *
 * The loop starts when the card is scrolled to, not before, and rewinds to the
 * cover once it leaves, so every arrival begins on the same frame.
 *
 * Only the outgoing and incoming frames are ever in the DOM, so a full gallery
 * costs one image per card up front and the rest arrive one at a time as the
 * loop reaches them.
 */
export function CardSlideshow({
  images,
  alt,
  sizes,
  priority,
  className,
  offset = 0,
  href,
}: CardSlideshowProps) {
  const frames = images;
  const ref = useRef<HTMLDivElement>(null);
  // No head start: the card has to be properly in view, not merely approaching.
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const reduced = useReducedMotion();
  const touch = useMediaQuery("(hover: none)");

  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);

  useEffect(() => {
    if (reduced || frames.length < 2 || !inView) return;

    const advance = () =>
      setIndex((current) => {
        setPrevious(current);
        return (current + 1) % frames.length;
      });

    // On a pointer device the first turn waits a full hold plus this card's
    // share of the stagger, so a row of cards turns over as a wave rather than
    // in unison. On a phone there is no row to stagger against.
    const firstDelay = touch ? TOUCH_FIRST_MS : HOLD_MS + offset * STAGGER_MS;
    const hold = touch ? TOUCH_HOLD_MS : HOLD_MS;

    let interval: ReturnType<typeof setInterval> | undefined;
    const first = setTimeout(() => {
      advance();
      interval = setInterval(advance, hold);
    }, firstDelay);

    return () => {
      clearTimeout(first);
      if (interval) clearInterval(interval);
    };
  }, [frames.length, inView, reduced, offset, touch]);

  // Back to the cover whenever the card leaves the screen, so arriving at it
  // always starts on the shot the project leads with rather than wherever the
  // loop happened to stop.
  useEffect(() => {
    if (inView) return;
    setIndex(0);
    setPrevious(null);
  }, [inView]);

  // Drop the outgoing frame once it is fully covered, so only two images are
  // ever in the DOM at a time.
  useEffect(() => {
    if (previous === null) return;
    const timer = setTimeout(() => setPrevious(null), FADE_MS);
    return () => clearTimeout(timer);
  }, [previous, index]);

  /** Manual pick from the dots or a swipe. Cross-fades like the timer does. */
  const select = (next: number) => {
    if (next === index) return;
    setPrevious(index);
    setIndex(next);
  };

  const step = (delta: number) => select((index + delta + frames.length) % frames.length);

  /*
   * Swiping, on touch devices only.
   *
   * The whole card is a link, and its overlay sits above the picture, so a
   * finger never reaches the images underneath. This layer goes over the top,
   * but only where there is no pointer to hover with, and it has to carry the
   * tap through itself: a picture you cannot tap to open would be a worse card
   * than one you cannot swipe.
   */
  const router = useRouter();
  const start = useRef<{ x: number; y: number; at: number } | null>(null);

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    const point = event.touches[0];
    start.current = { x: point.clientX, y: point.clientY, at: Date.now() };
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const from = start.current;
    const point = event.changedTouches[0];
    start.current = null;
    if (!from || !point) return;

    const dx = point.clientX - from.x;
    const dy = point.clientY - from.y;

    // Across rather than down, or the page is being scrolled, not swiped.
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) {
      step(dx < 0 ? 1 : -1);
      return;
    }

    // A tap that went nowhere opens the project, the way the picture would if
    // this layer were not in the way.
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10 && Date.now() - from.at < 500 && href) {
      router.push(href);
    }
  };

  const frame = (i: number, layer: "under" | "over") => (
    <Image
      // Keyed by index so React mounts a fresh element per change, which is
      // what starts the fade-in animation.
      key={`${layer}-${i}`}
      src={frames[i]}
      alt={i === 0 ? alt : ""}
      fill
      priority={priority && i === 0}
      sizes={sizes}
      className={cn(
        "object-cover object-top transition-transform duration-500",
        layer === "over" && previous !== null && "slide-fade",
        className,
      )}
    />
  );

  return (
    <div ref={ref} className="absolute inset-0">
      {previous !== null && frame(previous, "under")}
      {frame(index, "over")}

      {/*
       * The next picture, fetched and decoded while the current one is still
       * up. Without this the incoming frame fades in before the browser has
       * anything to paint, and the card's own background shows through as a
       * flash. It is worst on the largest screenshots, which are exactly the
       * ones worth showing.
       */}
      {frames.length > 1 && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={frames[(index + 1) % frames.length]}
          alt=""
          aria-hidden
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />
      )}

      {frames.length > 1 && (
        <span
          aria-hidden
          className="swipe-layer absolute inset-0 z-[5]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
      )}

      {/*
       * Dots on a dark pill: bare dots vanished against the paler screenshots,
       * and the pill gives them one background to read on whatever is behind.
       */}
      {frames.length > 1 && (
        <span className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink/55 px-2 py-1.5">
          {frames.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`${alt} ${i + 1}`}
              aria-current={i === index}
              /* The whole card is a link, so the dot has to claim the click
                 before it turns into navigation. */
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                select(i);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === index ? "w-4 bg-accent-soft" : "w-1.5 bg-paper/45 hover:bg-paper/80",
              )}
            />
          ))}
        </span>
      )}

    </div>
  );
}
