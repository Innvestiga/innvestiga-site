import type { MetadataRoute } from "next";
import { isProduction, siteUrl } from "@/lib/env";

export const AI_CRAWLERS = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Bingbot"];

export default function robots(): MetadataRoute.Robots {
  if (!isProduction()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
