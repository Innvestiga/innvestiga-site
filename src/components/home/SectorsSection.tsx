const SECTORS = [
  "telefonía celular",
  "banca y tarjetas de crédito",
  "calzado",
  "ferreterías",
  "electrodomésticos",
  "centros comerciales",
  "repuestos automotrices",
  "farmacéutico",
  "supermercados",
  "comida rápida",
  "productos de consumo masivo",
  "turismo",
];

// Text only: no client names or logos (spec rule B).
export default function SectorsSection() {
  return (
    <section className="bg-surface border-t border-border py-20 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight text-ink">
          Sectores donde hemos trabajado
        </h2>
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {SECTORS.map((s) => (
            <li
              key={s}
              className="rounded-full border border-border bg-surface-alt px-4 py-2 text-[13px] text-body first-letter:uppercase"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
