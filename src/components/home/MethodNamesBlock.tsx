// Block A of the 2026-10-20 spec, right under "La diferencia": the many
// names of the same method. Server component so the text is in the HTML.
export default function MethodNamesBlock() {
  return (
    <section className="bg-bg border-t border-border py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h2
          style={{ textTransform: "none" }}
          className="font-heading text-2xl md:text-[2rem] font-bold leading-tight tracking-tight text-ink"
        >
          Cliente oculto, cliente misterioso o mystery shopper: un mismo método
        </h2>
        <p className="mt-6 text-body text-base md:text-lg leading-relaxed">
          Cliente oculto, cliente misterioso, cliente incógnito, comprador incógnito, compra misteriosa y mystery
          shopper son nombres distintos de una misma metodología: un auditor capacitado visita o contacta tu punto de
          venta como si fuera un cliente real y evalúa la experiencia contra los estándares de tu marca. El nombre
          cambia según el país e industria; el método de Innvestiga es el mismo en los 8 mercados.
        </p>
      </div>
    </section>
  );
}
