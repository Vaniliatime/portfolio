# kkaszuba.eu

Portfolio and services site for Krzysztof Kaszuba. Rebuilt from scratch in 2026 to
replace the older job-hunting CV site — the focus is now client work and side projects.

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router, `output: "export"`) |
| Styling | Tailwind CSS 4, CSS-variable design tokens |
| Animation | Motion (`motion/react`) |
| Theming | next-themes — light is the default, dark is available |
| Icons | lucide-react |
| Hosting | SEOHOST (static files + Apache) |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000/en/
npm run build      # static export into out/
npm run typecheck  # tsc --noEmit
```

There is no page at `/` — the language prefix is always present. `.htaccess`
redirects the bare domain to `/en/` (or `/pl/` for Polish browsers).

## Structure

```
src/
  app/[lang]/          route tree; [lang]/layout.tsx is the root layout
    page.tsx           home
    work/              index + [slug] case studies
    resume/            CV
    contact/           contact form
  components/          UI, all consumed by the routes above
  content/             all copy and data — edit here, not in components
    projects.ts        every project, both languages
    site.ts            nav, hero, services, about, skills, UI strings
    resume.ts          experience, education, certificates, languages
  lib/i18n.ts          locales, path helpers, translation lookup
```

### Adding a project

Append an entry to `projects` in `src/content/projects.ts`. Every text field
takes `{ en, pl }`. Set `featured: true` to put it on the home page. Drop a
screenshot in `public/images/` and point `cover` at it — without one the card
falls back to a generated gradient panel keyed to the slug.

### Adding a language

Add the code to `locales` in `src/lib/i18n.ts`, then fill in the new key across
`src/content/*`. TypeScript will flag every string that is still missing.

## Contact form

The form posts JSON to `NEXT_PUBLIC_CONTACT_ENDPOINT` when that variable is set
(Formspree, Web3Forms, or a small PHP handler on SEOHOST). With no endpoint
configured it falls back to opening the visitor's mail client, so a plain static
deploy still works.

```bash
# .env.local
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
```

## Deploying

```bash
npm run build
```

Upload everything inside `out/` to the `public_html` root on SEOHOST. `.htaccess`
ships with the build and handles HTTPS, the www redirect, the language landing,
301s from the previous site's URLs, caching and security headers.

The previous version of the site lives in the `PurpleTW` repository and is kept
as a reference.
