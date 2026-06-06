import { services } from "@/data/services";
import ServiceHero from "@/components/servicios/ServiceHero";
import ServiceProcess from "@/components/servicios/ServiceProcess";
import Button from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consumer Insights",
  description:
    "Reportes precisos y prácticos para tomar decisiones estratégicas basadas en datos reales del consumidor.",
};

export default function ConsumerInsightsPage() {
  const service = services.find((s) => s.slug === "consumer-insights")!;

  return (
    <>
      <ServiceHero service={service} />
      <ServiceProcess service={service} />
      <section className="bg-surface-alt py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-[800] uppercase leading-[0.9] mb-6">
            Conoce a tu{" "}
            <span className="text-gold-gradient">consumidor.</span>
          </h2>
          <p className="text-body mb-10">
            Insights accionables que transforman datos en decisiones estratégicas.
          </p>
          <Button href="/contacto" variant="gold">
            Solicitar Estudio
          </Button>
        </div>
      </section>
    </>
  );
}
