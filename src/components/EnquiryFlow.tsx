"use client";

import { useState, type ReactNode } from "react";
import { t, type Locale } from "@/lib/i18n";
import { scopeCopy } from "@/content/scope";
import { SectionEyebrow } from "./Section";
import { ScopeBuilder } from "./ScopeBuilder";
import { ContactForm } from "./ContactForm";

/**
 * The picker and the form as one thing.
 *
 * They were two pages apart, with the enquiry handed over in session storage,
 * which worked but asked somebody to navigate mid-thought. Together, ticking
 * boxes writes the message in the field below and the empty textarea, which is
 * what actually stops people from writing, never has to be faced.
 *
 * The column beside the form is passed in rather than built here: it is static
 * content and belongs on the server.
 */
export function EnquiryFlow({ lang, aside }: { lang: Locale; aside: ReactNode }) {
  const [scope, setScope] = useState<{ subject: string; message: string } | null>(null);

  return (
    <>
      <section className="border-b border-line bg-surface-2/60 py-14 md:py-16">
        <div className="shell">
          <div className="mb-9 max-w-2xl">
            <SectionEyebrow>{t(scopeCopy.eyebrow, lang)}</SectionEyebrow>
            <h2 className="mt-4 font-display text-2xl font-semibold md:text-3xl">
              {t(scopeCopy.heading, lang)}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{t(scopeCopy.lead, lang)}</p>
          </div>

          <ScopeBuilder lang={lang} onCompose={setScope} />
        </div>
      </section>

      <div className="shell py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div id="enquiry-form" className="scroll-mt-28">
            <div className="rounded-2xl border border-line bg-surface p-7 shadow-card md:p-9">
              <ContactForm lang={lang} scope={scope} />
            </div>
          </div>

          {aside}
        </div>
      </div>
    </>
  );
}
