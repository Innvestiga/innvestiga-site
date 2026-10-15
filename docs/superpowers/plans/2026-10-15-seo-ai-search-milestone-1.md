# SEO + AI Search — Milestone 1 (Oct 22 staging) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the global rules (section B), the new home page (section D), the pilot page `/contacto`, `/gracias` and `/demo` (section C) to a staging URL by Thursday 2026-10-22, on a foundation (SEO helpers, schema, sitemap, robots, analytics, audit script) that Milestone 2 reuses for the remaining pages.

**Architecture:** All copy and business data live in typed data modules under `src/data/` and `src/lib/constants.ts`; pages read from them so nav, footer, home, schema and sitemap never drift. Every page gets its metadata from one helper (`src/lib/seo.ts`) and its structured data from one builder module (`src/lib/jsonld.ts`). A post-build audit script crawls `sitemap.xml` on a running production build and enforces checklist J (one H1, unique title/description, canonical, OG, valid JSON-LD, banned words, text present in server HTML, 301 redirects).

**Tech Stack:** Next.js 16.2.1 (App Router, `next/font/google`, metadata routes, `next/og`), React 19.2, Tailwind 4, framer-motion, GSAP, EmailJS, Vitest (new, unit tests for pure modules), Node 20 `fetch` for the audit script.

**Spec:** `docs/superpowers/specs/2026-10-15-seo-ai-search-requirements.md` (verbatim client document). Section letters (A–J) below refer to it.

**Milestone 2 (separate plan, written after this one lands):** sections E, F, G pages (`/servicios*`, 6 scenario pages, `/cobertura` + 8 country pages, `/nosotros`, `/preguntas-frecuentes`, `/en/`), section H (breadcrumbs, `/llms.txt`, internal linking), the rest of section I (Service, LocalBusiness, AboutPage, BreadcrumbList) and the launch checklist J. Nav and footer links to those routes are added in this milestone and return 404 on staging until Milestone 2 ships — that is expected.

## Global Constraints

