// Block B of the 2026-10-20 spec, after "Por qué Innvestiga": what each
// management area gets from an audit. Server component.
const AREAS = [
  {
    title: "Experiencia del cliente (CX)",
    text: "Ves si el estándar de servicio se cumple en cada sucursal con evidencia real.",
  },
  {
    title: "Servicio al cliente",
    text: "Detectas cómo se atienden reclamos, garantías y devoluciones críticamente.",
  },
  {
    title: "Marketing",
    text: "Verificas que promociones y precios exhibidos sean los que verdaderamente se cobran en caja.",
  },
  {
    title: "Gerencia general",
    text: "Comparas sucursales, ciudades y países con el mismo criterio unificado.",
  },
  {
    title: "Recursos Humanos y capacitación",
    text: "Identificas brechas por cargo o turno para medir efectividad de entrenamiento.",
  },
];

export default function ManagementBenefits() {
  return (
    <section className="bg-surface-alt border-t border-border py-20 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight text-ink">
          Qué gana cada gerencia con una auditoría
        </h2>
        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {AREAS.map((a) => (
            <li key={a.title} className="rounded-2xl bg-surface border border-border p-6">
              <h3 style={{ textTransform: "none" }} className="font-heading text-base font-bold text-ink leading-snug">
                {a.title}
              </h3>
              <p className="mt-2 text-[14.5px] text-body leading-relaxed">{a.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
