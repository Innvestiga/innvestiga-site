// The two-question summary at the top of each service page: a direct
// answer first, so search engines and AI assistants can quote it.
export default function ServiceSummary({ evaluates, purpose }: { evaluates: string; purpose: string }) {
  return (
    <dl className="grid gap-6 md:grid-cols-2 max-w-5xl">
      {[
        { q: "¿Qué evaluamos?", a: evaluates },
        { q: "¿Para qué sirve?", a: purpose },
      ].map((item) => (
        <div key={item.q} className="rounded-2xl bg-surface-alt border border-border p-6 md:p-8">
          <dt className="font-heading text-lg font-bold text-primary">{item.q}</dt>
          <dd className="mt-2 text-[16px] text-ink leading-relaxed">{item.a}</dd>
        </div>
      ))}
    </dl>
  );
}
