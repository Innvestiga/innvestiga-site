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

describe("page schemas", () => {
  it("builds a BreadcrumbList with absolute URLs", async () => {
    const { breadcrumbSchema } = await import("./jsonld");
    const crumbs = breadcrumbSchema([
      { name: "Inicio", path: "/" },
      { name: "Servicios", path: "/servicios" },
    ]) as Json;
    expect(crumbs["@type"]).toBe("BreadcrumbList");
    expect(crumbs.itemListElement[1]).toMatchObject({ "@type": "ListItem", position: 2, name: "Servicios" });
    expect(crumbs.itemListElement[1].item).toMatch(/^https?:\/\/.+\/servicios$/);
  });

  it("builds a Service provided by the organization, with its area", async () => {
    const { serviceSchema } = await import("./jsonld");
    const svc = serviceSchema({ name: "Auditoría de garantías", path: "/x", description: "d", area: "guatemala" }) as Json;
    expect(svc["@type"]).toBe("Service");
    expect(svc.serviceType).toBe("Auditoría con cliente oculto (mystery shopper)");
    expect(svc.provider["@id"]).toMatch(/#organization$/);
    expect(svc.areaServed).toEqual({ "@type": "Country", name: "Guatemala" });
    const all = serviceSchema({ name: "n", path: "/y", description: "d" }) as Json;
    expect(all.areaServed).toHaveLength(8);
  });

  it("builds one LocalBusiness per office with the shared phone", async () => {
    const { localBusinessSchemas } = await import("./jsonld");
    const offices = localBusinessSchemas() as Json[];
    expect(offices.map((o) => o.address.addressLocality)).toEqual(["Guatemala City", "San Salvador"]);
    for (const o of offices) {
      expect(o["@type"]).toBe("LocalBusiness");
      expect(o.telephone).toBe("+502 2277 7220");
      expect(o.parentOrganization["@id"]).toMatch(/#organization$/);
    }
  });

  it("builds an AboutPage about the organization", async () => {
    const { aboutPageSchema } = await import("./jsonld");
    const about = aboutPageSchema() as Json;
    expect(about["@type"]).toBe("AboutPage");
    expect(about.about["@id"]).toMatch(/#organization$/);
  });
});
