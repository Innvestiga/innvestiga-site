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
      "Guatemala", "Honduras", "El Salvador", "Nicaragua", "Costa Rica",
      "Panamá", "República Dominicana", "Chiapas",
    ]);
    expect(org.contactPoint.telephone).toBe("+502 2277 7220");
  });

  it("links LinkedIn and the Google Business profile", () => {
    expect(org.sameAs).toEqual(["https://www.linkedin.com/company/innvestiga-cx-specialists", "https://share.google/0iOxKKg89kGZD7o7h"]);
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
    expect(offices.map((o) => o.address.addressLocality)).toEqual(["Mixco", "San Salvador"]);
    expect(offices[0].address.streetAddress).toBe("12 Avenida B 5-98, Zona 8");
    expect(offices[1].address.streetAddress).toBe("Calle Cuscatlán No.133, Colonia Escalón");
    for (const o of offices) {
      expect(o["@type"]).toBe("LocalBusiness");
      expect(o.telephone).toBe("+502 2277 7220");
      expect(o.parentOrganization["@id"]).toMatch(/#organization$/);
      expect(o.priceRange).toBe("$$");
    }
    expect(offices.map((o) => o.name)).toEqual([
      "Innvestiga Market Specialists — Ciudad de Guatemala",
      "Innvestiga Market Specialists — San Salvador",
    ]);
    expect(offices.map((o) => o.address.postalCode)).toEqual(["01057", "01101"]);
  });

  it("maps each zone with its divisions and cities in areaServed when zones are given", async () => {
    const { serviceSchema } = await import("./jsonld");
    const svc = serviceSchema({
      name: "n",
      path: "/cobertura/panama",
      description: "d",
      area: "panama",
      zones: [{ name: "Chiriquí y Bocas del Toro", divisions: ["Chiriquí"], cities: ["David", "Boquete"] }],
    }) as Json;
    expect(svc.areaServed).toEqual([
      {
        "@type": "AdministrativeArea",
        name: "Chiriquí y Bocas del Toro",
        containedInPlace: { "@type": "Country", name: "Panamá" },
        containsPlace: [
          { "@type": "AdministrativeArea", name: "Chiriquí" },
          { "@type": "City", name: "David" },
          { "@type": "City", name: "Boquete" },
        ],
      },
    ]);
  });

  it("links the Google Business profile from the organization", () => {
    expect((organizationSchema() as Json).sameAs).toContain("https://share.google/0iOxKKg89kGZD7o7h");
  });

  it("builds an AboutPage about the organization", async () => {
    const { aboutPageSchema } = await import("./jsonld");
    const about = aboutPageSchema() as Json;
    expect(about["@type"]).toBe("AboutPage");
    expect(about.about["@id"]).toMatch(/#organization$/);
  });
});
