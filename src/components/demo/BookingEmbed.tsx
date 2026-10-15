"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { isBookingScheduledMessage } from "@/lib/booking";
import { CONTACT } from "@/lib/constants";

export default function BookingEmbed({ url }: { url?: string }) {
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (isBookingScheduledMessage(e.origin, e.data)) trackEvent("demo_booking");
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!url) {
    return (
      <p className="rounded-2xl border border-border bg-surface p-8 text-center text-body">
        Escríbenos a{" "}
        <a href={`mailto:${CONTACT.email}?subject=Agendar%20demo`} className="text-primary font-semibold">
          {CONTACT.email}
        </a>{" "}
        o llámanos al{" "}
        <a href={CONTACT.phoneHref} className="text-primary font-semibold">
          {CONTACT.phone}
        </a>{" "}
        para agendar tu demo.
      </p>
    );
  }

  const src = `${url}${url.includes("?") ? "&" : "?"}hide_gdpr_banner=1&locale=es`;
  return (
    <iframe
      src={src}
      title="Calendario para agendar una demo con Innvestiga"
      loading="lazy"
      className="w-full h-[720px] rounded-2xl border border-border bg-surface"
    />
  );
}
