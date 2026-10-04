import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cobertura",
  description: "Presencia en 8 países, 90 departamentos y más de 450 municipios de Centroamérica, el Caribe y Chiapas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
