import { describe, expect, it } from "vitest";
import { faqPageSchema, organizationSchema, websiteSchema } from "./jsonld";

type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

describe("organizationSchema", () => {
  const org = organizationSchema() as Json;

  it("names the company as the spec requires", () => {
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe("Innvestiga Market Specialists");
    expect(org.alternateName).toBe("Innvestiga");
    expect(org.foundingDate).toBe("2008");
  });

  it("serves the 8 areas in order and the single phone", () => {
    expect(org.areaServed.map((a: { name: string }) => a.name)).toEqual([
      "El Salvador", "Guatemala", "Honduras", "Nicaragua", "Costa Rica",
      "Panamá", "República Dominicana", "Chiapas",
    ]);
    expect(org.contactPoint.telephone).toBe("+502 2277 7220");
  });

  it("links the six social profiles", () => {
    expect(org.sameAs).toHaveLength(6);
  });
});

describe("websiteSchema", () => {
  it("points at the organization", () => {
    const site = websiteSchema() as Json;
    expect(site["@type"]).toBe("WebSite");
    expect(site.publisher["@id"]).toMatch(/#organization$/);
  });
});

describe("faqPageSchema", () => {
  it("maps questions to Question/Answer pairs", () => {
    const faq = faqPageSchema([{ question: "¿Q?", answer: "A." }]);
    expect(faq).toEqual({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [{ "@type": "Question", name: "¿Q?", acceptedAnswer: { "@type": "Answer", text: "A." } }],
    });
  });
});