- Next.js here is 16.2.1: read `node_modules/next/dist/docs/` before using an API; `params`/`searchParams` are Promises; metadata nested objects (`openGraph`, `robots`) are **overwritten**, not merged, by child segments.
- Every code identifier, comment, test name and commit message is in US English. Site copy is Spanish, pasted verbatim from the spec.
- Brand line: "Auditorías CX con Cliente Oculto" replaces "Inteligencia de Mercado Premium" everywhere. Full name "Innvestiga Market Specialists" (plural).
- Region wording: "Mesoamérica y el Caribe". Country order everywhere: El Salvador, Guatemala, Honduras, Nicaragua, Costa Rica, Panamá, República Dominicana, Chiapas.
- Phone everywhere: `+502 2277 7220`. Offices: Guatemala City, San Salvador. Start year 2008 (18 años); ESI first version 2013.
- Banned on the site: "líder", "premium", "el mejor", ESI module names (dashboard, Geo-Métrica, tickets, rankings, Excel export), "Exploración Sistémica", "3ª generación", case studies, client names/logos, founder name/photo/bio.
- Typefaces: headings Sora 600/700, body Inter 400/500/600, WOFF2 self-hosted (`next/font` downloads at build and serves from `/_next/static`), `display: "swap"`.
- Per page: exactly one `<h1>`, unique title (~60 chars) and description (~155), canonical, OG image 1200×630, `og:locale` = `es_LA`, `twitter:card` = `summary_large_image`, no `meta keywords`.
- GA4 events: `pilot_form_submit`, `demo_booking`, `whatsapp_click`, `phone_click`, `video_play`. No personal data (name, email, phone, WhatsApp, company) in any event parameter.
- Removed URLs return **301** (not Next's default 308 for `permanent: true`).
- "Acceso" (upper right) keeps linking to `https://esi3.innvestiga.com` in a new tab exactly as today.
- Every claim and number on the site must appear in the spec. When a spec value is still `[to be sent]`, render nothing for it rather than inventing text.

## Environment variables (all `NEXT_PUBLIC_*`, inlined at build)

| Variable | Purpose | Staging | Production |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Absolute origin for canonical, sitemap, schema | staging origin | `https://main.innvestiga.com` (confirm with client) |
| `NEXT_PUBLIC_SITE_ENV` | `production` enables indexing; anything else = noindex + `Disallow: /` | `staging` | `production` |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID; GA is not loaded when empty | client's ID or empty | client's ID |
| `NEXT_PUBLIC_BOOKING_URL` | Calendly scheduling URL for `/demo` | client's URL | client's URL |
| `NEXT_PUBLIC_EMAILJS_*` | Existing | existing | existing |

## Open inputs from the client (render nothing until provided)

Each one has a single home in code so filling it in is a one-line change:

| Input | Where it goes |
|---|---|
| What the pilot includes | `PILOT_SCOPE` in `src/lib/constants.ts` |
| Executive name and hours for `/gracias` | `PILOT_FOLLOW_UP` in `src/lib/constants.ts` |
| WhatsApp number | `CONTACT.whatsapp` in `src/lib/constants.ts` |
| Notification email | EmailJS template "To" (dashboard, not code) |
| Instant WhatsApp notification on submit | Not built: needs a provider decision (WhatsApp Business API / Twilio / Zapier). Ask the client. |
| Google Business link per office, exact office addresses | `OFFICES` in `src/lib/constants.ts` |
| Booking tool (plan assumes Calendly) | `NEXT_PUBLIC_BOOKING_URL` + `isBookingScheduledMessage` |
| GA4 measurement ID | `NEXT_PUBLIC_GA_ID` |
| Production domain | `NEXT_PUBLIC_SITE_URL` |

## Review Focus

1. **Staging gets indexed, or production does not.** A build without `NEXT_PUBLIC_SITE_ENV=production` must serve `Disallow: /` and `noindex`; a production build must serve `Allow: /`, the AI crawler rules and no `noindex` on public pages. Pinned by `src/app/robots.test.ts` (Task 3) and the audit's robots check (Task 3).
2. **Text missing from the server HTML.** A crawler that does not run JS must read "18", "8", "1,282" in the counters and the banner sentence as one string. Pinned by the audit's `EXPECT_TEXT` for `/` (Task 3, expectations filled in Task 8).
3. **Redirect status 308 instead of 301.** `/casos-de-exito` must answer exactly 301 → `/servicios/auditorias`. Pinned by the audit's redirect check (Task 3) and `next.config.ts` using `statusCode: 301` (Task 15).
4. **Personal data leaking into GA4.** `pilot_form_submit` params may only contain `country` and `branches`. Pinned by `src/lib/pilotForm.test.ts` → `pilotAnalyticsParams` (Task 12).
5. **`/gracias` opened directly, in a private window, or with storage blocked.** It must render a generic thank-you instead of "Gracias, undefined" or crashing. Pinned by `thankYouMessage(null, …)` and `readStoredLead` tests (Task 12/13).

---

## File map

**Create**
- `vitest.config.ts` — Vitest with the `@/` alias.
- `src/lib/env.ts` — `siteUrl()`, `isProduction()`.
- `src/data/coverage.ts` — the 8 countries in spec order with unit counts (single source for nav, footer, home, form, schema).
- `src/data/scenarios.ts` — the 6 audit scenarios (slug, label, question).
- `src/data/faq.ts` — the 9 FAQs of section G.
- `src/lib/seo.ts` — `pageMetadata()`, `OG_IMAGE`.
- `src/app/og/route.tsx`, `src/app/brand/logo/route.tsx` — generated 1200×630 OG image and 512×512 wordmark.
- `src/lib/routes.ts` — `INDEXABLE_ROUTES`.
- `src/app/robots.ts`, `src/app/sitemap.ts`.
- `src/lib/jsonld.ts`, `src/components/seo/JsonLd.tsx`.
- `src/lib/analytics.ts`, `src/components/analytics/Analytics.tsx`.
- `src/components/layout/NavDropdown.tsx`, `src/components/layout/SocialIcons.tsx`.
- `src/components/home/DifferenceBlock.tsx`, `WhySection.tsx`, `SectorsSection.tsx`, `HomeFaq.tsx`.
- `src/lib/pilotForm.ts`.
- `src/app/gracias/page.tsx`, `src/app/gracias/layout.tsx`.
- `src/app/demo/page.tsx`, `src/components/demo/BookingEmbed.tsx`, `src/lib/booking.ts`.
- `scripts/seo-audit.mjs`.
- Tests next to the modules: `src/**/*.test.ts`.

**Modify**
- `package.json`, `Dockerfile`, `next.config.ts`
- `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`
- `src/lib/constants.ts`, `src/types/index.ts`
- `src/components/layout/{Navbar,MobileMenu,Footer}.tsx`
- `src/components/ui/AnimatedCounter.tsx`
- `src/components/home/{HeroSection,HeroMap,BenefitsSection,ESISection,ServicesGrid,ProcessSection,VisionReveal,CoverageSplit,CTASection}.tsx`
- `src/components/cobertura/StatsPanel.tsx`
- `src/app/contacto/{page,layout}.tsx`, `src/components/contacto/{ContactForm,DirectChannels,OfficeLocations}.tsx`
- `src/app/blog/layout.tsx`

**Delete**
- `src/app/casos-de-exito/`, `src/components/casos/`, `src/data/cases.ts`
- `src/components/home/ServicesCarousel.tsx`, `src/lib/benefitIcons.tsx` (once unused)

---

### Task 0: Branch

- [ ] **Step 1: Create the working branch**

```bash
git checkout -b feat/seo-ai-search
git add docs/superpowers/specs/2026-10-15-seo-ai-search-requirements.md docs/superpowers/plans/2026-10-15-seo-ai-search-milestone-1.md
git commit -m "docs: add SEO + AI search requirements and milestone 1 plan"
```

---

### Task 1: Test harness, business constants and shared data

**Files:**
- Create: `vitest.config.ts`, `src/lib/env.ts`, `src/data/coverage.ts`, `src/data/scenarios.ts`, `src/data/faq.ts`
- Modify: `package.json`, `src/lib/constants.ts`, `src/types/index.ts`
- Test: `src/data/coverage.test.ts`, `src/data/scenarios.test.ts`, `src/data/faq.test.ts`, `src/lib/constants.test.ts`

**Interfaces:**
- Produces:
  - `siteUrl(): string` (no trailing slash), `isProduction(): boolean`
  - `COVERAGE: CoverageCountry[]`, `coverageHref(c): string`, `TOTAL_MUNICIPALITIES: number`
  - `SCENARIOS: Scenario[]`, `scenarioHref(s): string`
  - `FAQS: FaqItem[]`, `HOME_FAQS: FaqItem[]` (first four)
  - constants: `SITE_NAME`, `SITE_LEGAL_NAME`, `SITE_TAGLINE`, `SITE_SUBTITLE`, `SITE_REGION`, `FOUNDING_YEAR`, `ESI_FIRST_YEAR`, `STATS`, `CONTACT` (`phone`, `phoneHref`, `email`, `portal`, `whatsapp`), `whatsappHref(): string | null`, `OFFICES`, `SOCIAL_PROFILES`, `NAV_LINKS`, `PILOT_SCOPE`, `PILOT_FOLLOW_UP`, `EMAILJS`

- [ ] **Step 1: Install Vitest and add scripts**

```bash
npm install --save-dev vitest@3
```

In `package.json` `scripts`, add:

```json
"test": "vitest run",
"audit:seo": "node scripts/seo-audit.mjs"
```

Create `vitest.config.ts`:

```ts
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 2: Write the failing data tests**

`src/data/coverage.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { COVERAGE, TOTAL_MUNICIPALITIES, coverageHref } from "./coverage";

describe("coverage", () => {
  it("lists the eight countries in the spec order", () => {
    expect(COVERAGE.map((c) => c.name)).toEqual([
      "El Salvador", "Guatemala", "Honduras", "Nicaragua",
      "Costa Rica", "Panamá", "República Dominicana", "Chiapas",
    ]);
  });

  it("uses the spec slugs", () => {
    expect(COVERAGE.map(coverageHref)).toEqual([
      "/cobertura/el-salvador", "/cobertura/guatemala", "/cobertura/honduras",
      "/cobertura/nicaragua", "/cobertura/costa-rica", "/cobertura/panama",
      "/cobertura/republica-dominicana", "/cobertura/chiapas-mexico",
    ]);
  });

  it("adds up to 1,282 municipal divisions", () => {
    expect(TOTAL_MUNICIPALITIES).toBe(1282);
  });

  it("uses cantones for Costa Rica and distritos for Panamá", () => {
    const unit = (slug: string) => COVERAGE.find((c) => c.slug === slug)!.unit;
    expect(unit("costa-rica")).toBe("cantones");
    expect(unit("panama")).toBe("distritos");
    expect(unit("guatemala")).toBe("municipios");
  });

  it("marks only El Salvador and Guatemala as sales priority", () => {
    expect(COVERAGE.filter((c) => c.priority).map((c) => c.slug)).toEqual(["el-salvador", "guatemala"]);
  });
});
```

`src/data/scenarios.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { SCENARIOS, scenarioHref } from "./scenarios";

describe("scenarios", () => {
  it("lists the six audit scenarios in the spec order with their URLs", () => {
    expect(SCENARIOS.map(scenarioHref)).toEqual([
      "/servicios/auditorias/proceso-de-ventas",
      "/servicios/auditorias/garantias",
      "/servicios/auditorias/reclamos-y-conflictos",
      "/servicios/auditorias/reparaciones-y-servicio-tecnico",
      "/servicios/auditorias/devoluciones-y-cambios",
      "/servicios/auditorias/promociones-y-precios",
    ]);
  });

  it("phrases every card line as a question", () => {
    for (const s of SCENARIOS) expect(s.question).toMatch(/^¿.+\?$/);
  });
});
```

`src/data/faq.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { FAQS, HOME_FAQS } from "./faq";

describe("faq", () => {
  it("has the nine questions of section G", () => {
    expect(FAQS).toHaveLength(9);
  });

  it("shows the first four on the home page", () => {
    expect(HOME_FAQS.map((f) => f.question)).toEqual(FAQS.slice(0, 4).map((f) => f.question));
  });

  it("never renders a bracketed placeholder", () => {
    for (const f of FAQS) expect(f.answer).not.toMatch(/\[|\]/);
  });
});
```

`src/lib/constants.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { CONTACT, NAV_LINKS, SOCIAL_PROFILES, STATS, whatsappHref } from "./constants";

describe("constants", () => {
  it("uses the single phone number and a dialable tel link", () => {
    expect(CONTACT.phone).toBe("+502 2277 7220");
    expect(CONTACT.phoneHref).toBe("tel:+50222777220");
  });

  it("states the spec numbers", () => {
    expect(STATS).toEqual({ yearsExperience: 18, countries: 8, municipalities: 1282 });
  });

  it("keeps the menu structure with dropdowns on Servicios and Cobertura", () => {
    expect(NAV_LINKS.map((l) => l.label)).toEqual(["Nosotros", "Servicios", "Cobertura", "Contacto"]);
    expect(NAV_LINKS[1].children?.length).toBe(8);
    expect(NAV_LINKS[2].children?.length).toBe(8);
  });

  it("lists the six social profiles under @innvestiga", () => {
    expect(SOCIAL_PROFILES.map((p) => p.url)).toEqual([
      "https://www.linkedin.com/company/innvestiga",
      "https://www.youtube.com/@innvestiga",
      "https://www.tiktok.com/@innvestiga",
      "https://www.instagram.com/innvestiga",
      "https://www.facebook.com/innvestiga",
      "https://x.com/innvestiga",
    ]);
  });

  it("builds a wa.me link only when a WhatsApp number is configured", () => {
    expect(whatsappHref("")).toBeNull();
    expect(whatsappHref("+502 5555 1234")).toBe("https://wa.me/50255551234");
  });
});
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module './coverage'` (and the other new modules), constants assertions failing.

- [ ] **Step 4: Implement `src/lib/env.ts`**

```ts
// The production origin until the client confirms another domain.
const DEFAULT_SITE_URL = "https://main.innvestiga.com";

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

// Only an explicit production build may be indexed; staging and local
// builds default to noindex so a review link never reaches search results.
export function isProduction(): boolean {
  return process.env.NEXT_PUBLIC_SITE_ENV === "production";
}
```

- [ ] **Step 5: Implement `src/data/coverage.ts`**

```ts
export type CoverageUnit = "municipios" | "cantones" | "distritos";

export interface CoverageCountry {
  slug: string;
  name: string;
  /** Name used in tables and schema, e.g. "Chiapas (México)". */
  fullName: string;
  count: number;
  unit: CoverageUnit;
  /** Sales priority countries get larger cards and the pilot form first. */
  priority: boolean;
}

// Order is fixed by the spec (rule B13) and reused everywhere on the site.
export const COVERAGE: CoverageCountry[] = [
  { slug: "el-salvador", name: "El Salvador", fullName: "El Salvador", count: 44, unit: "municipios", priority: true },
  { slug: "guatemala", name: "Guatemala", fullName: "Guatemala", count: 340, unit: "municipios", priority: true },
  { slug: "honduras", name: "Honduras", fullName: "Honduras", count: 298, unit: "municipios", priority: false },
  { slug: "nicaragua", name: "Nicaragua", fullName: "Nicaragua", count: 153, unit: "municipios", priority: false },
  { slug: "costa-rica", name: "Costa Rica", fullName: "Costa Rica", count: 84, unit: "cantones", priority: false },
  { slug: "panama", name: "Panamá", fullName: "Panamá", count: 81, unit: "distritos", priority: false },
  { slug: "republica-dominicana", name: "República Dominicana", fullName: "República Dominicana", count: 158, unit: "municipios", priority: false },
  { slug: "chiapas-mexico", name: "Chiapas", fullName: "Chiapas (México)", count: 124, unit: "municipios", priority: false },
];

export const TOTAL_MUNICIPALITIES = COVERAGE.reduce((sum, c) => sum + c.count, 0);

export function coverageHref(c: Pick<CoverageCountry, "slug">): string {
  return `/cobertura/${c.slug}`;
}
```

- [ ] **Step 6: Implement `src/data/scenarios.ts`**

```ts
export interface Scenario {
  slug: string;
  label: string;
  question: string;
}

// The six audit scenarios of section E, in the spec order.
export const SCENARIOS: Scenario[] = [
  { slug: "proceso-de-ventas", label: "Proceso de ventas", question: "¿Tu equipo vende como tu estándar dice?" },
  { slug: "garantias", label: "Garantías", question: "¿Se explican y se gestionan como define tu política?" },
  { slug: "reclamos-y-conflictos", label: "Reclamos y conflictos", question: "¿Cómo responde tu personal cuando el cliente se queja?" },
  { slug: "reparaciones-y-servicio-tecnico", label: "Reparaciones y servicio técnico", question: "¿Cumples los tiempos y la comunicación prometidos?" },
  { slug: "devoluciones-y-cambios", label: "Devoluciones y cambios", question: "¿Tu política se cumple tal como está escrita?" },
  { slug: "promociones-y-precios", label: "Promociones y precios", question: "¿Lo que anuncias es lo que se cobra?" },
];

export function scenarioHref(s: Pick<Scenario, "slug">): string {
  return `/servicios/auditorias/${s.slug}`;
}
```

- [ ] **Step 7: Implement `src/data/faq.ts`**

```ts
import { PILOT_SCOPE } from "@/lib/constants";

export interface FaqItem {
  question: string;
  answer: string;
}

const PILOT_VALUE = "Te permite comprobar el método en tus propias sucursales antes de decidir.";

// Section G, verbatim. The pilot answer prepends the scope once the client
// sends it; until then only the sentence that is already approved is shown.
export const FAQS: FaqItem[] = [
  {
    question: "¿Qué es una auditoría con cliente oculto (mystery shopper)?",
    answer:
      "Es una evaluación presencial en la que un auditor capacitado visita un punto de venta como si fuera un cliente real y califica la atención contra los estándares de la marca. También se le llama cliente misterioso. Innvestiga la realiza en 8 países.",
  },
  {
    question: "¿Cuánto tardan los resultados?",
    answer: "Máximo 3 días después de cada visita, en nuestra plataforma propia ESI.",
  },
  {
    question: "¿En qué países y municipios pueden evaluar?",
    answer:
      "En El Salvador, Guatemala, Honduras, Nicaragua, Costa Rica, Panamá, República Dominicana y Chiapas (México). Podemos evaluar cualquiera de sus 1,282 municipios.",
  },
  {
    question: "¿Qué incluye la prueba piloto?",
    answer: PILOT_SCOPE ? `${PILOT_SCOPE} ${PILOT_VALUE}` : PILOT_VALUE,
  },
  {
    question: "¿En qué se diferencia de una encuesta de satisfacción?",
    answer:
      "La encuesta recoge la opinión de quienes deciden responder. La auditoría evalúa la misma visita, con los mismos criterios, en todas tus sucursales.",
  },
  {
    question: "¿Qué situaciones pueden auditar en una tienda?",
    answer:
      "El proceso de ventas, las garantías, el manejo de reclamos, las reparaciones y el servicio técnico, las devoluciones y cambios, y el cumplimiento de promociones y precios.",
  },
  {
    question: "¿Cómo garantizan resultados objetivos?",
    answer:
      "Los criterios se definen contigo, los auditores están capacitados y cada evaluación se respalda con evidencia, con un proceso para revisar y aclarar resultados.",
  },
  {
    question: "¿Auditan chat, redes y call center?",
    answer: "Sí, con los mismos criterios que las sucursales.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "Depende del número de puntos de venta, países y frecuencia. Preparamos una propuesta a la medida; la prueba piloto permite comprobar el método antes de contratar.",
  },
];

export const HOME_FAQS = FAQS.slice(0, 4);
```

- [ ] **Step 8: Update `src/types/index.ts`**

Replace the `NavLink` and `Office` interfaces and delete `CaseStudy`:

```ts
export interface NavChild {
  label: string;
  href: string;
  /** Rendered smaller, for links the spec demotes (e.g. "Otros estudios"). */
  minor?: boolean;
}

export interface NavLink {
  number: string;
  label: string;
  href: string;
  children?: NavChild[];
}

export interface Office {
  city: string;
  country: string;
  address: string;
  /** Google Business profile; empty until the client sends it. */
  googleBusinessUrl: string;
}
```

- [ ] **Step 9: Rewrite `src/lib/constants.ts`**

```ts
import type { NavLink, Office } from "@/types";
import { COVERAGE, coverageHref } from "@/data/coverage";
import { SCENARIOS, scenarioHref } from "@/data/scenarios";

export const SITE_NAME = "Innvestiga";
export const SITE_LEGAL_NAME = "Innvestiga Market Specialists";
export const SITE_TAGLINE = "Auditorías CX con Cliente Oculto";
export const SITE_SUBTITLE = "MARKET SPECIALISTS";
export const SITE_REGION = "Mesoamérica y el Caribe";

export const FOUNDING_YEAR = 2008;
export const ESI_FIRST_YEAR = 2013;

export const STATS = {
  yearsExperience: 18,
  countries: 8,
  municipalities: 1282,
} as const;

export const CONTACT = {
  phone: "+502 2277 7220",
  phoneHref: "tel:+50222777220",
  email: "info@innvestiga.com",
  portal: "https://esi3.innvestiga.com",
  // Pending from the client; WhatsApp buttons stay hidden while empty.
  whatsapp: "",
} as const;

export function whatsappHref(number: string = CONTACT.whatsapp): string | null {
  const digits = number.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

export const OFFICES: Office[] = [
  {
    city: "Guatemala City",
    country: "Guatemala",
    address: "Zona 10, Ciudad de Guatemala",
    googleBusinessUrl: "",
  },
  {
    city: "San Salvador",
    country: "El Salvador",
    address: "San Salvador, El Salvador",
    googleBusinessUrl: "",
  },
];

export type SocialIcon = "linkedin" | "youtube" | "tiktok" | "instagram" | "facebook" | "x";

export const SOCIAL_PROFILES: { name: string; url: string; icon: SocialIcon }[] = [
  { name: "LinkedIn", url: "https://www.linkedin.com/company/innvestiga", icon: "linkedin" },
  { name: "YouTube", url: "https://www.youtube.com/@innvestiga", icon: "youtube" },
  { name: "TikTok", url: "https://www.tiktok.com/@innvestiga", icon: "tiktok" },
  { name: "Instagram", url: "https://www.instagram.com/innvestiga", icon: "instagram" },
  { name: "Facebook", url: "https://www.facebook.com/innvestiga", icon: "facebook" },
  { name: "X", url: "https://x.com/innvestiga", icon: "x" },
];

export const NAV_LINKS: NavLink[] = [
  { number: "01", label: "Nosotros", href: "/nosotros" },
  {
    number: "02",
    label: "Servicios",
    href: "/servicios",
    children: [
      ...SCENARIOS.map((s) => ({ label: s.label, href: scenarioHref(s) })),
      { label: "Auditoría de canales digitales", href: "/servicios/canales-digitales" },
      { label: "Otros estudios", href: "/servicios/consumer-insights", minor: true },
    ],
  },
  {
    number: "03",
    label: "Cobertura",
    href: "/cobertura",
    children: COVERAGE.map((c) => ({ label: c.name, href: coverageHref(c) })),
  },
  { number: "04", label: "Contacto", href: "/contacto" },
];

// Pending from the client: what the pilot includes. Rendered only when set.
export const PILOT_SCOPE: string | null = null;

// Pending from the client: who follows up and how fast, for /gracias.
export const PILOT_FOLLOW_UP: { executive: string | null; hours: number | null } = {
  executive: null,
  hours: null,
};

export const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "e1gu7dpEs7lxyViEj",
} as const;
```

`faq.ts` imports `PILOT_SCOPE` from constants and constants imports data modules that do not import constants, so there is no cycle.

- [ ] **Step 10: Run the tests**

Run: `npm test`
Expected: PASS (all four files).

- [ ] **Step 11: Fix the compile errors the new constants cause**

Run: `npx tsc --noEmit`
Expected errors, to fix in this step so the build stays green:
- `PILOT_COUNTRIES`, `PILOT_COUNTRIES_LIST`, `ESI_BENEFITS`, `SITE_DESCRIPTION`, `CONTACT.linkedin`, `STATS.departments/completedStudies/activeClients`, `office.phone` no longer exist. They are used in `HeroSection`, `BenefitsSection`, `ESISection`, `CoverageSplit`, `Footer`, `DirectChannels`, `OfficeLocations`, `StatsPanel`, `casos` files and `layout.tsx`. Those components are rewritten in later tasks. For now, make the minimal edits that compile:
  - `StatsPanel.tsx`: replace the `stats` array with
    ```ts
    const stats = [
      { label: "Países", value: STATS.countries, suffix: "" },
      { label: "Municipios", value: STATS.municipalities, suffix: "" },
      { label: "Años de experiencia", value: STATS.yearsExperience, suffix: "" },
    ];
    ```
    (The spec removes "Departamentos".)
  - `OfficeLocations.tsx`: replace `{office.phone}` with `{CONTACT.phone}` and import `CONTACT`.
  - `DirectChannels.tsx`: replace the `channels` array with
    ```ts
    const wa = whatsappHref();
    const channels = [
      { label: "Teléfono", value: CONTACT.phone, href: CONTACT.phoneHref, icon: "phone" },
      { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: "mail" },
      ...(wa ? [{ label: "WhatsApp", value: CONTACT.whatsapp, href: wa, icon: "whatsapp" }] : []),
    ];
    ```
    import `whatsappHref`, add to `iconPaths`:
    `whatsapp: "M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21 M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"`,
    and change the grid to `grid-cols-1 sm:grid-cols-3`.
  - Delete the case studies now (it uses `CaseStudy`): `git rm -r src/app/casos-de-exito src/components/casos src/data/cases.ts`. The 301 is added in Task 15.
  - In `HeroSection`, `BenefitsSection`, `ESISection`, `CoverageSplit`, `Footer`, `layout.tsx`: replace each removed import with a literal so it compiles (`STATS.completedStudies` → remove that counter row item; `PILOT_COUNTRIES` → `"El Salvador, Guatemala, Honduras, Nicaragua, Costa Rica, Panamá, República Dominicana y Chiapas"`; `ESI_BENEFITS` → `[]`; `PILOT_COUNTRIES_LIST` → `COVERAGE.map((c) => c.name)`; `SITE_DESCRIPTION` → the home description string from Task 2). These lines are all replaced in Tasks 2, 7 and 9–11.

Run: `npx tsc --noEmit && npm run lint && npm test`
Expected: no errors.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat(data): single source for coverage, scenarios, FAQ and contact data

Adds Vitest, the 8-country coverage table (1,282 divisions), the six audit
scenarios, the section G FAQ and the corrected brand/contact constants.
Removes the case studies section."
```

---

### Task 2: Metadata helper, OG image, root layout and typefaces

**Files:**
- Create: `src/lib/seo.ts`, `src/app/og/route.tsx`, `src/app/brand/logo/route.tsx`
- Modify: `src/app/layout.tsx`, `src/app/globals.css`, `src/components/home/HeroMap.tsx:297`, every file with `font-[800]`/`font-[900]`
- Test: `src/lib/seo.test.ts`

**Interfaces:**
- Consumes: `siteUrl()`, `isProduction()` (Task 1)
- Produces: `pageMetadata({ path, title, description, noindex? }): Metadata`, `OG_IMAGE: { url: "/og"; width: 1200; height: 630; alt: string }`, routes `GET /og` (PNG 1200×630) and `GET /brand/logo` (PNG 512×512)

- [ ] **Step 1: Write the failing test** — `src/lib/seo.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { OG_IMAGE, pageMetadata } from "./seo";

const meta = pageMetadata({
  path: "/demo",
  title: "Agenda una Demo | Innvestiga",
  description: "Mira cómo recibirías la evidencia.",
});

describe("pageMetadata", () => {
  it("uses the full title without the layout template", () => {
    expect(meta.title).toEqual({ absolute: "Agenda una Demo | Innvestiga" });
  });

  it("sets a canonical path", () => {
    expect(meta.alternates?.canonical).toBe("/demo");
  });

  it("repeats every Open Graph field because child segments overwrite openGraph", () => {
    expect(meta.openGraph).toMatchObject({
      locale: "es_LA",
      siteName: "Innvestiga",
      url: "/demo",
      title: "Agenda una Demo | Innvestiga",
      images: [OG_IMAGE],
    });
  });

  it("uses the large Twitter card", () => {
    expect(meta.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("only adds robots when asked to hide the page", () => {
    expect(meta.robots).toBeUndefined();
    expect(pageMetadata({ path: "/gracias", title: "t", description: "d", noindex: true }).robots).toEqual({
      index: false,
      follow: true,
    });
  });

  it("declares a 1200x630 image", () => {
    expect(OG_IMAGE).toMatchObject({ url: "/og", width: 1200, height: 630 });
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/lib/seo.test.ts`
Expected: FAIL — `Cannot find module './seo'`.

- [ ] **Step 3: Implement `src/lib/seo.ts`**

```ts
import type { Metadata } from "next";

export const OG_IMAGE = {
  url: "/og",
  width: 1200,
  height: 630,
  alt: "Innvestiga Market Specialists — Auditorías CX con Cliente Oculto",
} as const;

interface PageSeo {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}

// One place for per-page SEO. Next replaces (does not merge) nested objects
// such as openGraph from the layout, so every field is repeated here.
export function pageMetadata({ path, title, description, noindex }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_LA",
      siteName: "Innvestiga",
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: "@innvestiga",
      title,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
```

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/lib/seo.test.ts`
Expected: PASS.

- [ ] **Step 5: Add the generated images**

Read `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/image-response.md` first.

`src/app/og/route.tsx`:

```tsx
import { ImageResponse } from "next/og";

export const dynamic = "force-static";

// Default share image for every page until the client sends a designed one.
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #f8fafc 0%, #e0e8f7 100%)",
          color: "#1f2937",
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: "0.3em", color: "#1e40af", fontWeight: 700 }}>
          INNVESTIGA MARKET SPECIALISTS
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 28, maxWidth: 960 }}>
          Auditorías CX con Cliente Oculto
        </div>
        <div style={{ fontSize: 34, marginTop: 28, color: "#4b5563" }}>
          8 países · 1,282 municipios · Resultados en máximo 3 días
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
```

`src/app/brand/logo/route.tsx` (the Organization schema `logo`):

```tsx
import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#1e40af",
        }}
      >
        <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: "-0.04em" }}>INNVESTIGA</div>
        <div style={{ fontSize: 26, letterSpacing: "0.25em", marginTop: 8 }}>MARKET SPECIALISTS</div>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
