// The production origin until the client confirms another domain.
const DEFAULT_SITE_URL = "https://main.innvestiga.com";

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

// Only an explicit production build may be indexed; staging and local
// builds default to noindex so a review link never reaches search results.
export function isProduction(): boolean {
  return process.env.NEXT_PUBLIC_SITE_ENV === "production";
}

// GA4 loads on production builds with the client's property, or wherever
// NEXT_PUBLIC_GA_ID is set; staging and local builds send nothing.
export function gaMeasurementId(defaultId: string): string | undefined {
  return process.env.NEXT_PUBLIC_GA_ID || (isProduction() ? defaultId : undefined);
}
