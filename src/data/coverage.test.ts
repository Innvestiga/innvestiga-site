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
