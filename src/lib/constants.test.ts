import { describe, expect, it } from "vitest";
import { CONTACT, NAV_LINKS, SOCIAL_PROFILES, STATS, whatsappHref } from "./constants";

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

  it("lists the six social profiles under @innvestiga", () => {
    expect(SOCIAL_PROFILES.map((p) => p.url)).toEqual([
      "https://www.linkedin.com/company/innvestiga",
      "https://www.youtube.com/@innvestiga",
      "https://www.tiktok.com/@innvestiga",
      "https://www.instagram.com/innvestiga",
      "https://www.facebook.com/innvestiga",
      "https://x.com/innvestiga",
    ]);
  });

  it("builds a wa.me link only when a WhatsApp number is configured", () => {
    expect(whatsappHref("")).toBeNull();
    expect(whatsappHref("+502 5555 1234")).toBe("https://wa.me/50255551234");
  });
});
