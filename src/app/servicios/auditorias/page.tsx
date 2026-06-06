import { services } from "@/data/services";
import ServiceHero from "@/components/servicios/ServiceHero";
import ServiceProcess from "@/components/servicios/ServiceProcess";
import Button from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auditorías de Proceso de Venta",
  description:
    "Identificamos fortalezas y áreas de mejora en tus equipos comerciales mediante auditorías presenciales con cliente misterioso.",
};

export default function AuditoriasPage() {
  const service = services.find((s) => s.slug === "auditorias")!;

  return (
    <>
      <ServiceHero service={service} />
      <ServiceProcess service={service} />
      <section className="bg-surface-alt py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-[800] uppercase leading-[0.9] mb-6">
            ¿Listo para evaluar tus{" "}
            <span className="text-gold-gradient">puntos de venta?</span>
          </h2>
          <p className="text-body mb-10">
            Nuestros auditores están listos para visitar tus sucursales.
          </p>
          <Button href="/contacto" variant="gold">
            Solicitar Auditoría
          </Button>
        </div>
      </section>
    </>
  );
}
