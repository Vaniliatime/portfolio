import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  heading?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
  /** Paints the alternate surface behind the section. */
  tinted?: boolean;
}

export function Section({ id, eyebrow, heading, lead, children, className, tinted }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", tinted && "bg-surface-2/60", className)}>
      <div className="shell">
        {(eyebrow || heading || lead) && (
          <Reveal className="mb-10 max-w-2xl md:mb-14">
            {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
            {heading && (
              <h2 className="mt-4 text-3xl font-semibold leading-[1.1] md:text-4xl lg:text-5xl">{heading}</h2>
            )}
            {lead && <p className="mt-4 text-lg leading-relaxed text-ink-muted">{lead}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      <span aria-hidden className="h-px w-6 bg-accent/50" />
      {children}
    </span>
  );
}
