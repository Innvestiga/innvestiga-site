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
      const text = [...page.cities, ...page.coverage, ...page.howWeWork, ...page.faqs.flatMap((f) => [f.question, f.answer])];
      for (const t of text) expect(t).not.toMatch(/\[|\]/);
    }
  });
});
