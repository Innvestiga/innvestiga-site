import Link from "next/link";
import { SCENARIOS, scenarioHref } from "@/data/scenarios";

// The six audit situations as cards, each linking to its page.
export default function ScenarioCards({ exclude }: { exclude?: string }) {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {SCENARIOS.filter((s) => s.slug !== exclude).map((s) => (
        <li key={s.slug}>
          <Link
            href={scenarioHref(s)}
            className="group flex h-full flex-col rounded-2xl bg-surface border border-border p-7 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_rgba(15,23,42,0.05)] hover:border-primary/40 transition-colors duration-300"
          >
            <h3 className="font-heading text-xl font-bold uppercase leading-tight text-ink group-hover:text-primary transition-colors">
              {s.label}
            </h3>
            <p className="mt-3 text-[14.5px] text-body leading-relaxed flex-1">{s.question}</p>
            <span className="mt-6 text-[10px] font-bold tracking-[0.3em] uppercase text-primary/70 group-hover:text-primary">
              Ver auditoría →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
