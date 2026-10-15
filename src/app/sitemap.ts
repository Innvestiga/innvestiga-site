import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";
import { INDEXABLE_ROUTES } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return INDEXABLE_ROUTES.map((path) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
