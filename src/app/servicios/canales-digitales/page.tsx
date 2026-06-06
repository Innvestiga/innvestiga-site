import { services } from "@/data/services";
import ServiceHero from "@/components/servicios/ServiceHero";
import ServiceProcess from "@/components/servicios/ServiceProcess";
import Button from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canales Digitales y Telefónicos",
  description:
    "Evaluamos la atención en plataformas online y call centers para asegurar consistencia en todos los canales.",
};

export default function CanalesDigitalesPage() {
  const service = services.find((s) => s.slug === "canales-digitales")!;

  return (
    <>
      <ServiceHero service={service} />
      <ServiceProcess service={service} />
      <section className="bg-surface-alt py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-[800] uppercase leading-[0.9] mb-6">
            Optimiza todos tus{" "}
            <span className="text-gold-gradient">canales.</span>
          </h2>
          <p className="text-body mb-10">
            Evaluamos cada punto de contacto digital y telefónico de tu empresa.
          </p>
          <Button href="/contacto" variant="gold">
            Solicitar Evaluación
          </Button>
        </div>
      </section>
    </>
  );
}
