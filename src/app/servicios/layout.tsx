import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Auditorías de proceso de venta, canales digitales y telefónicos, y Consumer Insights.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
