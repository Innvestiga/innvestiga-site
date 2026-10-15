import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/gracias",
  title: "Gracias por tu solicitud | Innvestiga",
  description: "Recibimos tu solicitud de prueba piloto de auditoría CX.",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
