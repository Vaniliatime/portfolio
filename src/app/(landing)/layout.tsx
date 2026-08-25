import type { ReactNode } from "react";
import "../globals.css";

/**
 * Second root layout, for the bare `/` entry point only.
 *
 * The site proper lives under /en and /pl and owns its own root layout in
 * (site)/[lang]. Next allows that split only through route groups, which is
 * why both trees are grouped.
 */
export const metadata = {
  title: "Krzysztof Kaszuba",
  robots: { index: false, follow: true },
};

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
