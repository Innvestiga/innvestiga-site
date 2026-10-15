export type AnalyticsEvent =
  | "pilot_form_submit"
  | "demo_booking"
  | "whatsapp_click"
  | "phone_click"
  | "video_play";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Never pass personal data (name, email, phone, company) as params.
export function trackEvent(name: AnalyticsEvent, params: Record<string, string | number> = {}): void {
  if (typeof window === "undefined" || !window) return;
  window.gtag?.("event", name, params);
}

export function classifyContactLink(href: string): "whatsapp_click" | "phone_click" | null {
  if (/^tel:/i.test(href)) return "phone_click";
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) return "whatsapp_click";
  return null;
}
