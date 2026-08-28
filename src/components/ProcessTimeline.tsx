"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { t, type Locale } from "@/lib/i18n";
import { process } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The four steps as a line that draws itself while you read down it.
 *
 * Four equal boxes in a grid said "list of features" and nobody read past the
 * first. A single rail says these things happen in an order, which is the whole
 * point of describing a process. The line is one scaleY on one element, and the
 * steps light up from an intersection observer rather than from scroll maths,
 * so nothing is recomputed per frame.
 */
export function ProcessTimeline({ lang }: { lang: Locale }) {
  const reduced = useReducedMotion();
  const railRef = useRef<HTMLOListElement>(null);

  /*
   * Starts drawing when the list is well into view and finishes before its foot
   * leaves, so the line is full by the time the last step is being read rather
   * than only once it has been scrolled past.
   */
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 65%"],
  });

  const drawn = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const scaleY = useTransform(drawn, (v) => (reduced ? 1 : v));

  return (
    <ol ref={railRef} className="relative space-y-8 pl-14 sm:pl-20">
      {/* The rail: a pale track with the drawn line on top of it. */}
      <span
        aria-hidden
        className="absolute bottom-8 left-[1.4375rem] top-4 w-px bg-line sm:left-[2.1875rem]"
      >
        <motion.span
          className="absolute inset-0 block origin-top bg-accent"
          style={{ scaleY }}
        />
      </span>

      {process.map((item, i) => (
        <Step key={item.step} step={item.step} index={i} lang={lang}>
          {item}
        </Step>
      ))}
    </ol>
  );
}

function Step({
  step,
  index,
  lang,
  children,
}: {
  step: string;
  index: number;
  lang: Locale;
  children: (typeof process)[number];
}) {
  const ref = useRef<HTMLLIElement>(null);
  // Halfway up the screen: the step lights as it reaches reading height, which
  // is roughly where the drawn line has got to as well.
  const inView = useInView(ref, { once: true, margin: "-45% 0px -45% 0px" });

  return (
    <li ref={ref} className="relative">
      {/* The node sits on the rail, so it needs the same offset back out. */}
      <span
        aria-hidden
        className={cn(
          "absolute -left-14 top-0 grid h-12 w-12 place-items-center rounded-full border font-display text-sm font-semibold transition-colors duration-500 sm:-left-20 sm:h-[4.375rem] sm:w-[4.375rem] sm:text-base",
          inView
            ? "border-accent bg-accent text-accent-ink"
            : "border-line bg-surface text-ink-faint",
        )}
      >
        {step}
      </span>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "rounded-2xl border bg-surface p-6 shadow-card transition-colors duration-500 md:p-7",
          inView ? "border-accent/25" : "border-line",
        )}
      >
        <h3 className="text-lg font-semibold">{t(children.title, lang)}</h3>
        <p className="mt-2 leading-relaxed text-ink-muted">{t(children.body, lang)}</p>
      </motion.div>

      {/* Keeps the numbering meaningful to a screen reader, which cannot see
          the rail or the node. */}
      <span className="sr-only">{index + 1}</span>
    </li>
  );
}
