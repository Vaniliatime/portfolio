"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const HOLD_MS = 6000;
const FADE_MS = 1100;
const MAX_DOTS = 5;

interface CardSlideshowProps {
  images: string[];
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
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
export function CardSlideshow({ images, alt, sizes, priority, className }: CardSlideshowProps) {
  const frames = images;
  const ref = useRef<HTMLDivElement>(null);
  // No head start: the card has to be properly in view, not merely approaching.
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const reduced = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);

  useEffect(() => {
    if (reduced || frames.length < 2 || !inView) return;

    const timer = setInterval(() => {
      setIndex((current) => {
        setPrevious(current);
        return (current + 1) % frames.length;
      });
    }, HOLD_MS);

    return () => clearInterval(timer);
  }, [frames.length, inView, reduced]);

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

      {/* Dots read well up to a handful. Past that they turn into a cluttered
          row, so a long gallery gets a count instead. */}
      {frames.length > 1 && frames.length <= MAX_DOTS && (
        <span className="absolute bottom-3 left-4 z-10 flex gap-1.5">
          {frames.map((src, i) => (
            <span
              key={src}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/50",
              )}
            />
          ))}
        </span>
      )}

      {frames.length > MAX_DOTS && (
        <span className="absolute bottom-3 left-4 z-10 rounded-full bg-ink/70 px-2 py-0.5 text-[0.65rem] font-medium tabular-nums text-paper">
          {index + 1} / {frames.length}
        </span>
      )}
    </div>
  );
}
