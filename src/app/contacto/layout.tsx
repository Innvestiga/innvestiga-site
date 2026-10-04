import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Solicita tu prueba piloto. Te respondemos con un plan concreto.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
