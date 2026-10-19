import { describe, expect, it } from "vitest";
import { CONTACT, GA4_MEASUREMENT_ID, GOOGLE_BUSINESS_URL, NAV_LINKS, OFFICES, SOCIAL_PROFILES, STATS, whatsappHref } from "./constants";

describe("constants", () => {
  it("uses the single phone number and a dialable tel link", () => {
    expect(CONTACT.phone).toBe("+502 2277 7220");
    expect(CONTACT.phoneHref).toBe("tel:+50222777220");
  });

  it("states the spec numbers", () => {
    expect(STATS).toEqual({ yearsExperience: 18, countries: 8, municipalities: 1282 });
  });

  it("keeps the menu structure with dropdowns on Servicios and Cobertura", () => {
    expect(NAV_LINKS.map((l) => l.label)).toEqual(["Nosotros", "Servicios", "Cobertura", "Contacto"]);
    expect(NAV_LINKS[1].children?.length).toBe(8);
    expect(NAV_LINKS[2].children?.length).toBe(8);
  });

  it("keeps LinkedIn as the only active social profile (WhatsApp is linked separately)", () => {
    expect(SOCIAL_PROFILES.map((p) => p.url)).toEqual(["https://www.linkedin.com/company/innvestiga"]);
  });

  it("builds a wa.me link only when a WhatsApp number is configured", () => {
    expect(whatsappHref("")).toBeNull();
    expect(whatsappHref("+502 5555 1234")).toBe("https://wa.me/50255551234");
  });

  it("uses the client's WhatsApp Business number, GA4 property and Google Business profile", () => {
    expect(CONTACT.whatsapp).toBe("+502 2277 7220");
    expect(whatsappHref()).toBe("https://wa.me/50222777220");
    expect(GA4_MEASUREMENT_ID).toBe("G-3N1LL20CKL");
    expect(GOOGLE_BUSINESS_URL).toBe("https://share.google/0iOxKKg89kGZD7o7h");
  });

  it("lists the two offices with their street addresses", () => {
    expect(OFFICES.map((o) => [o.streetAddress, o.locality, o.region])).toEqual([
      ["12 Avenida B 5-98, Zona 8", "Mixco", "Guatemala"],
      ["Calle Cuscatlán No.133, Colonia Escalón", "San Salvador", "San Salvador"],
    ]);
  });
});
