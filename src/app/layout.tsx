import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import Analytics from "@/components/analytics/Analytics";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { GA4_MEASUREMENT_ID } from "@/lib/constants";
import { OG_IMAGE } from "@/lib/seo";
import { gaMeasurementId, isProduction, siteUrl } from "@/lib/env";

// next/font downloads both families at build time and serves them as
// self-hosted WOFF2 from /_next/static, with font-display: swap.
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Auditorías CX: Cliente Oculto y Mystery Shopper | Innvestiga",
    template: "%s | Innvestiga",
  },
  description:
    "Auditorías CX con cliente oculto (mystery shopper) en Centroamérica, República Dominicana y Chiapas, México. Resultados en 3 días. Solicita tu prueba piloto.",
  openGraph: {
    type: "website",
    locale: "es_LA",
    siteName: "Innvestiga",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", site: "@innvestiga" },
  // Spiral isotype (client spec, 2026-10-20). /favicon.ico comes from
  // src/app/favicon.ico; the SVG (traced from the spiral PNG), the PNGs and
  // the manifest live in /public.
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  // Staging and local builds are never indexable. Pages that set their own
  // robots (only /gracias, which is noindex anyway) override this.
  ...(isProduction() ? {} : { robots: { index: false, follow: false } }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable}`}>
      <body className="grain min-h-screen overflow-x-hidden bg-bg text-ink font-body">
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <WhatsAppFloat />
        <Analytics gaId={gaMeasurementId(GA4_MEASUREMENT_ID)} />
      </body>
    </html>
  );
}
