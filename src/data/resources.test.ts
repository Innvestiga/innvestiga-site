import { describe, expect, it } from "vitest";
import { RESOURCES, findResource, resourceHref } from "./resources";

describe("resources", () => {
  it("has the five guides of the content hub, in the footer order", () => {
    expect(RESOURCES.map(resourceHref)).toEqual([
      "/recursos/que-es-cliente-oculto",
      "/recursos/cliente-oculto-y-nps",
      "/recursos/cliente-oculto-recursos-humanos",
      "/recursos/journey-de-compra",
      "/recursos/como-elegir-empresa-cliente-oculto",
    ]);
  });

  it("keeps every title under 60 characters and every description under 170", () => {
    for (const r of RESOURCES) {
      expect(r.title.length).toBeLessThan(60);
      expect(r.description.length).toBeLessThanOrEqual(170);
    }
  });

  it("gives the provider guide the ten questions its title promises", () => {
    const guide = findResource("como-elegir-empresa-cliente-oculto")!;
    expect(guide.h1).toMatch(/10 preguntas/);
    expect(guide.questions).toHaveLength(10);
    for (const q of guide.questions!) {
      expect(q.question).toMatch(/^¿.+\?$/);
      expect(q.answer).toMatch(/\.$/);
    }
  });
});
