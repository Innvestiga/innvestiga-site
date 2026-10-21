import { afterEach, describe, expect, it, vi } from "vitest";
import robots, { AI_CRAWLERS } from "./robots";

afterEach(() => vi.unstubAllEnvs());

describe("robots", () => {
  it("blocks everything outside production", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_ENV", "staging");
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });

  it("allows public pages and the AI crawlers in production", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com/");
    const result = robots();
    expect(result.sitemap).toBe("https://example.com/sitemap.xml");
    expect(result.rules).toEqual([
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ]);
    expect(AI_CRAWLERS).toEqual(["OAI-SearchBot", "GPTBot", "ClaudeBot", "PerplexityBot", "Googlebot", "Google-Extended", "Bingbot"]);
  });
});
