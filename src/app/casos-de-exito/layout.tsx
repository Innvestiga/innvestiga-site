import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casos de éxito",
  description: "Programas de auditoría y experiencia del cliente realizados con organizaciones de la región.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
