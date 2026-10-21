import type { MetadataRoute } from "next";
import { isProduction, siteUrl } from "@/lib/env";

// Search and AI crawlers named explicitly (client spec, 2026-10-20).
export const AI_CRAWLERS = ["OAI-SearchBot", "GPTBot", "ClaudeBot", "PerplexityBot", "Googlebot", "Google-Extended", "Bingbot"];

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
