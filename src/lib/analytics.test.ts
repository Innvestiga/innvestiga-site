import { afterEach, describe, expect, it, vi } from "vitest";
import { classifyContactLink, trackEvent } from "./analytics";

afterEach(() => vi.unstubAllGlobals());

describe("classifyContactLink", () => {
  it.each([
    ["tel:+50222777220", "phone_click"],
    ["https://wa.me/50255551234", "whatsapp_click"],
    ["https://api.whatsapp.com/send?phone=502", "whatsapp_click"],
    ["mailto:info@innvestiga.com", null],
    ["/contacto", null],
    ["https://esi3.innvestiga.com", null],
  ])("%s -> %s", (href, expected) => {
    expect(classifyContactLink(href)).toBe(expected);
  });
});

describe("trackEvent", () => {
  it("forwards to gtag when it is loaded", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag });
    trackEvent("demo_booking", { source: "demo" });
    expect(gtag).toHaveBeenCalledWith("event", "demo_booking", { source: "demo" });
  });

  it("is a no-op without gtag or on the server", () => {
    vi.stubGlobal("window", {});
    expect(() => trackEvent("phone_click")).not.toThrow();
    vi.stubGlobal("window", undefined);
    expect(() => trackEvent("phone_click")).not.toThrow();
  });
});
