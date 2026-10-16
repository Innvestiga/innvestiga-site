// Post-build SEO audit (checklist J). Run against a production build:
//   NEXT_PUBLIC_SITE_ENV=production npm run build && npm start
//   npm run audit:seo -- --base http://localhost:3000
// Exits 1 when a check fails. Pages in PENDING_REWRITE only warn.

const args = process.argv.slice(2);
const baseIndex = args.indexOf("--base");
const base = (baseIndex >= 0 ? args[baseIndex + 1] : "http://localhost:3000").replace(/\/+$/, "");

// Pages whose failures only warn. Empty since Milestone 2 shipped.
const PENDING_REWRITE = new Set([]);

const COUNTRY_PATHS = [
  "/cobertura/el-salvador", "/cobertura/guatemala", "/cobertura/honduras", "/cobertura/nicaragua",
  "/cobertura/costa-rica", "/cobertura/panama", "/cobertura/republica-dominicana", "/cobertura/chiapas-mexico",
];
const SCENARIO_PATHS = [
  "/servicios/auditorias/proceso-de-ventas", "/servicios/auditorias/garantias",
  "/servicios/auditorias/reclamos-y-conflictos", "/servicios/auditorias/reparaciones-y-servicio-tecnico",
  "/servicios/auditorias/devoluciones-y-cambios", "/servicios/auditorias/promociones-y-precios",
];

// Text that must be present in the server HTML (no JS), per path.
const EXPECT_TEXT = {
  "/": [
    "18 años de experiencia",
    "1,282 municipios que podemos evaluar",
    "¿Cuándo fue la última vez que auditaste a tu personal? Hazlo hoy.",
  ],
  "/servicios": ["Auditorías de experiencia del cliente para empresas de retail.", "Auditoría de canales digitales", "Otros estudios"],
  "/servicios/auditorias": [
    "Una auditoría con cliente oculto (mystery shopper) es una visita presencial de un auditor capacitado",
    "Situaciones en las que una auditoría ayuda a una empresa de retail",
    "Qué evaluamos",
    "Cómo funciona",
    "Qué recibes",
    "Evidencia en video, fotos y audio",
  ],
  "/servicios/canales-digitales": ["Auditoría de atención en chat, redes sociales y call center."],
  "/servicios/consumer-insights": ["Otros estudios que realizamos.", "Además de las auditorías, realizamos inteligencia de mercado"],
  "/cobertura": [
    "Auditorías CX en 1,282 municipios de Mesoamérica y el Caribe.",
    "Podemos evaluar cualquiera de...",
    "En Costa Rica contamos cantones y en Panamá, distritos.",
  ],
  "/nosotros": [
    "Innvestiga: 18 años de experiencia, especialistas en cliente oculto desde 2013.",
    "Nuestra historia",
    "Una experiencia que se nota en cada auditoría",
    "Datos clave",
    "Máximo 3 días después de cada visita",
  ],
  "/preguntas-frecuentes": ["¿Cuánto cuesta?", "Última actualización"],
  "/en": ["Find out what really happens in each of your stores.", "municipalities we can evaluate", "Request a pilot", "Book a demo"],
};
for (const path of SCENARIO_PATHS) {
  EXPECT_TEXT[path] = ["Qué situación evaluamos", "Qué verificamos", "Qué decisión te ayuda a tomar", "República Dominicana"];
}
for (const path of COUNTRY_PATHS) {
  EXPECT_TEXT[path] = ["Situaciones que auditamos", "Preguntas frecuentes", "Última actualización", "Proceso de ventas"];
}
for (const path of ["/cobertura/el-salvador", "/cobertura/guatemala"]) {
  EXPECT_TEXT[path].push("Atención comercial en", "Solicita tu prueba piloto en");
}

// JSON-LD @types each page must carry (section I).
const EXPECT_SCHEMA = {
  "/": ["Organization", "WebSite", "FAQPage"],
  "/nosotros": ["AboutPage", "Organization"],
  "/servicios/auditorias": ["Service"],
  "/servicios/canales-digitales": ["Service"],
  "/preguntas-frecuentes": ["FAQPage"],
  "/contacto": ["LocalBusiness"],
};
for (const path of [...SCENARIO_PATHS, ...COUNTRY_PATHS]) EXPECT_SCHEMA[path] = ["Service", "BreadcrumbList"];

