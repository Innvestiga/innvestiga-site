import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Quiénes somos: especialistas en Mystery Shopping e inteligencia de mercado en Centroamérica, el Caribe y el sur de México.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
