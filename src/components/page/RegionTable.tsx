import type { CountryPage } from "@/data/countryPages";

const cell = "px-5 py-3";

// Coverage zones with their departments (or provinces, regions) and main
// cities. A plain table, always expanded, so every name is in the server
// HTML for search engines and AI assistants.
export default function RegionTable({ page, place }: { page: CountryPage; place: string }) {
  const headers = [page.zoneHeader, page.divisionsHeader, page.citiesHeader].filter((h): h is string => Boolean(h));
  return (
    <div className="max-w-5xl overflow-x-auto rounded-2xl border border-border bg-surface">
      <table className="w-full text-left text-[15px]">
        <caption className="sr-only">Ciudades principales donde auditamos en {place}, por zona</caption>
        <thead className="bg-surface-alt text-[11px] uppercase tracking-[0.15em] text-muted">
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col" className={`${cell} font-bold`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {page.zones.map((z) => (
            <tr key={z.name} className="align-top">
              <th scope="row" className={`${cell} font-semibold text-ink md:w-[26%]`}>
                {z.name}
              </th>
              {page.divisionsHeader && <td className={`${cell} text-body leading-relaxed md:w-[28%]`}>{z.divisions?.join(", ")}</td>}
              <td className={`${cell} text-body leading-relaxed`}>{z.cities.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
