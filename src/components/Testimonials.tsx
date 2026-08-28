import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { testimonials } from "@/content/testimonials";
import { getProject } from "@/content/projects";
import { ui } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

/**
 * Client quotes, each one traceable back to a real business.
 *
 * Nothing renders until there are real ones: an empty testimonial section is
 * better than a filled one nobody said.
 */
export function Testimonials({ lang }: { lang: Locale }) {
  if (testimonials.length === 0) return null;

  return (
    <Section
      eyebrow={t(ui.testimonialsEyebrow, lang)}
      heading={t(ui.testimonialsHeading, lang)}
      lead={t(ui.testimonialsNote, lang)}
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {testimonials.map((item, i) => {
          const project = item.projectSlug ? getProject(item.projectSlug) : undefined;

          return (
            <Reveal key={item.name} delay={i} as="li">
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7 shadow-card">
                <Quote aria-hidden className="h-5 w-5 text-accent/50" />
                <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed">
                  {t(item.quote, lang)}
                </blockquote>

                <figcaption className="mt-6 border-t border-line pt-5 text-sm">
                  <span className="font-semibold">{item.name}</span>
                  <span className="mt-0.5 block text-ink-muted">{t(item.role, lang)}</span>

                  {project && (
                    <Link
                      href={localePath(lang, `work/${project.slug}`)}
                      className="mt-2.5 inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
                    >
                      {project.title}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
