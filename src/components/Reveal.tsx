"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger helper, multiplied by 60ms. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: delay * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
