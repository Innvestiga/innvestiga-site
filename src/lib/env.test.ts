import { afterEach, describe, expect, it, vi } from "vitest";
import { gaMeasurementId } from "./env";

afterEach(() => vi.unstubAllEnvs());

describe("gaMeasurementId", () => {
  it("uses the client's property on production builds", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "");
    expect(gaMeasurementId("G-3N1LL20CKL")).toBe("G-3N1LL20CKL");
  });

  it("sends nothing from staging or local builds", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_ENV", "staging");
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "");
    expect(gaMeasurementId("G-3N1LL20CKL")).toBeUndefined();
  });

  it("lets NEXT_PUBLIC_GA_ID override the default", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-OTHER");
    expect(gaMeasurementId("G-3N1LL20CKL")).toBe("G-OTHER");
  });
});
