import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import type { ReactNode } from "react";
import "../../globals.css";
import { locales, t, toLocale, type Locale } from "@/lib/i18n";
import { profile, ui } from "@/content/site";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { CursorLight } from "@/components/CursorLight";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin", "latin-ext"], variable: "--font-sora", display: "swap" });

const siteUrl = `https://${profile.domain}`;

const descriptions: Record<Locale, string> = {
  en: "Krzysztof Kaszuba builds websites and web apps: business sites, full-stack applications, interactive invitations, and the maintenance that keeps them running.",
  pl: "Krzysztof Kaszuba buduje strony i aplikacje webowe: strony firmowe, aplikacje full-stack, interaktywne zaproszenia oraz utrzymanie, dzięki któremu wszystko działa.",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Only /en and /pl exist; anything else should 404 at build time. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLocale((await params).lang);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${profile.name} · ${t(profile.role, lang)}`,
      template: `%s · ${profile.name}`,
    },
    description: descriptions[lang],
    alternates: {
      canonical: `/${lang}/`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/`])),
    },
    openGraph: {
      type: "website",
      siteName: profile.name,
      locale: lang === "pl" ? "pl_PL" : "en_GB",
      url: `/${lang}/`,
      title: `${profile.name} · ${t(profile.role, lang)}`,
      description: descriptions[lang],
      // Static file rather than a generated one: an export has no image server,
      // and every share of this link is somebody's first impression of it.
      images: [{ url: "/og.png", width: 1200, height: 630, alt: profile.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.name} · ${t(profile.role, lang)}`,
      description: descriptions[lang],
      images: ["/og.png"],
    },
    icons: { icon: [{ url: "/icon.png", type: "image/png" }, { url: "/favicon.ico" }] },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = toLocale((await params).lang);

  return (
    <html lang={lang} suppressHydrationWarning className={`${inter.variable} ${sora.variable}`}>
      <body>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
          >
            Skip to content
          </a>
          <CursorLight />
          <Header lang={lang} />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <Footer lang={lang} />
          <BackToTop label={t(ui.backToTop, lang)} />
        </Providers>
      </body>
    </html>
  );
}
