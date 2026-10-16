import Link from "next/link";
import { COVERAGE, TOTAL_MUNICIPALITIES, coverageHref } from "@/data/coverage";

const unitLabel = (unit: string, slug: string) => (slug === "chiapas-mexico" ? "municipios del estado" : unit);

// Section F: the plain-text coverage table, in the fixed country order.
export default function CoverageTable() {
  return (
    <div className="max-w-3xl">
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full text-left text-[15px]">
          <caption className="sr-only">Divisiones municipales donde podemos evaluar, por país</caption>
          <thead className="bg-surface-alt text-[11px] uppercase tracking-[0.15em] text-muted">
            <tr>
              <th scope="col" className="px-5 py-3 font-bold">
                País
              </th>
              <th scope="col" className="px-5 py-3 font-bold">
                Podemos evaluar cualquiera de...
              </th>
              <th scope="col" className="px-5 py-3 font-bold text-right">
                Cantidad
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {COVERAGE.map((c) => (
              <tr key={c.slug}>
                <th scope="row" className="px-5 py-3 font-semibold text-ink">
                  <Link href={coverageHref(c)} className="hover:text-primary">
                    {c.fullName}
                  </Link>
                </th>
                <td className="px-5 py-3 text-body">{unitLabel(c.unit, c.slug)}</td>
                <td className="px-5 py-3 text-right tabular-nums text-ink">{c.count.toLocaleString("en-US")}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t-2 border-border">
            <tr>
              <th scope="row" className="px-5 py-3 font-bold text-ink">
                Total
              </th>
              <td className="px-5 py-3" />
              <td className="px-5 py-3 text-right font-bold tabular-nums text-ink">
                {TOTAL_MUNICIPALITIES.toLocaleString("en-US")}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="mt-4 text-[14px] text-muted leading-relaxed">
        En Costa Rica contamos cantones y en Panamá, distritos. En todos los casos, el total corresponde a las divisiones
        municipales donde podemos realizar evaluaciones.
      </p>
    </div>
  );
}
