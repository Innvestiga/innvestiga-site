import type { Metadata } from "next";

export const OG_IMAGE = {
  url: "/og",
  width: 1200,
  height: 630,
  alt: "Innvestiga Market Specialists — Auditorías CX con Cliente Oculto",
} as const;

interface PageSeo {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}

// One place for per-page SEO. Next replaces (does not merge) nested objects
// such as openGraph from the layout, so every field is repeated here.
export function pageMetadata({ path, title, description, noindex }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_LA",
      siteName: "Innvestiga",
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: "@innvestiga",
      title,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
