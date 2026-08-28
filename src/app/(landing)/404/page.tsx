import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { locales } from "@/lib/i18n";

/**
 * The page Apache serves for anything that is not there.
 *
 * It lives in the landing group rather than as app/not-found, because that one
 * needs a root layout and this site has two of them, one per route group. The
 * export writes it to 404/index.html and .htaccess points ErrorDocument at it.
 *
 * Bilingual on purpose: a wrong address arrives with no language attached, and
 * a redirect on top of an error is one hop too many.
 */
export const metadata = {
  title: "404",
  robots: { index: false, follow: false },
};

const copy = {
  en: {
    title: "This page is not here",
    body: "The address may be out of date, or the page may have been renamed. Both of these still work:",
    home: "Go to the home page",
    work: "See the work",
  },
  pl: {
    title: "Tej strony tu nie ma",
    body: "Adres mógł się zdezaktualizować albo strona zmieniła nazwę. Te dwa miejsca dalej działają:",
    home: "Przejdź na stronę główną",
    work: "Zobacz projekty",
  },
};

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-20">
      <div className="w-full max-w-xl">
        <p className="font-display text-[5rem] font-semibold leading-none text-accent/25 md:text-[7rem]">
          404
        </p>

        <div className="mt-6 space-y-10">
          {locales.map((locale) => {
            const text = copy[locale];

            return (
              <section key={locale}>
                <h1 className="font-display text-2xl font-semibold md:text-3xl">{text.title}</h1>
                <p className="mt-2.5 leading-relaxed text-ink-muted">{text.body}</p>
                <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.9375rem] font-medium">
                  <Link
                    href={`/${locale}/`}
                    className="inline-flex items-center gap-1.5 text-accent hover:underline"
                  >
                    {text.home}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/${locale}/work/`}
                    className="inline-flex items-center gap-1.5 text-ink-muted hover:text-accent"
                  >
                    {text.work}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </p>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
