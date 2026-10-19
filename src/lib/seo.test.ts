import { describe, expect, it } from "vitest";
import { OG_IMAGE, pageMetadata } from "./seo";

const meta = pageMetadata({
  path: "/nosotros",
  title: "Sobre Innvestiga | Innvestiga",
  description: "Quiénes somos.",
});

describe("pageMetadata", () => {
  it("uses the full title without the layout template", () => {
    expect(meta.title).toEqual({ absolute: "Sobre Innvestiga | Innvestiga" });
  });

  it("sets a canonical path", () => {
    expect(meta.alternates?.canonical).toBe("/nosotros");
  });

  it("repeats every Open Graph field because child segments overwrite openGraph", () => {
    expect(meta.openGraph).toMatchObject({
      locale: "es_LA",
      siteName: "Innvestiga",
      url: "/nosotros",
      title: "Sobre Innvestiga | Innvestiga",
      images: [OG_IMAGE],
    });
  });

  it("uses the large Twitter card", () => {
    expect(meta.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("only adds robots when asked to hide the page", () => {
    expect(meta.robots).toBeUndefined();
    expect(pageMetadata({ path: "/gracias", title: "t", description: "d", noindex: true }).robots).toEqual({
      index: false,
      follow: true,
    });
  });

  it("declares a 1200x630 image", () => {
    expect(OG_IMAGE).toMatchObject({ url: "/og", width: 1200, height: 630 });
  });
});

describe("pageMetadata languages", () => {
  it("adds hreflang alternates and the English locale when asked", () => {
    const en = pageMetadata({
      path: "/en",
      title: "t",
      description: "d",
      locale: "en_US",
      languages: { es: "/", en: "/en", "x-default": "/" },
    });
    expect(en.alternates?.languages).toEqual({ es: "/", en: "/en", "x-default": "/" });
    expect(en.openGraph).toMatchObject({ locale: "en_US" });
  });
});
