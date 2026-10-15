import { describe, expect, it } from "vitest";
import { bookingEmbedSrc, isBookingScheduledMessage } from "./booking";

describe("isBookingScheduledMessage", () => {
  it("accepts Calendly's scheduled event", () => {
    expect(isBookingScheduledMessage("https://calendly.com", { event: "calendly.event_scheduled" })).toBe(true);
  });

  it("ignores other Calendly events", () => {
    expect(isBookingScheduledMessage("https://calendly.com", { event: "calendly.page_height" })).toBe(false);
  });

  it("ignores the same payload from another origin", () => {
    expect(isBookingScheduledMessage("https://evil.example", { event: "calendly.event_scheduled" })).toBe(false);
  });

  it("ignores non-object payloads", () => {
    expect(isBookingScheduledMessage("https://calendly.com", "calendly.event_scheduled")).toBe(false);
    expect(isBookingScheduledMessage("https://calendly.com", null)).toBe(false);
  });
});

describe("bookingEmbedSrc", () => {
  it("adds the embed parameters Calendly needs to post events to this page", () => {
    const src = new URL(bookingEmbedSrc("https://calendly.com/innvestiga/demo", "www.innvestiga.com"));
    expect(src.searchParams.get("embed_domain")).toBe("www.innvestiga.com");
    expect(src.searchParams.get("embed_type")).toBe("Inline");
    expect(src.searchParams.get("locale")).toBe("es");
  });

  it("keeps parameters already in the URL", () => {
    const src = new URL(bookingEmbedSrc("https://calendly.com/innvestiga/demo?month=2026-11", "localhost"));
    expect(src.searchParams.get("month")).toBe("2026-11");
    expect(src.searchParams.get("embed_domain")).toBe("localhost");
  });
});