// Pages without breadcrumbs: the two home pages and the conversion pages.
const NO_BREADCRUMBS = new Set(["/", "/en", "/contacto", "/demo"]);

const LOCALE = { "/en": "en_US" };

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

const REDIRECTS = [
  ["/casos-de-exito", "/servicios/auditorias"],
  ["/casos-de-exito/cualquier-caso", "/servicios/auditorias"],
];

const failures = [];
const warnings = [];
const fail = (path, msg) => (PENDING_REWRITE.has(path) ? warnings : failures).push(`${path}: ${msg}`);

// tagGap " " approximates rendered text; "" mirrors DOM textContent, which
// is how a crawler reads words split across adjacent inline elements.
const visibleText = (html, tagGap = " ") =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, tagGap)
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
  const locale = LOCALE[path] ?? "es_LA";
  if (metaContent(html, "property", "og:locale") !== locale) fail(path, `og:locale is not ${locale}`);
  if (!metaContent(html, "property", "og:image")) fail(path, "missing og:image");
  if (metaContent(html, "name", "twitter:card") !== "summary_large_image") fail(path, "twitter:card is not summary_large_image");
  if (/<meta[^>]+name="keywords"/i.test(html)) fail(path, "meta keywords present");
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) fail(path, "indexable page is noindex (is NEXT_PUBLIC_SITE_ENV=production?)");

  const types = new Set();
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(json);
      for (const item of [data].flat()) types.add(item["@type"]);
    } catch {
      fail(path, "invalid JSON-LD");
    }
  }
  const expectedTypes = [...(EXPECT_SCHEMA[path] ?? []), ...(NO_BREADCRUMBS.has(path) ? [] : ["BreadcrumbList"])];
  for (const type of new Set(expectedTypes)) {
    if (!types.has(type)) fail(path, `missing ${type} JSON-LD`);
  }

  if (path === "/" || path === "/en") {
    for (const lang of ["es", "en", "x-default"]) {
      if (!new RegExp(`<link[^>]+hrefLang="${lang}"`, "i").test(html)) fail(path, `missing hreflang ${lang}`);
    }
  }

  // A form without method="post" falls back to GET before hydration and
  // puts personal data in the URL (and in GA4 page_view).
  for (const [form] of html.matchAll(/<form\b[^>]*>/gi)) {
    if (!/method="post"/i.test(form)) fail(path, `form without method="post": ${form}`);
  }

  // Map labels and fills must be visible without the GSAP intro.
  if (/class="map-(label|fill)"[^>]*opacity="0"|opacity="0"[^>]*class="map-(label|fill)"/.test(html)) {
    fail(path, "map labels or fills hidden in the server HTML (opacity 0)");
  }

  const text = visibleText(html);
  const head = html.match(/<head>[\s\S]*<\/head>/i)?.[0] ?? "";
  const headText = visibleText(head.replace(/<meta[^>]+content="([^"]*)"[^>]*>/gi, " $1 "));
  for (const re of BANNED) {
    if (re.test(text) || re.test(headText)) fail(path, `banned text ${re}`);
  }

  const textContent = visibleText(html, "").toLowerCase();
  for (const expected of EXPECT_TEXT[path] ?? []) {
    if (!textContent.includes(expected.toLowerCase())) fail(path, `missing server text "${expected}"`);
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

  const llms = await fetch(`${base}/llms.txt`);
  const llmsText = await llms.text();
  if (llms.status !== 200 || !llmsText.startsWith("# Innvestiga")) failures.push(`llms.txt: status ${llms.status}`);

  for (const path of ["/preguntas-frecuentes", "/en", ...COUNTRY_PATHS, ...SCENARIO_PATHS]) {
    if (!paths.includes(path)) failures.push(`sitemap.xml: missing ${path}`);
  }

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
