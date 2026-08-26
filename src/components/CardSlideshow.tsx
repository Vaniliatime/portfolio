"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const HOLD_MS = 6000;
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
 * Frames are mounted only once they are first shown, and the timer runs only
 * while the card is in view, so scrolling past a grid still costs one image
 * per card. Lingering on it costs at most three.
 */
export function CardSlideshow({ images, alt, sizes, priority, className }: CardSlideshowProps) {
  const frames = images.slice(0, MAX_FRAMES);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  const reduced = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState<number[]>([0]);

  useEffect(() => {
    if (reduced || frames.length < 2 || !inView) return;

    const timer = setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % frames.length;
        setMounted((loaded) => (loaded.includes(next) ? loaded : [...loaded, next]));
        return next;
      });
    }, HOLD_MS);

    return () => clearInterval(timer);
  }, [frames.length, inView, reduced]);

  return (
    <div ref={ref} className="absolute inset-0">
      {frames.map((src, i) =>
        mounted.includes(i) ? (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? alt : ""}
            fill
            priority={priority && i === 0}
            sizes={sizes}
            className={cn(
              "object-cover object-top transition-opacity duration-1000",
              i === index ? "opacity-100" : "opacity-0",
              className,
            )}
          />
        ) : null,
      )}

      {frames.length > 1 && (
        <span className="absolute bottom-3 left-4 flex gap-1.5">
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
