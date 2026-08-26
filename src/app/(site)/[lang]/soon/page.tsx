import type { Metadata } from "next";
import { ArrowLeft, Hammer } from "lucide-react";
import { localePath, locales, t, toLocale } from "@/lib/i18n";
import { ui } from "@/content/site";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const copy = {
  eyebrow: { en: "In progress", pl: "W budowie" },
  title: { en: "This one is still being built", pl: "To jeszcze powstaje" },
  body: {
    en: "The mobile apps are in development and are not on the stores yet. The web version is live in the meantime, and the case study covers what is already working.",
    pl: "Aplikacje mobilne są w budowie i nie ma ich jeszcze w sklepach. W międzyczasie działa wersja webowa, a case study opisuje to, co już jest gotowe.",
  },
  back: { en: "Back to the work", pl: "Wróć do projektów" },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return {
    title: copy.eyebrow[lang],
    description: copy.body[lang],
    // A placeholder has no business in search results.
    robots: { index: false, follow: true },
  };
}

export default async function SoonPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLocale((await params).lang);

  return (
    <section className="relative overflow-hidden">
      <div className="shell relative z-10 py-24 md:py-32">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent-wash text-accent">
            <Hammer className="h-6 w-6" />
          </span>

          <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {copy.eyebrow[lang]}
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
            {copy.title[lang]}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{copy.body[lang]}</p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href={localePath(lang, "work")}>
              <ArrowLeft className="h-4 w-4" />
              {copy.back[lang]}
            </ButtonLink>
            <ButtonLink href={localePath(lang, "contact")} variant="secondary">
              {t(ui.contactMe, lang)}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