```

- [ ] **Step 6: Rewrite the root layout metadata and fonts** — `src/app/layout.tsx`

Replace the imports through the end of `metadata` with:

```tsx
import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import { OG_IMAGE } from "@/lib/seo";
import { isProduction, siteUrl } from "@/lib/env";

// next/font downloads both families at build time and serves them as
// self-hosted WOFF2 from /_next/static, with font-display: swap.
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Auditorías CX: Cliente Oculto y Mystery Shopper | Innvestiga",
    template: "%s | Innvestiga",
  },
  description:
    "Auditorías CX con cliente oculto (mystery shopper) en 8 países y 1,282 municipios de Mesoamérica y el Caribe. Resultados en 3 días. Solicita tu prueba piloto.",
  openGraph: {
    type: "website",
    locale: "es_LA",
    siteName: "Innvestiga",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", site: "@innvestiga" },
  // Staging and local builds are never indexable. Pages that set their own
  // robots (only /gracias, which is noindex anyway) override this.
  ...(isProduction() ? {} : { robots: { index: false, follow: false } }),
};
```

and change `className={`${syne.variable} ${inter.variable}`}` to `className={`${sora.variable} ${inter.variable}`}`. The `keywords` field is gone.

- [ ] **Step 7: Point the CSS at Sora and drop unsupported weights**

`src/app/globals.css:31`:

```css
  --font-heading: var(--font-sora), "Sora", sans-serif;
```

`src/components/home/HeroMap.tsx:297`: `fontFamily="var(--font-heading), Sora, sans-serif"`.

Sora is loaded at 600/700 only, so `font-[800]`/`font-[900]` would be faux-bolded by the browser. Replace them across `src`:

```bash
grep -rl 'font-\[800\]\|font-\[900\]' src | xargs sed -i 's/font-\[800\]/font-bold/g; s/font-\[900\]/font-bold/g'
grep -rn 'font-\[800\]\|font-\[900\]\|font-light\|fontWeight="800"' src
```

Expected: the second command prints only `fontWeight="800"` in `HeroMap.tsx` (SVG text); change it to `fontWeight="700"`. Replace remaining `font-light` with `font-normal` (Inter 300 is no longer loaded).

- [ ] **Step 8: Verify**

Run: `npx tsc --noEmit && npm run lint && npm test && npm run build`
Expected: build succeeds and lists `ƒ /og` or `○ /og` and `/brand/logo`.

Run: `npm start` (background) then `curl -s -o /tmp/og.png -w "%{http_code} %{content_type}\n" http://localhost:3000/og`
Expected: `200 image/png`. Open the PNG and check it is 1200×630 with the three lines readable. Stop the server.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(seo): per-page metadata helper, OG image, Sora + Inter

Root metadata now uses the CX audit title and description, es_LA,
summary_large_image and no keywords tag; non-production builds are noindex."
```

---

### Task 3: robots.txt, sitemap.xml and the SEO audit script

**Files:**
- Create: `src/lib/routes.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, `scripts/seo-audit.mjs`
- Modify: `Dockerfile`
- Test: `src/app/robots.test.ts`, `src/app/sitemap.test.ts`

**Interfaces:**
- Consumes: `siteUrl()`, `isProduction()`
- Produces: `INDEXABLE_ROUTES: string[]`, `AI_CRAWLERS: string[]`. The audit CLI is `node scripts/seo-audit.mjs --base <origin>`: it exits 1 on any failure and prints warnings. Its `PENDING_REWRITE` set downgrades failures on pages Milestone 2 rewrites, and Milestone 2 empties that set.

- [ ] **Step 1: Write the failing tests**

`src/app/robots.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from "vitest";
import robots, { AI_CRAWLERS } from "./robots";

afterEach(() => vi.unstubAllEnvs());

describe("robots", () => {
  it("blocks everything outside production", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_ENV", "staging");
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });

  it("allows public pages and the AI crawlers in production", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com/");
    const result = robots();
    expect(result.sitemap).toBe("https://example.com/sitemap.xml");
    expect(result.rules).toEqual([
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ]);
    expect(AI_CRAWLERS).toEqual(["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Bingbot"]);
  });
});
```

`src/app/sitemap.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from "vitest";
import sitemap from "./sitemap";

afterEach(() => vi.unstubAllEnvs());

describe("sitemap", () => {
  it("lists absolute URLs for every indexable route and never the thank-you page", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com");
    const urls = sitemap().map((e) => e.url);
    expect(urls[0]).toBe("https://example.com/");
    expect(urls).toContain("https://example.com/contacto");
    expect(urls).toContain("https://example.com/demo");
    expect(urls.some((u) => u.includes("/gracias") || u.includes("/blog") || u.includes("casos"))).toBe(false);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run src/app`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement**

`src/lib/routes.ts`:

```ts
// Every public, indexable route. Milestone 2 appends the scenario, country,
// FAQ and /en/ routes here; the sitemap and the SEO audit both read it.
export const INDEXABLE_ROUTES: string[] = [
  "/",
  "/contacto",
  "/demo",
  "/nosotros",
  "/servicios",
  "/servicios/auditorias",
  "/servicios/canales-digitales",
  "/servicios/consumer-insights",
  "/cobertura",
];
```

