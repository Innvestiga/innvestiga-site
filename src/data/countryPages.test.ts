import { describe, expect, it } from "vitest";
import { COVERAGE } from "./coverage";
import { COUNTRY_PAGES, countryPage, countryPageWords } from "./countryPages";

const sentences = (text: string) =>
  text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.split(" ").length >= 6);

describe("country pages", () => {
  it("has one page per coverage country, in the same order", () => {
    expect(COUNTRY_PAGES.map((p) => p.slug)).toEqual(COVERAGE.map((c) => c.slug));
  });

  it("meets the spec word counts: 400 for the priority countries, 300 for the rest", () => {
    for (const c of COVERAGE) {
      expect(countryPageWords(countryPage(c.slug)!), c.slug).toBeGreaterThanOrEqual(c.priority ? 400 : 300);
    }
  });

  it("has 3 local FAQs for the priority countries and 2 for the rest", () => {
    for (const c of COVERAGE) expect(countryPage(c.slug)!.faqs, c.slug).toHaveLength(c.priority ? 3 : 2);
  });

  it("never copies a sentence between countries", () => {
    const owner = new Map<string, string>();
    for (const page of COUNTRY_PAGES) {
      const text = [...page.coverage, ...page.howWeWork, ...page.faqs.map((f) => `${f.question} ${f.answer}`)].join(" ");
      for (const s of sentences(text)) {
        expect(owner.get(s) ?? page.slug, `"${s}" repeated in ${page.slug}`).toBe(page.slug);
        owner.set(s, page.slug);
      }
    }
  });

  it("names offices only in El Salvador and Guatemala", () => {
    for (const page of COUNTRY_PAGES.filter((p) => !["el-salvador", "guatemala"].includes(p.slug))) {
      const text = JSON.stringify(page).toLowerCase();
      expect(text, page.slug).not.toMatch(/oficina/);
    }
  });

  it("states that the operation reaches any point of sale in the six other countries", () => {
    for (const page of COUNTRY_PAGES.filter((p) => !["el-salvador", "guatemala"].includes(p.slug))) {
      expect(page.coverage.join(" "), page.slug).toMatch(/cualquier punto de venta/);
    }
  });

  it("never renders a bracketed placeholder", () => {
    for (const page of COUNTRY_PAGES) {
      const text = [page.intro, ...page.regions.flatMap((r) => [r.name, ...r.cities]), ...page.coverage, ...page.howWeWork, ...page.faqs.flatMap((f) => [f.question, f.answer])];
      for (const t of text) expect(t).not.toMatch(/\[|\]/);
    }
  });
});

describe("country coverage lists (client content, 2026-10-19)", () => {
  // Rows per country as delivered: departments, provinces or regions,
  // plus the metro-area and grouped rows the client added.
  const ROWS: Record<string, number> = {
    "el-salvador": 14,
    guatemala: 22, // the GAM row stands for the Guatemala department
    honduras: 18,
    nicaragua: 17,
    "costa-rica": 7,
    panama: 11,
    "republica-dominicana": 10,
    "chiapas-mexico": 8,
  };

  it("has the client's intro and every row of its table", () => {
    for (const page of COUNTRY_PAGES) {
      expect(page.intro.length, page.slug).toBeGreaterThan(100);
      expect(page.regions, page.slug).toHaveLength(ROWS[page.slug]);
      for (const r of page.regions) expect(r.cities.length, `${page.slug} ${r.name}`).toBeGreaterThan(0);
    }
  });

  it("keeps the client's wording for the first rows", () => {
    expect(countryPage("guatemala")!.regions[0]).toEqual({
      name: "Gran Área Metropolitana (GAM)",
      cities: ["Ciudad de Guatemala", "Mixco", "Villa Nueva", "San José Pinula", "Santa Catarina Pinula", "Chinautla", "Amatitlán"],
    });
    expect(countryPage("republica-dominicana")!.regions.at(-1)).toMatchObject({ name: "Provincias Adicionales", areas: true });
    expect(countryPage("republica-dominicana")!.regions.at(-1)!.cities).toHaveLength(22);
    expect(countryPage("panama")!.regions.at(-1)).toMatchObject({ name: "Comarcas", areas: true });
  });
});
