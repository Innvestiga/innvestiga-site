import BookingEmbed from "@/components/demo/BookingEmbed";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/demo",
  title: "Agenda una Demo | Innvestiga",
  description:
    "Mira cómo recibirías la evidencia y los resultados de una auditoría CX en tu operación. Demo guiada de 30 minutos con datos de ejemplo.",
});

// No ESI screenshots or recordings on this page (spec section C).
export default function DemoPage() {
  return (
    <>
      <section className="relative bg-bg pt-40 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary mb-6 block">Demo guiada</span>
          <h1 className="text-[clamp(1.8rem,6vw,4.5rem)] font-bold leading-[0.95] uppercase text-ink max-w-4xl">
            Mira cómo recibirías los resultados de <span className="text-gold-gradient">tu auditoría.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-body max-w-2xl leading-relaxed">
            En 30 minutos te mostramos, con datos de ejemplo, cómo ver la evidencia de cada visita, comparar tus sucursales y
            presentar resultados claros a tu equipo. La demo es guiada: no se entrega acceso a la plataforma.
          </p>
        </div>
      </section>
      <section className="bg-surface-alt py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <BookingEmbed url={process.env.NEXT_PUBLIC_BOOKING_URL} />
        </div>
      </section>
    </>
  );
}