`src/app/robots.ts`:

```ts
import type { MetadataRoute } from "next";
import { isProduction, siteUrl } from "@/lib/env";

export const AI_CRAWLERS = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Bingbot"];

export default function robots(): MetadataRoute.Robots {
  if (!isProduction()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
```

`src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";
import { INDEXABLE_ROUTES } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return INDEXABLE_ROUTES.map((path) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
```

- [ ] **Step 4: Run the tests**

Run: `npx vitest run src/app`
Expected: PASS.

- [ ] **Step 5: Write the audit script** — `scripts/seo-audit.mjs`

```js
// Post-build SEO audit (checklist J). Run against a production build:
//   NEXT_PUBLIC_SITE_ENV=production npm run build && npm start
//   npm run audit:seo -- --base http://localhost:3000
// Exits 1 when a check fails. Pages in PENDING_REWRITE only warn.

const args = process.argv.slice(2);
const base = (args[args.indexOf("--base") + 1] || "http://localhost:3000").replace(/\/+$/, "");

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
  for (const re of BANNED) {
    if (re.test(text) || re.test(visibleText(head.replace(/<meta[^>]+content="([^"]*)"[^>]*>/gi, " $1 ")))) {
      fail(path, `banned text ${re}`);
    }
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
```

- [ ] **Step 6: Pass the new build args through Docker** — `Dockerfile`, after the EmailJS `ENV` lines:

```dockerfile
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SITE_ENV
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_BOOKING_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_ENV=$NEXT_PUBLIC_SITE_ENV
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_BOOKING_URL=$NEXT_PUBLIC_BOOKING_URL
```

Add the same four keys under `build.args` in `docker-compose.yml` if it declares build args (read it first; follow its existing style).

- [ ] **Step 7: Run the audit to see the baseline**

```bash
NEXT_PUBLIC_SITE_ENV=production npm run build && (npm start &) && sleep 5
npm run audit:seo -- --base http://localhost:3000
```

Expected: FAIL. `/` fails on banned text ("Ingresar a ESI", "Exploración Sistémica"…), `/demo` is a 404, the `/casos-de-exito` redirect is missing, `/contacto` has a duplicate title. These failures are what Tasks 6–15 fix. Pending pages only warn. Stop the server.

Also check the staging mode: `NEXT_PUBLIC_SITE_ENV=staging npm run build && npm start`, then `curl -s localhost:3000/robots.txt`.
Expected: `User-Agent: *` / `Disallow: /`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(seo): robots.txt, sitemap.xml and a post-build SEO audit

robots allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended and Bingbot
in production and blocks everything on staging."
```

---

### Task 4: Structured data builders

**Files:**
- Create: `src/lib/jsonld.ts`, `src/components/seo/JsonLd.tsx`
- Test: `src/lib/jsonld.test.ts`

**Interfaces:**
- Consumes: `siteUrl()`, `COVERAGE`, `SOCIAL_PROFILES`, `CONTACT`, `SITE_LEGAL_NAME`, `SITE_NAME`, `FOUNDING_YEAR`, `FaqItem`
- Produces: `organizationSchema(): Record<string, unknown>`, `websiteSchema()`, `faqPageSchema(items: FaqItem[])`, `<JsonLd data={object | object[]} />`, `ORGANIZATION_ID` (string `${siteUrl()}/#organization`). Milestone 2 adds `serviceSchema`, `localBusinessSchema`, `breadcrumbSchema`, `aboutPageSchema` here.

- [ ] **Step 1: Write the failing test** — `src/lib/jsonld.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { faqPageSchema, organizationSchema, websiteSchema } from "./jsonld";

describe("organizationSchema", () => {
  const org = organizationSchema() as Record<string, any>;

  it("names the company as the spec requires", () => {
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe("Innvestiga Market Specialists");
    expect(org.alternateName).toBe("Innvestiga");
    expect(org.foundingDate).toBe("2008");
  });

  it("serves the 8 areas in order and the single phone", () => {
    expect(org.areaServed.map((a: { name: string }) => a.name)).toEqual([
      "El Salvador", "Guatemala", "Honduras", "Nicaragua", "Costa Rica",
      "Panamá", "República Dominicana", "Chiapas",
    ]);
    expect(org.contactPoint.telephone).toBe("+502 2277 7220");
  });

  it("links the six social profiles", () => {
    expect(org.sameAs).toHaveLength(6);
  });
});

describe("websiteSchema", () => {
  it("points at the organization", () => {
    const site = websiteSchema() as Record<string, any>;
    expect(site["@type"]).toBe("WebSite");
    expect(site.publisher["@id"]).toMatch(/#organization$/);
  });
});

describe("faqPageSchema", () => {
  it("maps questions to Question/Answer pairs", () => {
    const faq = faqPageSchema([{ question: "¿Q?", answer: "A." }]) as Record<string, any>;
    expect(faq).toEqual({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [{ "@type": "Question", name: "¿Q?", acceptedAnswer: { "@type": "Answer", text: "A." } }],
    });
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/lib/jsonld.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/jsonld.ts`**

```ts
import { siteUrl } from "@/lib/env";
import { COVERAGE } from "@/data/coverage";
import type { FaqItem } from "@/data/faq";
import { CONTACT, FOUNDING_YEAR, SITE_LEGAL_NAME, SITE_NAME, SOCIAL_PROFILES } from "@/lib/constants";

type Schema = Record<string, unknown>;

export const ORGANIZATION_ID = () => `${siteUrl()}/#organization`;

function areaServed(): Schema[] {
  return COVERAGE.map((c) =>
    c.slug === "chiapas-mexico"
      ? { "@type": "State", name: c.name, containedInPlace: { "@type": "Country", name: "México" } }
      : { "@type": "Country", name: c.name },
  );
}

export function organizationSchema(): Schema {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID(),
    name: SITE_LEGAL_NAME,
    alternateName: SITE_NAME,
    url: `${url}/`,
    logo: `${url}/brand/logo`,
    foundingDate: String(FOUNDING_YEAR),
    areaServed: areaServed(),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phone,
      email: CONTACT.email,
      contactType: "sales",
      availableLanguage: ["es"],
    },
    sameAs: SOCIAL_PROFILES.map((p) => p.url),
  };
}

export function websiteSchema(): Schema {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: `${url}/`,
    name: SITE_NAME,
    inLanguage: "es",
    publisher: { "@id": ORGANIZATION_ID() },
  };
}

export function faqPageSchema(items: FaqItem[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
```

`src/components/seo/JsonLd.tsx`:

```tsx
// Server component. Escapes "<" so JSON text can never close the script tag.
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
```

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/lib/jsonld.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/jsonld.ts src/lib/jsonld.test.ts src/components/seo/JsonLd.tsx
git commit -m "feat(seo): Organization, WebSite and FAQPage structured data"
```

---

### Task 5: GA4 and contact-link tracking

**Files:**
- Create: `src/lib/analytics.ts`, `src/components/analytics/Analytics.tsx`
- Modify: `src/app/layout.tsx`
- Test: `src/lib/analytics.test.ts`

**Interfaces:**
- Produces: `type AnalyticsEvent = "pilot_form_submit" | "demo_booking" | "whatsapp_click" | "phone_click" | "video_play"`, `trackEvent(name: AnalyticsEvent, params?: Record<string, string | number>): void`, `classifyContactLink(href: string): "whatsapp_click" | "phone_click" | null`, `<Analytics gaId={string | undefined} />`

`video_play` is declared but has no caller: the site has no video yet. When a video is added, call `trackEvent("video_play", { video_title })` from its play handler.

- [ ] **Step 1: Write the failing test** — `src/lib/analytics.test.ts`

```ts
import { afterEach, describe, expect, it, vi } from "vitest";
import { classifyContactLink, trackEvent } from "./analytics";

afterEach(() => vi.unstubAllGlobals());

describe("classifyContactLink", () => {
  it.each([
    ["tel:+50222777220", "phone_click"],
    ["https://wa.me/50255551234", "whatsapp_click"],
    ["https://api.whatsapp.com/send?phone=502", "whatsapp_click"],
    ["mailto:info@innvestiga.com", null],
    ["/contacto", null],
    ["https://esi3.innvestiga.com", null],
  ])("%s -> %s", (href, expected) => {
    expect(classifyContactLink(href)).toBe(expected);
  });
});

describe("trackEvent", () => {
  it("forwards to gtag when it is loaded", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag });
    trackEvent("demo_booking", { source: "demo" });
    expect(gtag).toHaveBeenCalledWith("event", "demo_booking", { source: "demo" });
  });

  it("is a no-op without gtag or on the server", () => {
    vi.stubGlobal("window", {});
    expect(() => trackEvent("phone_click")).not.toThrow();
    vi.stubGlobal("window", undefined);
    expect(() => trackEvent("phone_click")).not.toThrow();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/lib/analytics.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/analytics.ts`**

```ts
export type AnalyticsEvent =
  | "pilot_form_submit"
  | "demo_booking"
  | "whatsapp_click"
  | "phone_click"
  | "video_play";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Never pass personal data (name, email, phone, company) as params.
export function trackEvent(name: AnalyticsEvent, params: Record<string, string | number> = {}): void {
  if (typeof window === "undefined" || !window) return;
  window.gtag?.("event", name, params);
}

export function classifyContactLink(href: string): "whatsapp_click" | "phone_click" | null {
  if (/^tel:/i.test(href)) return "phone_click";
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) return "whatsapp_click";
  return null;
}
```

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/lib/analytics.test.ts`
Expected: PASS.

- [ ] **Step 5: Implement the component** — `src/components/analytics/Analytics.tsx`

Read `node_modules/next/dist/docs/01-app/03-api-reference/02-components/script.md` first.

```tsx
"use client";

import Script from "next/script";
import { useEffect } from "react";
import { classifyContactLink, trackEvent } from "@/lib/analytics";

// Loads GA4 when an ID is configured and reports every tel: and WhatsApp
// click site-wide, so individual buttons need no tracking code.
export default function Analytics({ gaId }: { gaId?: string }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      const href = link?.getAttribute("href") ?? "";
      const name = classifyContactLink(href);
      if (name) trackEvent(name, { link_url: href });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
    </>
  );
}
```

In `src/app/layout.tsx`, import it and render `<Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} />` as the last child of `<body>`.

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit && npm run lint && npm test`
Expected: PASS.

Manual check: `NEXT_PUBLIC_GA_ID=G-TEST123 npm run dev`, open `/contacto` and, in DevTools, check that `gtag/js?id=G-TEST123` loads. Then run `window.gtag = (...a) => console.log(a)` in the console, click the phone card and expect `["event","phone_click",{link_url:"tel:+50222777220"}]` to be logged.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(analytics): GA4 loader and automatic phone/WhatsApp click events"
```

Ops (client's GA4 admin, not code): mark `pilot_form_submit` and `demo_booking` as key events (conversions).

---

### Task 6: Header — dropdowns, "Agendar demo", client access, logo name

**Files:**
- Create: `src/components/layout/NavDropdown.tsx`
- Modify: `src/components/layout/Navbar.tsx`, `src/components/layout/MobileMenu.tsx`

**Interfaces:**
- Consumes: `NAV_LINKS` (with `children`), `CONTACT.portal`, `SITE_SUBTITLE`
- Produces: `<NavDropdown link={NavLink} />`

- [ ] **Step 1: Create `NavDropdown.tsx`**

The dropdown is pure CSS (`group-hover` / `group-focus-within`), so it works without JS and its links are in the server HTML for crawlers.

```tsx
import Link from "next/link";
import type { NavLink } from "@/types";

const topLinkClass =
  "relative text-body hover:text-ink text-[10px] font-bold uppercase tracking-[0.2em] py-2 transition-colors duration-300";

