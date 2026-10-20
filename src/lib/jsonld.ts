import { siteUrl } from "@/lib/env";
import { COVERAGE } from "@/data/coverage";
import type { FaqItem } from "@/data/faq";
import { CONTACT, FOUNDING_YEAR, GOOGLE_BUSINESS_URL, OFFICES, SITE_LEGAL_NAME, SITE_NAME, SOCIAL_PROFILES } from "@/lib/constants";
import type { CoverageZone } from "@/data/countryPages";

type Schema = Record<string, unknown>;

export const ORGANIZATION_ID = () => `${siteUrl()}/#organization`;

function place(c: (typeof COVERAGE)[number]): Schema {
  return c.slug === "chiapas-mexico"
    ? { "@type": "State", name: c.name, containedInPlace: { "@type": "Country", name: "México" } }
    : { "@type": "Country", name: c.name };
}

function areaServed(): Schema[] {
  return COVERAGE.map(place);
}

// One AdministrativeArea per coverage zone, containing its departments (or
// provinces, regions) and its main cities.
export function zoneAreas(country: (typeof COVERAGE)[number], zones: CoverageZone[]): Schema[] {
  const containedInPlace = place(country);
  return zones.map((z) => ({
    "@type": "AdministrativeArea",
    name: z.name,
    containedInPlace,
    containsPlace: [
      ...(z.divisions ?? []).map((name) => ({ "@type": "AdministrativeArea", name })),
      ...z.cities.map((name) => ({ "@type": "City", name })),
    ],
  }));
}

const absolute = (path: string) => (path === "/" ? `${siteUrl()}/` : `${siteUrl()}${path}`);

export function organizationSchema(): Schema {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID(),
    name: SITE_LEGAL_NAME,
    alternateName: SITE_NAME,
    url: `${url}/`,
    logo: `${url}/brand/logo`,
    foundingDate: String(FOUNDING_YEAR),
    areaServed: areaServed(),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phone,
      email: CONTACT.email,
      contactType: "sales",
      availableLanguage: ["es"],
    },
    sameAs: [...SOCIAL_PROFILES.map((p) => p.url), GOOGLE_BUSINESS_URL],
  };
}

export function websiteSchema(): Schema {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: `${url}/`,
    name: SITE_NAME,
    inLanguage: "es",
    publisher: { "@id": ORGANIZATION_ID() },
  };
}

export function faqPageSchema(items: FaqItem[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

// The audit is the service; scenario and country pages name a variant of it.
// `area` (a coverage slug) narrows areaServed to one country.
export function serviceSchema({
  name,
  path,
  description,
  area,
  zones,
}: {
  name: string;
  path: string;
  description: string;
  area?: string;
  /** Coverage zones of `area`, listed in areaServed. */
  zones?: CoverageZone[];
}): Schema {
  const country = area ? COVERAGE.find((c) => c.slug === area) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absolute(path),
    serviceType: "Auditoría con cliente oculto (mystery shopper)",
    provider: { "@id": ORGANIZATION_ID() },
    areaServed: country ? (zones?.length ? zoneAreas(country, zones) : place(country)) : areaServed(),
  };
}

export function localBusinessSchemas(areaServed?: Schema[]): Schema[] {
  return OFFICES.map((o) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl()}/#office-${o.countryCode.toLowerCase()}`,
    name: `${SITE_LEGAL_NAME} — ${o.city}`,
    url: `${siteUrl()}/`,
    image: `${siteUrl()}/brand/logo`,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: o.streetAddress,
      addressLocality: o.locality,
      addressRegion: o.region,
      postalCode: o.postalCode,
      addressCountry: o.countryCode,
    },
    parentOrganization: { "@id": ORGANIZATION_ID() },
    ...(areaServed ? { areaServed } : {}),
  }));
}

export function aboutPageSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: absolute("/nosotros"),
    name: "Sobre Innvestiga",
    inLanguage: "es",
    about: { "@id": ORGANIZATION_ID() },
  };
}
