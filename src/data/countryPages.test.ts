import { describe, expect, it } from "vitest";
import { COVERAGE } from "./coverage";
import { COUNTRY_PAGES, countryPage, countryPageText } from "./countryPages";

const sentences = (text: string) =>
  text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.split(" ").length >= 6);

describe("country pages", () => {
  it("has one page per coverage country, in the same order", () => {
    expect(COUNTRY_PAGES.map((p) => p.slug)).toEqual(COVERAGE.map((c) => c.slug));
  });

  it("never copies a sentence between countries", () => {
    const owner = new Map<string, string>();
    for (const page of COUNTRY_PAGES) {
      for (const s of sentences(countryPageText(page).join(" "))) {
        expect(owner.get(s) ?? page.slug, `"${s}" repeated in ${page.slug}`).toBe(page.slug);
        owner.set(s, page.slug);
      }
    }
  });

  it("names offices only in Guatemala and El Salvador", () => {
    for (const page of COUNTRY_PAGES.filter((p) => !["el-salvador", "guatemala"].includes(p.slug))) {
      expect(JSON.stringify(page).toLowerCase(), page.slug).not.toMatch(/oficina/);
    }
  });

  it("never ranks one country above another or uses the banned wording", () => {
    for (const page of COUNTRY_PAGES) {
      const text = [page.description, ...countryPageText(page)].join(" ").toLowerCase();
      expect(text, page.slug).not.toMatch(/primero|prioridad|guatemala city|medimos|hemos auditado/);
    }
  });

  it("keeps meta descriptions unique and short enough for search results", () => {
    expect(new Set(COUNTRY_PAGES.map((p) => p.description)).size).toBe(COUNTRY_PAGES.length);
    for (const page of COUNTRY_PAGES) expect(page.description.length, page.slug).toBeLessThanOrEqual(160);
  });

  it("gives every zone subsection a unique anchor within its page", () => {
    for (const page of COUNTRY_PAGES) {
      const ids = page.zoneSections.map((z) => z.id);
      expect(new Set(ids).size, page.slug).toBe(ids.length);
      for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/);
    }
    expect(countryPage("guatemala")!.zoneSections.map((z) => z.id)).toEqual([
      "gam", "tierra-fria", "tierra-caliente", "oriente", "caribe-peten-verapaces",
    ]);
  });

  it("never renders a bracketed placeholder", () => {
    for (const page of COUNTRY_PAGES) {
      const text = [...countryPageText(page), ...page.zones.flatMap((z) => [z.name, ...(z.divisions ?? []), ...z.cities])];
      for (const t of text) expect(t).not.toMatch(/\[|\]/);
    }
  });
});

describe("country coverage tables (client content, 2026-10)", () => {
  const ZONES: Record<string, number> = {
    guatemala: 5,
    honduras: 5,
    "el-salvador": 6,
    nicaragua: 4,
    "costa-rica": 5,
    panama: 5,
    "republica-dominicana": 4,
    "chiapas-mexico": 4,
  };

  it("has every zone, with divisions exactly when the table has that column", () => {
    for (const page of COUNTRY_PAGES) {
      expect(page.zones, page.slug).toHaveLength(ZONES[page.slug]);
      for (const z of page.zones) {
        expect(z.cities.length, `${page.slug} ${z.name}`).toBeGreaterThan(0);
        expect(Boolean(z.divisions?.length), `${page.slug} ${z.name}`).toBe(Boolean(page.divisionsHeader));
      }
    }
  });

  it("keeps the client's wording for the first rows", () => {
    expect(countryPage("guatemala")!.zones[0]).toEqual({
      name: "Gran Área Metropolitana de Guatemala",
      divisions: ["Guatemala"],
      cities: ["Ciudad de Guatemala", "Mixco", "Villa Nueva", "San José Pinula", "Santa Catarina Pinula", "Chinautla", "Amatitlán"],
    });
    expect(countryPage("el-salvador")!.divisionsHeader).toBeUndefined();
    expect(countryPage("el-salvador")!.coverageClosing).toHaveLength(1);
  });
});
