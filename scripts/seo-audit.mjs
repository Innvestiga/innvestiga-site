// Post-build SEO audit (checklist J). Run against a production build:
//   NEXT_PUBLIC_SITE_ENV=production npm run build && npm start
//   npm run audit:seo -- --base http://localhost:3000
// Exits 1 when a check fails. Pages in PENDING_REWRITE only warn.

const args = process.argv.slice(2);
const baseIndex = args.indexOf("--base");
const base = (baseIndex >= 0 ? args[baseIndex + 1] : "http://localhost:3000").replace(/\/+$/, "");

// Pages Milestone 2 rewrites. Empty this set in Milestone 2.
const PENDING_REWRITE = new Set([
  "/nosotros",
  "/servicios",
  "/servicios/auditorias",
  "/servicios/canales-digitales",
  "/servicios/consumer-insights",
  "/cobertura",
]);

// Text that must be present in the server HTML (no JS), per path.
const EXPECT_TEXT = {};

const BANNED = [
  /inteligencia de mercado premium/i,
  /\bpremium\b/i,
  /\bl[ií]der(es)?\b/i,
  /\bel mejor\b/i,
  /exploraci[oó]n sist[eé]mica/i,
  /3ª generaci[oó]n/i,
  /geo-m[eé]trica/i,
  /exportaci[oó]n a excel/i,
  /casos de [eé]xito/i,
  /ingresar a esi/i,
  /quiero conocer esi/i,
  /portal esi3/i,
  /market specialist(?!s)/i,
];

const REDIRECTS = [["/casos-de-exito", "/servicios/auditorias"]];

const failures = [];
const warnings = [];
const fail = (path, msg) => (PENDING_REWRITE.has(path) ? warnings : failures).push(`${path}: ${msg}`);

const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ");

const metaContent = (html, attr, value) => {
  const tag = html.match(new RegExp(`<meta[^>]+${attr}="${value}"[^>]*>`, "i"))?.[0];
  return tag?.match(/content="([^"]*)"/i)?.[1] ?? null;
};

async function auditPage(path, seen) {
  const res = await fetch(base + path);
  if (res.status !== 200) return fail(path, `status ${res.status}`);
  const html = await res.text();

  const h1s = html.match(/<h1[\s>]/gi)?.length ?? 0;
  if (h1s !== 1) fail(path, `expected 1 <h1>, found ${h1s}`);

  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim();
  if (!title) fail(path, "missing <title>");
  else {
    if (title.length > 65) warnings.push(`${path}: title is ${title.length} chars`);
    if (seen.titles.has(title)) fail(path, `duplicate title (also on ${seen.titles.get(title)})`);
    seen.titles.set(title, path);
  }

  const desc = metaContent(html, "name", "description");
  if (!desc) fail(path, "missing meta description");
  else {
    if (desc.length > 170) warnings.push(`${path}: description is ${desc.length} chars`);
    if (seen.descs.has(desc)) fail(path, `duplicate description (also on ${seen.descs.get(desc)})`);
    seen.descs.set(desc, path);
  }

  if (!/<link[^>]+rel="canonical"/i.test(html)) fail(path, "missing canonical");
  if (metaContent(html, "property", "og:locale") !== "es_LA") fail(path, "og:locale is not es_LA");
  if (!metaContent(html, "property", "og:image")) fail(path, "missing og:image");
  if (metaContent(html, "name", "twitter:card") !== "summary_large_image") fail(path, "twitter:card is not summary_large_image");
  if (/<meta[^>]+name="keywords"/i.test(html)) fail(path, "meta keywords present");
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) fail(path, "indexable page is noindex (is NEXT_PUBLIC_SITE_ENV=production?)");

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(json);
    } catch {
      fail(path, "invalid JSON-LD");
    }
  }

  const text = visibleText(html);
  const head = html.match(/<head>[\s\S]*<\/head>/i)?.[0] ?? "";
  const headText = visibleText(head.replace(/<meta[^>]+content="([^"]*)"[^>]*>/gi, " $1 "));
  for (const re of BANNED) {
    if (re.test(text) || re.test(headText)) fail(path, `banned text ${re}`);
  }

  for (const expected of EXPECT_TEXT[path] ?? []) {
    if (!text.toLowerCase().includes(expected.toLowerCase())) fail(path, `missing server text "${expected}"`);
  }
}

async function main() {
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Bingbot"]) {
    if (!robots.includes(bot)) failures.push(`robots.txt: missing ${bot}`);
  }
  if (/Disallow: \/\s*$/m.test(robots)) failures.push("robots.txt blocks the whole site (staging build?)");

  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  if (paths.length === 0) failures.push("sitemap.xml lists no URLs");

  const seen = { titles: new Map(), descs: new Map() };
  for (const path of paths) await auditPage(path, seen);

  for (const [from, to] of REDIRECTS) {
    const res = await fetch(base + from, { redirect: "manual" });
    const location = res.headers.get("location") ?? "";
    if (res.status !== 301 || !location.endsWith(to)) {
      failures.push(`${from}: expected 301 -> ${to}, got ${res.status} -> ${location}`);
    }
  }

  for (const w of warnings) console.warn(`WARN  ${w}`);
  for (const f of failures) console.error(`FAIL  ${f}`);
  console.log(`\n${paths.length} pages, ${failures.length} failures, ${warnings.length} warnings`);
  process.exit(failures.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
