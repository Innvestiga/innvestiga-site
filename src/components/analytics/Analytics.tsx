"use client";

import Script from "next/script";
import { useEffect } from "react";
import { classifyContactLink, trackEvent } from "@/lib/analytics";

// Loads GA4 when an ID is configured and reports every tel: and WhatsApp
// click site-wide, so individual buttons need no tracking code.
export default function Analytics({ gaId }: { gaId?: string }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      const href = link?.getAttribute("href") ?? "";
      const name = classifyContactLink(href);
      if (name) trackEvent(name, { link_url: href });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
    </>
  );
}
