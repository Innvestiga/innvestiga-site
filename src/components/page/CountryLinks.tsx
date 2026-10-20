import Link from "next/link";
import { COVERAGE, coverageHref } from "@/data/coverage";

// The 8 coverage countries in the spec order, with their division count.
export default function CountryLinks({ exclude }: { exclude?: string }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {COVERAGE.filter((c) => c.slug !== exclude).map((c) => (
        <li key={c.slug}>
          <Link
            href={coverageHref(c)}
            className="group block h-full min-h-[96px] rounded-xl bg-surface border border-border p-5 hover:border-primary/40 transition-colors"
          >
            <span className="block text-[13px] font-bold uppercase tracking-wider text-ink group-hover:text-primary">
              {c.name}
            </span>
            <span className="block mt-1 text-[12px] text-muted">
              {c.count.toLocaleString("en-US")} {c.unit}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
