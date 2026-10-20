import { describe, expect, it } from "vitest";
import { INDEXABLE_ROUTES } from "./routes";

describe("indexable routes", () => {
  it("covers every page of the inventory (section A)", () => {
    for (const path of [
      "/", "/nosotros", "/servicios", "/servicios/auditorias", "/servicios/canales-digitales",
      "/cobertura", "/contacto", "/preguntas-frecuentes", "/en",
      "/servicios/auditorias/garantias", "/cobertura/chiapas-mexico",
    ]) {
      expect(INDEXABLE_ROUTES).toContain(path);
    }
    expect(INDEXABLE_ROUTES).not.toContain("/demo");
    expect(INDEXABLE_ROUTES).not.toContain("/servicios/consumer-insights");
    expect(INDEXABLE_ROUTES).toHaveLength(9 + 6 + 8);
  });
});
