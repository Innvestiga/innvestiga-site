import type { CountryPage } from "@/data/countryPages";

// Departments (or provinces, regions) and their main cities. A plain table,
// always expanded, so every name is in the server HTML for crawlers.
export default function RegionTable({ page, place }: { page: CountryPage; place: string }) {
  return (
    <div className="max-w-4xl overflow-x-auto rounded-2xl border border-border bg-surface">
      <table className="w-full text-left text-[15px]">
        <caption className="sr-only">
          {page.regionHeader} y {page.citiesHeader.toLowerCase()} en {place}
        </caption>
        <thead className="bg-surface-alt text-[11px] uppercase tracking-[0.15em] text-muted">
          <tr>
            <th scope="col" className="px-5 py-3 font-bold">
              {page.regionHeader}
            </th>
            <th scope="col" className="px-5 py-3 font-bold">
              {page.citiesHeader}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {page.regions.map((r) => (
            <tr key={r.name} className="align-top">
              <th scope="row" className="px-5 py-3 font-semibold text-ink md:w-[34%]">
                {r.name}
              </th>
              <td className="px-5 py-3 text-body leading-relaxed">{r.cities.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
