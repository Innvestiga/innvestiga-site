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

// Calendly only posts events to the parent page when the iframe URL names
// that page's domain (what its widget.js adds for inline embeds).
export function bookingEmbedSrc(url: string, hostname: string): string {
  const src = new URL(url);
  src.searchParams.set("embed_domain", hostname);
  src.searchParams.set("embed_type", "Inline");
  src.searchParams.set("hide_gdpr_banner", "1");
  src.searchParams.set("locale", "es");
  return src.toString();
}
