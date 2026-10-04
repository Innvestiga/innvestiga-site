import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights y tendencias sobre Mystery Shopping, experiencia del cliente y consumer insights.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
