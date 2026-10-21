import { describe, expect, it } from "vitest";
import { COVERAGE, TOTAL_MUNICIPALITIES, countryList, coverageHref } from "./coverage";

describe("coverage", () => {
  it("lists the eight countries in the spec order", () => {
    expect(COVERAGE.map((c) => c.name)).toEqual([
      "Guatemala", "Honduras", "El Salvador", "Nicaragua",
      "Costa Rica", "Panamá", "República Dominicana", "Chiapas, México",
    ]);
  });

  it("uses the spec slugs", () => {
    expect(COVERAGE.map(coverageHref)).toEqual([
      "/cobertura/guatemala", "/cobertura/honduras", "/cobertura/el-salvador",
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

  it("treats every country the same: no priority flag", () => {
    for (const c of COVERAGE) expect(Object.keys(c)).not.toContain("priority");
  });

  it("joins the names as Spanish prose in the fixed order", () => {
    expect(countryList()).toBe("Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica, Panamá, República Dominicana y Chiapas, México");
  });
});
