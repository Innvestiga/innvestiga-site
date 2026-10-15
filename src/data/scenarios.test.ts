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
