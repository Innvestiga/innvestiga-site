import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import { OG_IMAGE } from "@/lib/seo";
import { isProduction, siteUrl } from "@/lib/env";

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
    "Auditorías CX con cliente oculto (mystery shopper) en 8 países y 1,282 municipios de Mesoamérica y el Caribe. Resultados en 3 días. Solicita tu prueba piloto.",
  openGraph: {
    type: "website",
    locale: "es_LA",
    siteName: "Innvestiga",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", site: "@innvestiga" },
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
      </body>
    </html>
  );
}
