"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const HOLD_MS = 6000;
const FADE_MS = 1100;
const MAX_FRAMES = 3;

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
 * Frames mount only once first shown and the timer runs only while the card is
 * in view, so scrolling past a grid still costs one image per card.
 */
export function CardSlideshow({ images, alt, sizes, priority, className }: CardSlideshowProps) {
  const frames = images.slice(0, MAX_FRAMES);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });
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

      {frames.length > 1 && (
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
    </div>
  );
}
