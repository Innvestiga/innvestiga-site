import { afterEach, describe, expect, it, vi } from "vitest";
import sitemap from "./sitemap";

afterEach(() => vi.unstubAllEnvs());

describe("sitemap", () => {
  it("lists absolute URLs for every indexable route and never the thank-you page", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com");
    const urls = sitemap().map((e) => e.url);
    expect(urls[0]).toBe("https://example.com/");
    expect(urls).toContain("https://example.com/contacto");
    expect(urls).not.toContain("https://example.com/demo");
    expect(urls.some((u) => u.includes("/gracias") || u.includes("/blog") || u.includes("casos"))).toBe(false);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
