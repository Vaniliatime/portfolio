import type { Metadata } from "next";
import { locales, t, toLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { ui } from "@/content/site";
import { WorkGrid } from "@/components/WorkGrid";
import { ContactCta } from "@/components/ContactCta";
import { PageHeader } from "@/components/PageHeader";

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
  return {
    title: t(ui.allWork, lang),
    description: copy.lead[lang],
    alternates: alternatesFor(lang, "work"),
  };
}

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLocale((await params).lang);

  return (
    <>
      <PageHeader eyebrow={t(ui.featured, lang)} title={copy.heading[lang]} lead={copy.lead[lang]} />

      <div className="shell py-12 md:py-16">
        <WorkGrid lang={lang} />
      </div>

      <ContactCta lang={lang} />
    </>
  );
}
