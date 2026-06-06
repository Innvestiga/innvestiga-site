import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Innvestiga | Inteligencia de Mercado Premium",
    template: "%s | Innvestiga",
  },
  description:
    "Innvestiga — Inteligencia de Mercado Premium. Auditorías de proceso de venta, canales digitales y consumer insights en 8 países de Centroamérica y México.",
  keywords: [
    "inteligencia de mercado",
    "mystery shopping",
    "auditorías",
    "Centroamérica",
    "Guatemala",
    "consumer insights",
  ],
  openGraph: {
    type: "website",
    locale: "es_GT",
    siteName: "Innvestiga",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${syne.variable} ${inter.variable}`}>
      <body className="grain min-h-screen overflow-x-hidden bg-bg text-ink font-body">
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
