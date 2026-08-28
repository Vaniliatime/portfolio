import { toLocale } from "@/lib/i18n";
import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { About } from "@/components/About";
import { ContactCta } from "@/components/ContactCta";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLocale((await params).lang);

  return (
    <>
      <Hero lang={lang} />
      <FeaturedWork lang={lang} />
      <Testimonials lang={lang} />
      <Services lang={lang} teaser />
      <About lang={lang} teaser />
      <ContactCta lang={lang} />
    </>
  );
}
