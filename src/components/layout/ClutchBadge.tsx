"use client";

import Script from "next/script";

declare global {
  interface Window {
    CLUTCHCO?: { loaded: boolean; Init: () => void };
  }
}

// Clutch review badge for the footer (client request, 2026-10-21). Clutch's
// script turns the div into its iframe. In a footer Clutch asks for
// data-nofollow="true", which keeps the sitewide link from passing SEO weight.
export const CLUTCH_COMPANY_ID = "2754330";

// widget.js only initializes on a readystatechange to "complete". Loaded
// lazily (after that event), it would never run, so Init is called here.
function initClutch() {
  if (window.CLUTCHCO && !window.CLUTCHCO.loaded) window.CLUTCHCO.Init();
}

// Widget type 10 draws a 43px round logo at (15, 42) inside a 73x92 block;
// the space above holds its "Review us" hover bubble. The slot below is the
// size of the social icons, and the iframe is clipped to that block and
// shifted so the logo lines up with them.
export default function ClutchBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`relative block h-9 w-[43px] ${className}`.trim()}>
      <div
        className="clutch-widget absolute -left-[15px] -top-[46px] h-[92px] w-[73px] overflow-hidden [&_iframe]:h-[92px]! [&_iframe]:w-[73px]!"
        data-url="https://widget.clutch.co"
        data-widget-type="10"
        data-height="auto"
        data-nofollow="true"
        data-expandifr="true"
        data-shape="round"
        data-scale="100"
        data-clutchcompany-id={CLUTCH_COMPANY_ID}
      />
      <Script src="https://widget.clutch.co/static/js/widget.js" strategy="lazyOnload" onReady={initClutch} />
    </span>
  );
}
