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

describe("scenario pages", () => {
  it("uses the client SEO titles (2026-10-20), unique and under 60 characters", () => {
    expect(SCENARIOS.map((s) => s.title)).toEqual([
      "Cliente oculto en proceso de ventas | Innvestiga",
      "Auditoría de garantías con cliente oculto | Innvestiga",
      "Cliente oculto en reclamos y conflictos | Innvestiga",
      "Cliente oculto en servicio técnico | Innvestiga",
      "Cliente oculto en devoluciones y cambios | Innvestiga",
      "Auditoría de promociones y precios | Innvestiga",
    ]);
  });

  it("gives every page an H1, a first paragraph, checks and a decision", () => {
    for (const s of SCENARIOS) {
      expect(s.h1).toMatch(/^Auditoría .+\.$/);
      expect(s.intro.length).toBeGreaterThan(60);
      expect(s.description.length).toBeLessThanOrEqual(170);
      expect(s.checks.length).toBeGreaterThanOrEqual(4);
      expect(s.decision).toMatch(/\.$/);
      expect(s.title.length).toBeLessThan(60);
      expect(s.evaluates.length).toBeGreaterThan(20);
      expect(s.purpose).toMatch(/\.$/);
    }
  });

  it("lists the seven sales-process checks of the spec", () => {
    expect(SCENARIOS[0].checks).toHaveLength(7);
  });
});
