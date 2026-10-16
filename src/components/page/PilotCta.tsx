import Button from "@/components/ui/Button";

// Closing call to action shared by the inner pages.
export default function PilotCta({
  title = "Solicita tu prueba piloto",
  text = "Comprueba en terreno lo que realmente sucede en tus puntos de venta.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-surface-alt border-t border-border py-20 md:py-28 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-heading text-[clamp(1.8rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-ink">
          {title}
        </h2>
        <p className="mt-5 text-body text-base md:text-lg">{text}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contacto" variant="gold">
            Solicitar prueba piloto
          </Button>
          <Button href="/demo" variant="outline">
            Agendar demo
          </Button>
        </div>
      </div>
    </section>
  );
}
