import type { Metadata } from "next";
import { locales, t, toLocale } from "@/lib/i18n";
import { ui } from "@/content/site";
import { WorkGrid } from "@/components/WorkGrid";
import { ContactCta } from "@/components/ContactCta";
import { SectionEyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const copy = {
  heading: {
    en: "Everything I have built",
    pl: "Wszystko, co zbudowałem",
  },
  lead: {
    en: "Client sites, my own products, games from the Unity years, illustration and hardware. Filter it down to whatever you came for.",
    pl: "Strony dla klientów, moje własne produkty, gry z czasów Unity, ilustracja i sprzęt. Odfiltruj to, po co przyszedłeś.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return { title: t(ui.allWork, lang), description: copy.lead[lang] };
}

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLocale((await params).lang);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="aurora opacity-60" />
        <div className="shell relative z-10 py-16 md:py-24">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t(ui.featured, lang)}</SectionEyebrow>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] md:text-6xl">
              {copy.heading[lang]}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{copy.lead[lang]}</p>
          </Reveal>
        </div>
      </section>

      <div className="shell py-14 md:py-20">
        <WorkGrid lang={lang} />
      </div>

      <ContactCta lang={lang} />
    </>
  );
}