export default function NavDropdown({ link }: { link: NavLink }) {
  return (
    <div className="group relative">
      <Link href={link.href} className={topLinkClass} aria-haspopup="true">
        <span className="text-primary/40 mr-1">{link.number}</span>
        {link.label}
        <span aria-hidden="true" className="ml-1 inline-block transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180">
          ▾
        </span>
      </Link>
      <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-3 z-[1001]">
        <ul className="min-w-[260px] rounded-2xl bg-surface border border-border shadow-[0_12px_32px_rgba(15,23,42,0.14)] p-2">
          {link.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className={`block rounded-xl px-4 py-2.5 hover:bg-surface-alt focus-visible:bg-surface-alt transition-colors ${
                  child.minor ? "text-[11px] text-muted border-t border-border mt-1 pt-3" : "text-[13px] text-ink font-medium"
                }`}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update `Navbar.tsx`**

- Logo subtitle: `MARKET SPECIALIST` → `{SITE_SUBTITLE}` (import from constants).
- Desktop list: render `link.children ? <NavDropdown key=… link={link} /> : <Link …>` (keep the existing `<Link>` markup for the leaf items).
- Before the "Acceso" `<a>`, add:
  ```tsx
  <Link
    href="/demo"
    className="border border-primary/40 text-primary px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary/10 hover:border-primary transition-all duration-300"
  >
    Agendar demo
  </Link>
  ```
- Leave the "Acceso" `<a>` exactly as it is (href, target, label).
- Mobile: before the hamburger `<button>`, add a client-access button that is visible below `lg`:
  ```tsx
  <a
    href={CONTACT.portal}
    target="_blank"
    rel="noopener noreferrer"
    className="lg:hidden ml-auto mr-3 bg-primary text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest"
  >
    Acceso clientes
  </a>
  ```
- Social icons go in the footer only (Task 7). The spec allows the header "if there is space", and the pill navbar has none at 1024px.
- Hamburger: `aria-label="Toggle menu"` → `aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}` and add `aria-expanded={menuOpen}`.

- [ ] **Step 3: Update `MobileMenu.tsx`**

- After the `NAV_LINKS` map, add an "Agendar demo" item in the same `motion.div` pattern, linking to `/demo` and calling `onClose`.
- Rename the label `Acceso Portal` to `Acceso clientes`.
- Shift the delay of the last item to `(NAV_LINKS.length + 1) * 0.1`.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit && npm run lint`, then `npm run dev` and check:
- At ≥1024px: hovering "Servicios" shows 8 items with "Otros estudios" smaller. Hovering "Cobertura" shows the 8 countries in spec order. Tab focus opens the panels too.
- "Agendar demo" sits before "Acceso", and "Acceso" still opens esi3 in a new tab.
- At 375px: "Acceso clientes" is visible in the bar, and the menu shows the 4 links plus Agendar demo and Acceso clientes.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(nav): service and coverage dropdowns, Agendar demo, Acceso clientes on mobile"
```

---

### Task 7: Footer

**Files:**
- Create: `src/components/layout/SocialIcons.tsx`
- Modify: `src/components/layout/Footer.tsx` (full rewrite, becomes a server component)

**Interfaces:**
- Consumes: `NAV_LINKS`, `SCENARIOS`, `scenarioHref`, `COVERAGE`, `coverageHref`, `CONTACT`, `OFFICES`, `SOCIAL_PROFILES`, `SITE_LEGAL_NAME`, `SITE_TAGLINE`
- Produces: `<SocialIcons className? />`

- [ ] **Step 1: Create `SocialIcons.tsx`**

```tsx
import { SOCIAL_PROFILES, type SocialIcon } from "@/lib/constants";

// Stroke glyphs that match the site's line icons (24x24).
const ICONS: Record<SocialIcon, React.ReactNode> = {
  linkedin: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />,
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" />
    </>
  ),
  tiktok: <path d="M9 12a4 4 0 1 0 4 4V3c.6 2.8 2.6 4.8 5.5 5" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" />
    </>
  ),
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  x: <path d="M4 4l11.7 16H20L8.3 4H4z M4 20l6.8-7.4 M20 4l-6.6 7.2" />,
};

export default function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {SOCIAL_PROFILES.map((p) => (
        <li key={p.icon}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.name} de Innvestiga`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-body hover:text-primary hover:border-primary/40 transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {ICONS[p.icon]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: Rewrite `Footer.tsx`**

```tsx
import Link from "next/link";
import { CONTACT, NAV_LINKS, OFFICES, SITE_LEGAL_NAME, SITE_TAGLINE } from "@/lib/constants";
import { SCENARIOS, scenarioHref } from "@/data/scenarios";
import { COVERAGE, coverageHref } from "@/data/coverage";
import SocialIcons from "./SocialIcons";

const headingClass = "text-[10px] font-bold tracking-[0.3em] uppercase text-muted block mb-5";
const linkClass = "text-[12px] text-body hover:text-primary transition-colors duration-300";

function Column({ title, links }: { title: string; links: { href: string; label: string; external?: boolean }[] }) {
  return (
    <div>
      <span className={headingClass}>{title}</span>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className={linkClass}>
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#e3e8f0] border-t border-[#d5dce6] text-body z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-20">
        <div className="mb-16">
          <span className="font-heading text-3xl md:text-4xl font-bold tracking-tighter block text-ink">
            {SITE_LEGAL_NAME}
          </span>
          <span className="text-primary/70 text-[10px] tracking-[0.3em] font-bold uppercase mt-2 block">
            {SITE_TAGLINE}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
          <Column title="Navegación" links={NAV_LINKS.map((l) => ({ href: l.href, label: l.label }))} />
          <Column
            title="Servicios"
            links={[
              ...SCENARIOS.map((s) => ({ href: scenarioHref(s), label: s.label })),
              { href: "/servicios/canales-digitales", label: "Canales digitales" },
            ]}
          />
          <Column title="Cobertura" links={COVERAGE.map((c) => ({ href: coverageHref(c), label: c.name }))} />
          <Column
            title="Recursos"
            links={[
              { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
              { href: CONTACT.portal, label: "Acceso clientes", external: true },
            ]}
          />
          <div className="col-span-2 md:col-span-1">
            <span className={headingClass}>Contacto</span>
            <ul className="space-y-3">
              <li>
                <a href={CONTACT.phoneHref} className={linkClass}>{CONTACT.phone}</a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className={linkClass}>{CONTACT.email}</a>
              </li>
              <li className="text-[12px] text-body">{OFFICES.map((o) => o.city).join(" | ")}</li>
            </ul>
            <SocialIcons className="mt-5" />
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-[10px] text-muted tracking-[0.15em] uppercase leading-relaxed">
            © {new Date().getFullYear()} {SITE_LEGAL_NAME}. Todos los derechos reservados. Auditorías CX con cliente oculto en Mesoamérica y el Caribe.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

The Blog link is gone (see Task 15: the blog has no real articles). Add it back in "Recursos" once the first 3 articles are published.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npm run lint`, then `npm run dev` and check the footer at 375px and 1440px. There must be no horizontal scroll at 375px, the six icons open their profiles in new tabs, and "Casos de Éxito" and "Portal ESI3" are gone.

Manual (spec rule B, "open each link"): open each of the six social URLs in a browser and confirm it is Innvestiga's real profile. If a platform redirects to another format, put the real URL in `SOCIAL_PROFILES` and update `src/lib/constants.test.ts`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(footer): five-column footer with coverage, services, social icons and new brand line"
```

---

### Task 8: Text in the server HTML — counters and banner

**Files:**
- Modify: `src/components/ui/AnimatedCounter.tsx`, `src/components/home/VisionReveal.tsx`, `scripts/seo-audit.mjs` (`EXPECT_TEXT`)

**Interfaces:**
- Produces: `AnimatedCounter` server HTML shows the formatted final value (e.g. `1,282`), and the animation restarts from 0 only on the client.

- [ ] **Step 1: Add the failing audit expectation** — in `scripts/seo-audit.mjs`, replace `const EXPECT_TEXT = {};` with:

```js
const EXPECT_TEXT = {
  "/": [
    "18 años de experiencia",
    "1,282 municipios que podemos evaluar",
    "¿Cuándo fue la última vez que auditaste a tu personal? Hazlo hoy.",
  ],
};
```

Build, start and run the audit (commands as in Task 3 Step 7).
Expected: `/` FAIL with `missing server text` for all three lines. (Counters render `0` today, and the banner words are adjacent spans with no spaces.)

- [ ] **Step 2: Render the final value on the server** — `AnimatedCounter.tsx`

```tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

const format = (n: number) => Math.round(n).toLocaleString("en-US");

// The server HTML carries the final number so crawlers and no-JS readers
// see it; the count-up runs on the client when the number scrolls in.
export default function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const obj = { val: 0 };
    const render = () => {
      el.textContent = `${prefix}${format(obj.val)}${suffix}`;
    };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        render();
        gsap.to(obj, { val: end, duration, ease: "power2.out", onUpdate: render });
      },
    });

    return () => trigger.kill();
  }, [end, suffix, prefix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(end)}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 3: Make the banner one readable sentence** — `VisionReveal.tsx`

Replace the two word arrays with:

```ts
const QUESTION = "¿Cuándo fue la última vez que auditaste a tu personal?";
const CALL = "Hazlo hoy.";
const words = QUESTION.split(" ");
const goldWords = CALL.split(" ");
```

Change the flex wrapper `<div className="flex flex-wrap …">` to a `<p>` with the same classes. Inside it, put `{" "}` after every word `<span>` (flex ignores whitespace-only text, so the layout does not change). `wordClass` already has `uppercase`, so the sentence-case source still renders in capitals.

- [ ] **Step 4: Verify**

Run the build + audit again.
Expected: the banner line passes. The two counter lines still fail until Task 9 changes the hero counters. Then `npx tsc --noEmit && npm run lint`.

In the browser, check that the counters still count up and the banner still fills word by word.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix(home): counters and banner text are complete in the server HTML"
```

---

### Task 9: Home hero

**Files:**
- Modify: `src/components/home/HeroSection.tsx`, `src/components/home/HeroMap.tsx`

**Interfaces:**
- Consumes: `STATS`, `COVERAGE`, `coverageHref`, `Button`

- [ ] **Step 1: Rewrite the hero copy** — `HeroSection.tsx`

- Replace the `motion.h1` children with: `Descubre lo que realmente pasa en{" "}<span className="text-gold-gradient">cada una de tus sucursales</span>.`
- First paragraph: `Diseñas estándares, capacitas a tu equipo y defines procesos claros. Una auditoría te muestra si eso ocurre en cada sucursal.`
- Second paragraph: `Auditorías de experiencia del cliente con cliente misterioso en 8 países de Centroamérica, el Caribe y Chiapas. Evidencia real y resultados en máximo 3 días.` (no ESI span)
- Third line, with every country linking to its page:
  ```tsx
  Prueba piloto disponible en{" "}
  {COVERAGE.map((c, i) => (
    <span key={c.slug}>
      {i > 0 && (i === COVERAGE.length - 1 ? " y " : ", ")}
      <Link href={coverageHref(c)} className="underline decoration-primary/30 underline-offset-2 hover:text-primary">
        {c.name}
      </Link>
    </span>
  ))}
  .
  ```
  (import `Link` from `next/link`, and `COVERAGE`, `coverageHref`)
- Buttons: `Solicitar prueba piloto` → `/contacto` (variant `gold`) and `Agendar demo` → `/demo` (variant `outline`, not external). Remove the `CONTACT` import.
- Counters, exactly three:
  ```ts
  [
    { end: STATS.yearsExperience, label: "años de experiencia" },
    { end: STATS.countries, label: "países" },
    { end: STATS.municipalities, label: "municipios que podemos evaluar" },
  ]
  ```
  Render `<AnimatedCounter end={s.end} … />` followed by the label. The label `<span>` keeps `uppercase` styling. To make the audit's `EXPECT_TEXT` match "18 años de experiencia", put the number and the label in the same block with a space between them: `<AnimatedCounter … />{" "}<span …>{s.label}</span>`.

- [ ] **Step 2: Link the map countries** — `HeroMap.tsx`

- Add `slug` to each `mapData` entry: `mexico-chiapas` → `"chiapas-mexico"`, `rep-dominicana` → `"republica-dominicana"`, the rest same as `id`.
- Wrap each country `<text className="map-label">` in `<a href={`/cobertura/${c.slug}`}>`, and do the same for the "R. DOMINICANA" inset label with `RD.slug`.
- Render the label group in coverage order: `mapData.filter(...).sort((a, b) => COVERAGE.findIndex((c) => c.slug === a.slug) - COVERAGE.findIndex((c) => c.slug === b.slug))`.
- `aria-label` → `"Mapa de cobertura de Innvestiga en Mesoamérica y el Caribe"`.
- Keep the "SEDE" badge as it is (spec: legend only).

- [ ] **Step 3: Verify**

Build + audit.
Expected: `/` passes the three `EXPECT_TEXT` lines. Banned-text failures from the benefits/CTA sections remain until Tasks 10–11.

Check the hero at 375px, 768px and 1440px: the counters must not collide (the long third label wraps). Click each country link in the hero line and the map; they go to `/cobertura/{slug}`, which 404s until Milestone 2.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(home): new hero copy, demo button, three counters and country links"
```

---

