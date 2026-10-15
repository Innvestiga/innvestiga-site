const BOOKING_ORIGIN = "https://calendly.com";

// Calendly posts {event: "calendly.event_scheduled"} to the parent window
// when a visitor confirms a slot.
export function isBookingScheduledMessage(origin: string, data: unknown): boolean {
  return (
    origin === BOOKING_ORIGIN &&
    typeof data === "object" &&
    data !== null &&
    (data as { event?: unknown }).event === "calendly.event_scheduled"
  );
}
