import { defaultLocale, locales } from "@/lib/i18n";

/**
 * Landing page for the bare domain.
 *
 * `output: "export"` rules out `redirect()` and next.config redirects, so the
 * hop happens in the document itself: a script picks the visitor's language,
 * and a meta refresh covers anyone without JavaScript. In production Apache
 * usually gets there first — this is the fallback, and it is what makes `/`
 * work in `next dev`.
 */
const redirectScript = `
(function () {
  var supported = ${JSON.stringify(locales)};
  var fallback = ${JSON.stringify(defaultLocale)};
  var target = fallback;
  try {
    var preferred = navigator.languages || [navigator.language];
    for (var i = 0; i < preferred.length; i++) {
      var code = String(preferred[i]).slice(0, 2).toLowerCase();
      if (supported.indexOf(code) !== -1) { target = code; break; }
    }
  } catch (e) {}
  window.location.replace('/' + target + '/');
})();
`;

export default function LandingPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}/`} />
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />

      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div>
          <p style={{ color: "#5c5670" }}>Redirecting…</p>
          <p style={{ marginTop: "1rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
            {locales.map((locale) => (
              <a key={locale} href={`/${locale}/`} style={{ color: "#7c3aed", fontWeight: 600 }}>
                {locale.toUpperCase()}
              </a>
            ))}
          </p>
        </div>
      </main>
    </>
  );
}
