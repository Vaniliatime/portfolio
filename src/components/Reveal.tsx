"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger helper, multiplied by 70ms. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "ul" | "section" | "article" | "span";
}

/**
 * Fades content up as it scrolls into view. Falls back to a plain wrapper
 * when the visitor has asked for reduced motion.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      // Fires a little before the element reaches the fold, so the motion is
      // already under way by the time it is properly in view.
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.65, delay: delay * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
