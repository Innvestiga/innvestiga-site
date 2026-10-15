import { siteUrl } from "@/lib/env";
import { COVERAGE } from "@/data/coverage";
import type { FaqItem } from "@/data/faq";
import { CONTACT, FOUNDING_YEAR, SITE_LEGAL_NAME, SITE_NAME, SOCIAL_PROFILES } from "@/lib/constants";

type Schema = Record<string, unknown>;

export const ORGANIZATION_ID = () => `${siteUrl()}/#organization`;

function areaServed(): Schema[] {
  return COVERAGE.map((c) =>
    c.slug === "chiapas-mexico"
      ? { "@type": "State", name: c.name, containedInPlace: { "@type": "Country", name: "México" } }
      : { "@type": "Country", name: c.name },
  );
}

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
    sameAs: SOCIAL_PROFILES.map((p) => p.url),
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
