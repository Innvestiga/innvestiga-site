import { describe, expect, it } from "vitest";
import { INDEXABLE_ROUTES } from "./routes";

describe("indexable routes", () => {
  it("covers every page of the inventory (section A)", () => {
    for (const path of [
      "/", "/nosotros", "/servicios", "/servicios/auditorias", "/servicios/canales-digitales",
      "/servicios/consumer-insights", "/cobertura", "/contacto", "/demo", "/preguntas-frecuentes", "/en",
      "/servicios/auditorias/garantias", "/cobertura/chiapas-mexico",
    ]) {
      expect(INDEXABLE_ROUTES).toContain(path);
    }
    expect(INDEXABLE_ROUTES).toHaveLength(11 + 6 + 8);
  });
});
