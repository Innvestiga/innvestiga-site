import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contacto",
  title: "Prueba Piloto de Auditoría CX y Contacto | Innvestiga",
  description:
    "Comprueba el método en tus propias sucursales antes de decidir. Solicita tu prueba piloto de auditoría CX en toda Centroamérica.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