### Task 10: Home middle — outcomes, difference, ESI, why, situations, process

**Files:**
- Create: `src/components/home/DifferenceBlock.tsx`, `src/components/home/WhySection.tsx`
- Modify: `src/components/home/BenefitsSection.tsx`, `src/components/home/ESISection.tsx` (rewrite), `src/components/home/ServicesGrid.tsx`, `src/components/home/ProcessSection.tsx`

- [ ] **Step 1: `BenefitsSection.tsx` — keep the four outcomes, replace the ESI card with the difference block**

- Kicker `Lo que ganas` → `Beneficios`.
- H2: `Lo que ganas con una{" "}<span className="text-gold-gradient">auditoría</span>`.
- Keep `OUTCOMES` text unchanged (spec: "keep the text"). Delete its comment about `ESI_BENEFITS`.
- Button label → `Solicitar prueba piloto`.
- Replace the whole right-hand `motion.div` (ESI card) with `<DifferenceBlock />`.
- Remove the `ESI_BENEFITS`, `CONTACT`, `BENEFIT_ICONS` imports and `BADGES`.

- [ ] **Step 2: Create `DifferenceBlock.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

export default function DifferenceBlock() {
  return (
    <motion.div
      className="lg:col-span-6 rounded-3xl bg-surface border border-border p-7 md:p-10 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_24px_60px_-18px_rgba(30,64,175,0.18)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary/70">La diferencia</span>
      <h2
        style={{ textTransform: "none" }}
        className="mt-5 font-heading text-2xl md:text-[2rem] font-bold leading-tight tracking-tight text-ink"
      >
        Una encuesta mide a quien responde.{" "}
        <span className="text-gold-gradient">Una auditoría mide a todas tus sucursales.</span>
      </h2>
      <p className="mt-6 text-body text-base leading-relaxed">
        Las encuestas reflejan la opinión de los clientes que deciden contestar. Una auditoría con cliente oculto evalúa la
        misma visita, con los mismos criterios, en cada punto de venta. Así sabes dónde se cumple tu estándar y dónde no.
      </p>
    </motion.div>
  );
}
```

- [ ] **Step 3: Rewrite `ESISection.tsx` as the benefits-only ESI block**

```tsx
"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const BENEFITS = [
  "Ves la evidencia de cada visita, no un resumen.",
  "Recibes resultados en máximo 3 días, cuando todavía importa.",
  "Comparas sucursales, ciudades y países con el mismo criterio.",
  "Detectas situaciones críticas a tiempo.",
  "Validas los resultados con tu equipo mediante un proceso claro.",
  "Presentas hallazgos y recomendaciones listos para tu comité.",
];

const STRIP = ["Desde 2013", "Resultados en máx. 3 días"];

// ESI is described only through benefits: no module names, screenshots or
// expansion of the acronym (spec rule B2).
export default function ESISection() {
  return (
    <section className="relative bg-[#f3f6fc] border-t border-border py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none [mask-image:radial-gradient(120%_100%_at_50%_0%,#000,transparent)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-primary">Tecnología</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-[0.95] tracking-tight text-ink">
              Plataforma propia, <span className="text-gold-gradient">ESI</span>
            </h2>
            <p className="mt-7 text-body text-base md:text-lg leading-relaxed">
              Cada auditoría llega a ESI, nuestra plataforma propia, operando desde 2013.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {STRIP.map((b) => (
                <span key={b} className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-2 text-[10px] font-bold tracking-[0.15em] uppercase">
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-10">
              <Button href="/demo" variant="gold">Agendar demo</Button>
            </div>
          </motion.div>

          <ul className="rounded-3xl bg-surface border border-border p-3 md:p-4 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_24px_60px_-18px_rgba(30,64,175,0.18)]">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-4 rounded-2xl px-4 py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <p className="text-ink text-[15px] font-medium leading-snug">{benefit}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `WhySection.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

const REASONS = [
  {
    title: "Equipo logístico en la región.",
    text: "Podemos evaluar cualquiera de los 1,282 municipios de 8 países, con un mismo método.",
  },
  { title: "Resultados en máximo 3 días.", text: "Decides cuando todavía importa." },
  { title: "Plataforma propia, ESI.", text: "Evidencia, comparativos y resultados claros para tu comité." },
  {
    title: "18 años de experiencia.",
    text: "Innvestiga mide servicio en la región desde 2008, y desde 2013 con ESI.",
  },
];

