import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./Section";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}

/** Shared masthead for every non-home page. */
export function PageHeader({ eyebrow, title, lead, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="shell relative z-10 py-14 md:py-20">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {lead && <p className="mt-5 text-lg leading-relaxed text-ink-muted">{lead}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
