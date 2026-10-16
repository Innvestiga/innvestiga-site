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
  it("uses the spec titles, which stay unique and near 60 characters", () => {
    expect(SCENARIOS.map((s) => s.title)).toEqual([
      "Auditoría del Proceso de Ventas en Tienda | Innvestiga",
      "Auditoría de Garantías en Retail | Innvestiga",
      "Auditoría de Manejo de Reclamos y Quejas | Innvestiga",
      "Auditoría de Reparaciones y Servicio Técnico | Innvestiga",
      "Auditoría de Política de Devoluciones y Cambios | Innvestiga",
      "Auditoría de Promociones y Precios en Tienda | Innvestiga",
    ]);
  });

  it("gives every page an H1, a first paragraph, checks and a decision", () => {
    for (const s of SCENARIOS) {
      expect(s.h1).toMatch(/^Auditoría .+\.$/);
      expect(s.intro.length).toBeGreaterThan(60);
      expect(s.description.length).toBeLessThanOrEqual(170);
      expect(s.checks.length).toBeGreaterThanOrEqual(4);
      expect(s.decision).toMatch(/\.$/);
    }
  });

  it("lists the seven sales-process checks of the spec", () => {
    expect(SCENARIOS[0].checks).toHaveLength(7);
  });
});
