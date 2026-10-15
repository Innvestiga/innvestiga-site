import { describe, expect, it } from "vitest";
import { isBookingScheduledMessage } from "./booking";

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