export default function WhySection() {
  return (
    <section className="relative bg-bg border-t border-border py-24 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-primary" />
          <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-primary">Por qué nosotros</span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-[0.95] tracking-tight text-ink">
          Por qué <span className="text-gold-gradient">Innvestiga</span>
        </h2>
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map((r, i) => (
            <motion.li
              key={r.title}
              className="rounded-2xl bg-surface border border-border p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 style={{ textTransform: "none" }} className="font-heading text-lg font-bold text-ink leading-snug">
                {r.title}
              </h3>
              <p className="mt-2 text-[14.5px] text-body leading-relaxed">{r.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: `ServicesGrid.tsx` — six situations instead of three services**

- Replace the `services` import with `import { SCENARIOS, scenarioHref } from "@/data/scenarios";`.
- Kicker `Soluciones` → `Servicios`.
- H2: `Situaciones que una auditoría{" "}<br /><span className="text-muted">te ayuda a resolver.</span>`.
- Grid `md:grid-cols-3` → `sm:grid-cols-2 lg:grid-cols-3`. Map `SCENARIOS` with `i`: the number badge is `0{i + 1}`, `<h3>` is `{s.label}`, `<p>` is `{s.question}`. Drop the features `<ul>`. `href={scenarioHref(s)}`, CTA text `Ver auditoría`.
- After the grid, add:
  ```tsx
  <Link href="/servicios/canales-digitales" className="group inline-flex items-center gap-3 mt-10 text-[11px] font-bold tracking-[0.25em] uppercase text-primary/70 hover:text-primary transition-colors">
    <span>Auditoría de canales digitales</span>
    <span className="w-4 h-px bg-current transition-all duration-300 group-hover:w-8" />
  </Link>
  ```
- Update the file comment to "The six audit situations of section E, each linking to its page."

- [ ] **Step 6: `ProcessSection.tsx` — drop the repeated sentence**

Delete the `<p>{audit.shortDescription}</p>`. The H2 already says "Cuatro pasos, un mismo método". Keep the four steps.

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit && npm run lint`, then build + audit.
Expected: no banned text from these sections; remaining `/` failures (if any) are only in the CTA ("Ingresar a ESI"). Check every section at 375px and 1440px.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(home): outcomes, survey vs audit, benefits-only ESI, why Innvestiga and six situations"
```

---

### Task 11: Home lower — coverage, sectors, FAQ, CTA, page assembly

**Files:**
- Create: `src/components/home/SectorsSection.tsx`, `src/components/home/HomeFaq.tsx`
- Modify: `src/components/home/CoverageSplit.tsx`, `src/components/home/CTASection.tsx`, `src/app/page.tsx`

**Interfaces:**
- Consumes: `COVERAGE`, `coverageHref`, `STATS`, `HOME_FAQS`, `pageMetadata`, `JsonLd`, `organizationSchema`, `websiteSchema`, `faqPageSchema`
- Produces: `<HomeFaq items={FaqItem[]} />`, reused by `/preguntas-frecuentes` in Milestone 2

- [ ] **Step 1: Rewrite `CoverageSplit.tsx`**

- Kicker `Cobertura Regional` (keep). Add the H2 above the grid:
  ```tsx
  <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase leading-[0.95] tracking-tight text-ink mb-10">
    Auditamos en 8 países.{" "}
    <span className="text-gold-gradient">Podemos evaluar cualquier punto de venta.</span>
  </h2>
  ```
- Replace `countries` with `COVERAGE`. Use the grid `grid-cols-2 md:grid-cols-4 gap-3`. Each card is a `<Link href={coverageHref(c)}>` with `className={... + (c.priority ? " col-span-2 p-7" : " p-5")}`. It shows the name (`text-[11px]`, or `text-base` when priority) and `{c.count.toLocaleString("en-US")} {c.unit}`. Drop the flag and the departments.
- Link text `Ver mapa interactivo` → `Ver cobertura completa`.
- Right column: keep the giant `STATS.countries` counter with label `Países`. Replace the departments + municipalities pair with a single `<AnimatedCounter end={STATS.municipalities} />` labelled `Municipios`. Delete the `departments` block and its divider.

- [ ] **Step 2: Create `SectorsSection.tsx`**

```tsx
const SECTORS = [
  "telefonía celular", "banca y tarjetas de crédito", "calzado", "ferreterías", "electrodomésticos",
  "centros comerciales", "repuestos automotrices", "farmacéutico", "supermercados", "comida rápida",
  "productos de consumo masivo", "turismo",
];

export default function SectorsSection() {
  return (
    <section className="bg-surface border-t border-border py-20 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight text-ink">
          Sectores donde hemos trabajado
        </h2>
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {SECTORS.map((s) => (
            <li key={s} className="rounded-full border border-border bg-surface-alt px-4 py-2 text-[13px] text-body first-letter:uppercase">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `HomeFaq.tsx`** (server component; `<details>` keeps the answers in the HTML)

```tsx
import Link from "next/link";
import type { FaqItem } from "@/data/faq";

export default function HomeFaq({ items, showAllLink = true }: { items: FaqItem[]; showAllLink?: boolean }) {
  return (
    <section className="bg-bg border-t border-border py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight text-ink">Preguntas frecuentes</h2>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {items.map((f) => (
            <details key={f.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[16px] font-semibold text-ink focus-visible:outline-2 focus-visible:outline-primary">
                <h3 style={{ textTransform: "none", letterSpacing: "normal" }} className="font-body text-[16px] font-semibold">
                  {f.question}
                </h3>
                <span aria-hidden="true" className="mt-0.5 text-primary transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[15px] text-body leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
        {showAllLink && (
          <Link href="/preguntas-frecuentes" className="inline-block mt-8 text-[11px] font-bold tracking-[0.25em] uppercase text-primary/70 hover:text-primary">
            Ver todas las preguntas
          </Link>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: `CTASection.tsx`**

- Button 1 label → `Solicitar prueba piloto`. Replace button 2 (`Ingresar a ESI`) with `<Button href="/demo" variant="outline">Agendar demo</Button>` and remove the `CONTACT` import.
- Add `aria-hidden="true"` to the marquee wrapper `div`.
- Keep the headline and the subline text.

- [ ] **Step 5: Assemble `src/app/page.tsx`**

```tsx
import HeroSection from "@/components/home/HeroSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import ESISection from "@/components/home/ESISection";
import WhySection from "@/components/home/WhySection";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProcessSection from "@/components/home/ProcessSection";
import VisionReveal from "@/components/home/VisionReveal";
import CoverageSplit from "@/components/home/CoverageSplit";
import SectorsSection from "@/components/home/SectorsSection";
import HomeFaq from "@/components/home/HomeFaq";
import CTASection from "@/components/home/CTASection";
import JsonLd from "@/components/seo/JsonLd";
import { HOME_FAQS } from "@/data/faq";
import { faqPageSchema, organizationSchema, websiteSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/",
  title: "Auditorías CX: Cliente Oculto y Mystery Shopper | Innvestiga",
  description:
    "Auditorías CX con cliente oculto (mystery shopper) en 8 países y 1,282 municipios de Mesoamérica y el Caribe. Resultados en 3 días. Solicita tu prueba piloto.",
});

// Home, in the order of spec section D: the ask, what an audit gives you,
// survey vs audit, ESI, why Innvestiga, the six situations, the method,
// the hook, coverage, sectors, FAQ, the pilot.
export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema(), faqPageSchema(HOME_FAQS)]} />
      <HeroSection />
      <BenefitsSection />
      <ESISection />
      <WhySection />
      <ServicesGrid />
      <ProcessSection />
      <VisionReveal />
      <CoverageSplit />
      <SectorsSection />
      <HomeFaq items={HOME_FAQS} />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 6: Delete the leftovers**

```bash
grep -rn "ServicesCarousel\|benefitIcons\|BENEFIT_ICONS" src
```

Expected: only the files themselves. Then `git rm src/components/home/ServicesCarousel.tsx src/lib/benefitIcons.tsx`.

- [ ] **Step 7: Verify**

Build + audit.
Expected: `/` has zero failures. Paste the home URL's HTML into https://search.google.com/test/rich-results (or run it on the staging URL after deploy) and expect Organization and FAQ detected with no errors. Then `npx tsc --noEmit && npm run lint && npm test`.

Check the whole home at 375px and 1440px, and run Lighthouse mobile on `/` (production build). Target LCP < 2.5 s; record the number in the commit body.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(home): coverage by country, sectors, FAQ with FAQPage schema and demo CTA"
```

---

### Task 12: `/contacto` as the pilot request page

**Files:**
- Create: `src/lib/pilotForm.ts`
- Modify: `src/app/contacto/layout.tsx`, `src/app/contacto/page.tsx`, `src/components/contacto/ContactForm.tsx`, `src/components/contacto/OfficeLocations.tsx`
- Test: `src/lib/pilotForm.test.ts`

**Interfaces:**
- Consumes: `COVERAGE`, `trackEvent`, `sendContactEmail`, `PILOT_SCOPE`, `PILOT_FOLLOW_UP`, `CONTACT`, `whatsappHref`
- Produces:
  - `interface PilotLead { name; company; position; country; branches; email; whatsapp; concern: string }`
  - `leadFromFormData(fd: FormData): PilotLead`
  - `buildPilotMessage(lead: PilotLead): string`
  - `pilotAnalyticsParams(lead: PilotLead): { country: string; branches: string }`
  - `PILOT_LEAD_STORAGE_KEY = "innvestiga:pilot-lead"`
  - `storeLead(storage: Pick<Storage, "setItem"> | null, lead: PilotLead): void`
  - `readStoredLead(storage: Pick<Storage, "getItem"> | null): { name: string; company: string } | null`
  - `thankYouMessage(lead: { name: string; company: string } | null, followUp: { executive: string | null; hours: number | null }): string`

- [ ] **Step 1: Write the failing test** — `src/lib/pilotForm.test.ts`

```ts
import { describe, expect, it } from "vitest";
import {
  buildPilotMessage, leadFromFormData, pilotAnalyticsParams,
  readStoredLead, storeLead, thankYouMessage, PILOT_LEAD_STORAGE_KEY,
} from "./pilotForm";

const fd = () => {
  const f = new FormData();
  f.set("user_name", "  Ana López ");
  f.set("company_name", "Tiendas Sol");
  f.set("position", "Gerente CX");
  f.set("country", "El Salvador");
  f.set("branches", "25");
  f.set("user_email", "ana@sol.com");
  f.set("whatsapp", "+503 7000 0000");
  f.set("concern", "Los tiempos de espera.");
  return f;
};

describe("leadFromFormData", () => {
  it("trims every field", () => {
    expect(leadFromFormData(fd()).name).toBe("Ana López");
  });

  it("returns empty strings for missing fields", () => {
    expect(leadFromFormData(new FormData()).concern).toBe("");
  });
});

describe("buildPilotMessage", () => {
  it("lists every answer with its Spanish label", () => {
    const msg = buildPilotMessage(leadFromFormData(fd()));
    expect(msg).toContain("Nombre: Ana López");
    expect(msg).toContain("País: El Salvador");
    expect(msg).toContain("WhatsApp: +503 7000 0000");
    expect(msg).toContain("¿Qué es lo que más te preocupa de la atención en tus sucursales hoy?\nLos tiempos de espera.");
  });
});

describe("pilotAnalyticsParams", () => {
  it("sends no personal data to analytics", () => {
    expect(pilotAnalyticsParams(leadFromFormData(fd()))).toEqual({ country: "El Salvador", branches: "25" });
  });
});

describe("lead storage", () => {
  it("round-trips only name and company", () => {
    const store = new Map<string, string>();
    const storage = { setItem: (k: string, v: string) => store.set(k, v), getItem: (k: string) => store.get(k) ?? null };
    storeLead(storage, leadFromFormData(fd()));
    expect(JSON.parse(store.get(PILOT_LEAD_STORAGE_KEY)!)).toEqual({ name: "Ana López", company: "Tiendas Sol" });
    expect(readStoredLead(storage)).toEqual({ name: "Ana López", company: "Tiendas Sol" });
  });

  it("survives missing, blocked or corrupt storage", () => {
    expect(readStoredLead(null)).toBeNull();
    expect(readStoredLead({ getItem: () => { throw new Error("blocked"); } })).toBeNull();
    expect(readStoredLead({ getItem: () => "{not json" })).toBeNull();
    expect(() => storeLead({ setItem: () => { throw new Error("quota"); } }, leadFromFormData(fd()))).not.toThrow();
  });
});

describe("thankYouMessage", () => {
  const lead = { name: "Ana", company: "Tiendas Sol" };

  it("uses the spec sentence once executive and hours are known", () => {
    expect(thankYouMessage(lead, { executive: "Carlos", hours: 24 })).toBe(
      "Gracias, Ana. Carlos te escribirá en menos de 24 horas con una propuesta de prueba piloto pensada para Tiendas Sol.",
    );
  });

  it("drops the unconfirmed promise while the follow-up is pending", () => {
    expect(thankYouMessage(lead, { executive: null, hours: null })).toBe(
      "Gracias, Ana. Te escribiremos con una propuesta de prueba piloto pensada para Tiendas Sol.",
    );
  });

  it("falls back to a generic thank-you without a lead", () => {
    expect(thankYouMessage(null, { executive: "Carlos", hours: 24 })).toBe(
      "Gracias. Recibimos tu solicitud y te escribiremos con una propuesta de prueba piloto.",
    );
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/lib/pilotForm.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/pilotForm.ts`**

```ts
export interface PilotLead {
  name: string;
  company: string;
  position: string;
  country: string;
  branches: string;
  email: string;
  whatsapp: string;
  concern: string;
}

export const CONCERN_QUESTION = "¿Qué es lo que más te preocupa de la atención en tus sucursales hoy?";
export const PILOT_LEAD_STORAGE_KEY = "innvestiga:pilot-lead";

// Field names match the EmailJS templates (notification + auto-reply).
export function leadFromFormData(fd: FormData): PilotLead {
  const get = (key: string) => String(fd.get(key) ?? "").trim();
  return {
    name: get("user_name"),
    company: get("company_name"),
    position: get("position"),
    country: get("country"),
    branches: get("branches"),
    email: get("user_email"),
    whatsapp: get("whatsapp"),
    concern: get("concern"),
  };
}

export function buildPilotMessage(lead: PilotLead): string {
  return [
    `Nombre: ${lead.name}`,
    `Empresa: ${lead.company}`,
    `Cargo: ${lead.position}`,
    `País: ${lead.country}`,
    `Número de sucursales: ${lead.branches}`,
    `Correo: ${lead.email}`,
    `WhatsApp: ${lead.whatsapp}`,
    "",
    CONCERN_QUESTION,
    lead.concern,
  ].join("\n");
}

// Analytics must never receive personal data.
export function pilotAnalyticsParams(lead: PilotLead): { country: string; branches: string } {
  return { country: lead.country, branches: lead.branches };
}

export function storeLead(storage: Pick<Storage, "setItem"> | null, lead: PilotLead): void {
  try {
    storage?.setItem(PILOT_LEAD_STORAGE_KEY, JSON.stringify({ name: lead.name, company: lead.company }));
  } catch {
    // Private mode or quota: /gracias falls back to the generic message.
  }
}

export function readStoredLead(storage: Pick<Storage, "getItem"> | null): { name: string; company: string } | null {
  try {
    const raw = storage?.getItem(PILOT_LEAD_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { name?: unknown; company?: unknown };
    return typeof parsed.name === "string" && typeof parsed.company === "string" && parsed.name
      ? { name: parsed.name, company: parsed.company }
      : null;
  } catch {
    return null;
  }
}

export function thankYouMessage(
  lead: { name: string; company: string } | null,
  followUp: { executive: string | null; hours: number | null },
): string {
  if (!lead) return "Gracias. Recibimos tu solicitud y te escribiremos con una propuesta de prueba piloto.";
  if (followUp.executive && followUp.hours) {
    return `Gracias, ${lead.name}. ${followUp.executive} te escribirá en menos de ${followUp.hours} horas con una propuesta de prueba piloto pensada para ${lead.company}.`;
  }
  return `Gracias, ${lead.name}. Te escribiremos con una propuesta de prueba piloto pensada para ${lead.company}.`;
}
```

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/lib/pilotForm.test.ts`
Expected: PASS.

- [ ] **Step 5: Rewrite `ContactForm.tsx`**

Keep the existing `inputStyles`/`labelStyles` and the `Button`. The new form body:

```tsx
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { sendContactEmail } from "@/lib/emailjs";
import { trackEvent } from "@/lib/analytics";
import { COVERAGE } from "@/data/coverage";
import {
  CONCERN_QUESTION, buildPilotMessage, leadFromFormData, pilotAnalyticsParams, storeLead,
} from "@/lib/pilotForm";
import Button from "@/components/ui/Button";

const safeSessionStorage = () => {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

export default function ContactForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form || status === "sending") return;

    const lead = leadFromFormData(new FormData(form));
    // Every answer travels in {{message}} so the notification is complete
    // whatever fields the EmailJS template references.
    if (messageRef.current) messageRef.current.value = buildPilotMessage(lead);

    setStatus("sending");
    try {
      await sendContactEmail(form);
      trackEvent("pilot_form_submit", pilotAnalyticsParams(lead));
      storeLead(safeSessionStorage(), lead);
      router.push("/gracias");
    } catch {
      setStatus("error");
    }
  };

  const inputStyles = [
    "w-full bg-transparent",
    "border-b border-border hover:border-ink/20 focus:border-primary",
    "py-4 outline-none",
    "text-sm text-ink",
    "placeholder:text-muted/40",
    "transition-colors duration-300",
  ].join(" ");
  const labelStyles = "block text-[10px] font-bold tracking-[0.3em] uppercase text-muted mb-1";

  const field = (id: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label className={labelStyles} htmlFor={id}>{label}</label>
      <input id={id} name={id} className={inputStyles} {...props} />
    </div>
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="title" value="Solicitud de Prueba Piloto" />
      <input ref={messageRef} type="hidden" name="message" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {field("user_name", "Nombre *", { type: "text", required: true, autoComplete: "name", placeholder: "Nombre y apellido" })}
        {field("company_name", "Empresa *", { type: "text", required: true, autoComplete: "organization", placeholder: "Empresa S.A." })}
        {field("position", "Cargo *", { type: "text", required: true, autoComplete: "organization-title", placeholder: "Gerente de experiencia del cliente" })}
        <div>
          <label className={labelStyles} htmlFor="country">País *</label>
          <select id="country" name="country" required defaultValue="" className={`${inputStyles} bg-transparent`}>
            <option value="" disabled>Selecciona un país</option>
            {COVERAGE.map((c) => (
              <option key={c.slug} value={c.fullName}>{c.fullName}</option>
            ))}
          </select>
        </div>
        {field("branches", "Número de sucursales *", { type: "number", min: 1, inputMode: "numeric", required: true, placeholder: "Ej. 25" })}
        {field("user_email", "Correo *", { type: "email", required: true, autoComplete: "email", placeholder: "nombre@empresa.com" })}
        {field("whatsapp", "WhatsApp *", { type: "tel", required: true, autoComplete: "tel", placeholder: "+503 0000 0000" })}
        <div className="md:col-span-2">
          <label className={labelStyles} htmlFor="concern">{CONCERN_QUESTION}</label>
          <textarea id="concern" name="concern" rows={4} className={`${inputStyles} resize-none`} />
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" variant="gold" className="w-full">
          {status === "sending" ? "Enviando..." : status === "error" ? "Error — Reintentar" : "Solicitar prueba piloto"}
        </Button>
      </div>

      {status === "error" && (
        <p role="alert" className="text-center text-sm text-red-700 mt-4">
          No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos a info@innvestiga.com.
        </p>
      )}
    </form>
  );
}
```

The country order is El Salvador, Guatemala, then the rest, which is `COVERAGE` order. `Button` must forward `disabled`? No: the `status === "sending"` guard in `handleSubmit` already blocks double submits.

- [ ] **Step 6: Rewrite the page and its metadata**

`src/app/contacto/layout.tsx`:

```tsx
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contacto",
  title: "Prueba Piloto de Auditoría CX y Contacto | Innvestiga",
  description:
    "Comprueba el método en tus propias sucursales antes de decidir. Solicita tu prueba piloto de auditoría CX en toda Centroamérica.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

`src/app/contacto/page.tsx` changes:
- H1: `Comprueba en tus propias sucursales{" "}<span className="text-gold-gradient">lo que realmente pasa.</span>`
- Kicker `Ponte en Contacto` → `Prueba piloto`.
- Lead paragraph: `La prueba piloto te permite ver el método y la evidencia en tu operación antes de tomar una decisión.` and, right after it, `{PILOT_SCOPE && <p className="mt-4 …">{PILOT_SCOPE}</p>}`.
- Section order: hero → form section (`id="prueba-piloto"`, with the form in the left column and the `SectionHeading` titled `Cuéntanos sobre tu operación.`; subtitle removed) → a section below the form holding `<DirectChannels />` and `<OfficeLocations />`, each with its `SectionHeading` (`Contacto directo`, `Nuestras oficinas.`).
- The page stays `"use client"` (framer-motion). Metadata lives in the layout.

`OfficeLocations.tsx`: render `{office.googleBusinessUrl && <a href={office.googleBusinessUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary">Ver en Google</a>}` below the phone.

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit && npm run lint && npm test`.

With EmailJS env vars set, run `npm run dev`. Submit the form with real test data and check:
- the notification email arrives with every field in the message;
- the browser lands on `/gracias` (it 404s until Task 13);
- with `window.gtag = (...a) => console.log(a)` set first, the console shows `["event","pilot_form_submit",{country:"El Salvador",branches:"25"}]` and nothing personal.

Then submit with the network offline. Expected: the error message shows, the button reads "Error — Reintentar", and a second click retries.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(contacto): pilot request page with the new form, analytics without PII and contact channels below"
```

---

### Task 13: `/gracias`

**Files:**
- Create: `src/app/gracias/layout.tsx`, `src/app/gracias/page.tsx`

**Interfaces:**
- Consumes: `readStoredLead`, `thankYouMessage`, `PILOT_FOLLOW_UP`, `pageMetadata`

- [ ] **Step 1: Layout with noindex** — `src/app/gracias/layout.tsx`

```tsx
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/gracias",
  title: "Gracias por tu solicitud | Innvestiga",
  description: "Recibimos tu solicitud de prueba piloto de auditoría CX.",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- [ ] **Step 2: Page** — `src/app/gracias/page.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { PILOT_FOLLOW_UP } from "@/lib/constants";
import { readStoredLead, thankYouMessage } from "@/lib/pilotForm";

const safeSessionStorage = () => {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

export default function GraciasPage() {
  // Server HTML shows the generic line; the personalised one replaces it
  // after hydration when the form stored the lead in this tab.
  const [message, setMessage] = useState(() => thankYouMessage(null, PILOT_FOLLOW_UP));

  useEffect(() => {
    setMessage(thankYouMessage(readStoredLead(safeSessionStorage()), PILOT_FOLLOW_UP));
  }, []);

  return (
    <section className="min-h-[80vh] flex items-center bg-bg pt-40 pb-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h1 style={{ textTransform: "none" }} className="font-heading text-3xl md:text-5xl font-bold leading-tight text-ink">
          {message}
        </h1>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/demo" variant="gold">Agendar demo</Button>
          <Button href="/" variant="outline">Volver al inicio</Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Configure the automatic email (EmailJS dashboard, not code)**

In EmailJS, open the pilot template → **Auto-Reply** → enable it, set "To" to `{{user_email}}`, and use as body the same sentence `thankYouMessage` produces:
- while `PILOT_FOLLOW_UP` is pending: `Gracias, {{user_name}}. Te escribiremos con una propuesta de prueba piloto pensada para {{company_name}}.`
- once the client sends the data: `Gracias, {{user_name}}. <Ejecutivo> te escribirá en menos de <X> horas con una propuesta de prueba piloto pensada para {{company_name}}.`

Record in the PR description which version is live.

- [ ] **Step 4: Verify**

- Submit the form: `/gracias` reads "Gracias, Ana. Te escribiremos … para Tiendas Sol." and the auto-reply arrives at the submitted address.
- Open `/gracias` directly in a new private window. Expected: the generic sentence and no console error.
- `curl -s localhost:3000/gracias | grep -o '<meta name="robots"[^>]*>'` → contains `noindex`.
- Run the audit: `/gracias` is not in the sitemap, so it is not audited.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(gracias): noindex thank-you page personalised from the pilot form"
```

---

### Task 14: `/demo`

**Files:**
- Create: `src/lib/booking.ts`, `src/components/demo/BookingEmbed.tsx`, `src/app/demo/page.tsx`
- Test: `src/lib/booking.test.ts`

**Interfaces:**
- Consumes: `trackEvent`, `pageMetadata`, `CONTACT`
- Produces: `isBookingScheduledMessage(origin: string, data: unknown): boolean`, `<BookingEmbed url={string | undefined} />`

The plan assumes Calendly, the most common tool. If the client picks Cal.com or another tool, only `booking.ts` (message format) and the iframe `src` change.

- [ ] **Step 1: Write the failing test** — `src/lib/booking.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { isBookingScheduledMessage } from "./booking";

describe("isBookingScheduledMessage", () => {
  it("accepts Calendly's scheduled event", () => {
    expect(isBookingScheduledMessage("https://calendly.com", { event: "calendly.event_scheduled" })).toBe(true);
  });

  it("ignores other Calendly events", () => {
    expect(isBookingScheduledMessage("https://calendly.com", { event: "calendly.page_height" })).toBe(false);
  });

  it("ignores the same payload from another origin", () => {
    expect(isBookingScheduledMessage("https://evil.example", { event: "calendly.event_scheduled" })).toBe(false);
  });

  it("ignores non-object payloads", () => {
    expect(isBookingScheduledMessage("https://calendly.com", "calendly.event_scheduled")).toBe(false);
    expect(isBookingScheduledMessage("https://calendly.com", null)).toBe(false);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/lib/booking.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/booking.ts`**

```ts
const BOOKING_ORIGIN = "https://calendly.com";

// Calendly posts {event: "calendly.event_scheduled"} to the parent window
// when a visitor confirms a slot.
export function isBookingScheduledMessage(origin: string, data: unknown): boolean {
  return (
    origin === BOOKING_ORIGIN &&
    typeof data === "object" &&
    data !== null &&
    (data as { event?: unknown }).event === "calendly.event_scheduled"
  );
}
```

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/lib/booking.test.ts`
Expected: PASS.

- [ ] **Step 5: `BookingEmbed.tsx`**

```tsx
"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { isBookingScheduledMessage } from "@/lib/booking";
import { CONTACT } from "@/lib/constants";

export default function BookingEmbed({ url }: { url?: string }) {
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (isBookingScheduledMessage(e.origin, e.data)) trackEvent("demo_booking");
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!url) {
    return (
      <p className="rounded-2xl border border-border bg-surface p-8 text-center text-body">
        Escríbenos a{" "}
        <a href={`mailto:${CONTACT.email}?subject=Agendar%20demo`} className="text-primary font-semibold">
          {CONTACT.email}
        </a>{" "}
        o llámanos al{" "}
        <a href={CONTACT.phoneHref} className="text-primary font-semibold">{CONTACT.phone}</a>{" "}
        para agendar tu demo.
      </p>
    );
  }

  const src = `${url}${url.includes("?") ? "&" : "?"}hide_gdpr_banner=1&locale=es`;
  return (
    <iframe
      src={src}
      title="Calendario para agendar una demo con Innvestiga"
      loading="lazy"
      className="w-full h-[720px] rounded-2xl border border-border bg-surface"
    />
  );
}
```

- [ ] **Step 6: `src/app/demo/page.tsx`** (server component)

```tsx
import BookingEmbed from "@/components/demo/BookingEmbed";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/demo",
  title: "Agenda una Demo | Innvestiga",
  description:
    "Mira cómo recibirías la evidencia y los resultados de una auditoría CX en tu operación. Demo guiada de 30 minutos con datos de ejemplo.",
});

export default function DemoPage() {
  return (
    <>
      <section className="relative bg-bg pt-40 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary mb-6 block">Demo guiada</span>
          <h1 className="text-[clamp(1.8rem,6vw,4.5rem)] font-bold leading-[0.95] uppercase text-ink max-w-4xl">
            Mira cómo recibirías los resultados de{" "}
            <span className="text-gold-gradient">tu auditoría.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-body max-w-2xl leading-relaxed">
            En 30 minutos te mostramos, con datos de ejemplo, cómo ver la evidencia de cada visita, comparar tus sucursales y
            presentar resultados claros a tu equipo. La demo es guiada: no se entrega acceso a la plataforma.
          </p>
        </div>
      </section>
      <section className="bg-surface-alt py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <BookingEmbed url={process.env.NEXT_PUBLIC_BOOKING_URL} />
        </div>
      </section>
    </>
  );
}
```

There are no ESI screenshots or recordings on this page (spec C).

- [ ] **Step 7: Verify**

- Without `NEXT_PUBLIC_BOOKING_URL`: `/demo` shows the email/phone fallback.
- With a test Calendly URL: the calendar loads. Book a test slot with `window.gtag = (...a) => console.log(a)` set in the console. Expected: `["event","demo_booking",{}]`.
- Then run `npx tsc --noEmit && npm run lint && npm test`, and build + audit: `/demo` has zero failures.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(demo): demo booking page with embedded calendar and demo_booking event"
```

---

### Task 15: Redirects, blog noindex, final audit and staging deploy

**Files:**
- Modify: `next.config.ts`, `src/app/blog/layout.tsx`

- [ ] **Step 1: 301 for the removed case studies** — `next.config.ts`

Read `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/redirects.md` first and confirm `statusCode` is supported.

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle for a minimal Docker runtime image.
  output: "standalone",
  // statusCode 301 (not permanent: true, which sends 308) as the spec asks.
  async redirects() {
    return [
      { source: "/casos-de-exito", destination: "/servicios/auditorias", statusCode: 301 },
      { source: "/casos-de-exito/:path*", destination: "/servicios/auditorias", statusCode: 301 },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 2: Hide the blog** — `src/app/blog/layout.tsx`

The three posts in `src/data/blog.ts` are not real articles. They cite invented figures ("34% más retención") and use "líderes", which breaks the spec's "every claim and number appears in this document". Treat the blog as having no articles: noindex it, keep it out of the sitemap and footer (already done), and tell the client.

Set its metadata to:

```tsx
export const metadata = {
  ...pageMetadata({ path: "/blog", title: "Blog | Innvestiga", description: "Artículos sobre auditorías de experiencia del cliente." }),
  robots: { index: false, follow: false },
};
```

(import `pageMetadata`). Leave the existing layout body as it is.

- [ ] **Step 3: Full verification on a production build**

```bash
npx tsc --noEmit && npm run lint && npm test
NEXT_PUBLIC_SITE_ENV=production npm run build
npm start &
npm run audit:seo -- --base http://localhost:3000
```

Expected:
- the audit exits 0;
- warnings appear only for the `PENDING_REWRITE` pages;
- `/casos-de-exito` → 301;
- the robots check passes.

Copy the audit output into the PR description. Stop the server.

Manual checklist (record the results in the PR):
- [ ] "Acceso" in the header opens `https://esi3.innvestiga.com` in a new tab from `/`, `/contacto`, `/demo` and `/gracias`.
- [ ] "Acceso clientes" is visible on mobile at 375px.
- [ ] No "Ingresar a ESI", "Quiero conocer ESI", ESI module names, "Exploración Sistémica" or "3ª generación" anywhere (the audit covers indexed pages; also open `/blog` and `/gracias`).
- [ ] Lighthouse mobile on `/`, `/contacto` and `/demo`: LCP < 2.5 s, accessibility ≥ 90.
- [ ] Rich Results Test on `/` shows Organization and FAQ with no errors.
- [ ] Keyboard only: tabbing reaches both dropdowns, the form fields have visible focus and labels, and the FAQ items open with Enter.

- [ ] **Step 4: Deploy staging**

Build the staging image with `NEXT_PUBLIC_SITE_ENV=staging` and `NEXT_PUBLIC_SITE_URL=<staging origin>` (plus GA/booking/EmailJS values), deploy it, then run:

```bash
curl -s <staging>/robots.txt          # Disallow: /
curl -sI <staging>/casos-de-exito     # 301, location /servicios/auditorias
```

Send the staging link to the client for the Oct 22 review. Include the list of open inputs from the top of this plan and the note that `/cobertura/*`, `/servicios/auditorias/*` and `/preguntas-frecuentes` arrive in the Oct 28 staging.

- [ ] **Step 5: Commit, then hand off**

```bash
git add -A
git commit -m "feat(seo): 301 for case studies, noindex blog, milestone 1 audit passing"
```

Then use superpowers:finishing-a-development-branch to push and open the PR, but only after the user approves. The PR body must include the audit output, the Lighthouse numbers, the manual checklist and the open-inputs table.

Ops after launch (client or IT, not code; owned by Milestone 2's launch checklist): verify the domain in Google Search Console and Bing Webmaster Tools, submit `sitemap.xml`, set `esi3.innvestiga.com` to noindex (`X-Robots-Tag: noindex` on that app's server), and mark the GA4 key events.
