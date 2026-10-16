import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export interface Crumb {
  name: string;
  path: string;
}

// Visible trail plus its BreadcrumbList. "Inicio" is prepended here.
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: "Inicio", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <nav aria-label="Ruta de navegación" className="mb-8">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] tracking-[0.15em] uppercase text-muted">
          {trail.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === trail.length - 1 ? (
                <span aria-current="page" className="text-ink">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="hover:text-primary transition-colors">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
