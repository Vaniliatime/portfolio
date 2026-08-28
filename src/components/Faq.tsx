import { Plus } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { faq } from "@/content/faq";
import { Reveal } from "./Reveal";

/**
 * The questions people would rather not have to ask.
 *
 * Native details elements: they open without JavaScript, they are searchable in
 * the page, and a browser's own find function reaches inside them.
 */
export function Faq({ lang }: { lang: Locale }) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
      {faq.map((item, i) => (
        <Reveal key={item.question.en} delay={i} as="li">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-start gap-4 px-6 py-5 text-left font-medium transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
              <span className="flex-1">{t(item.question, lang)}</span>
              <span
                aria-hidden
                className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line-strong text-ink-faint transition-transform duration-300 group-open:rotate-45 group-open:border-accent/40 group-open:text-accent"
              >
                <Plus className="h-3.5 w-3.5" />
              </span>
            </summary>
            <p className="px-6 pb-6 pr-16 leading-relaxed text-ink-muted">{t(item.answer, lang)}</p>
          </details>
        </Reveal>
      ))}
    </ul>
  );
}
