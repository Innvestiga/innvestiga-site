import Link from "next/link";
import type { FaqItem } from "@/data/faq";

// Server component; <details> keeps every answer in the HTML.
export default function HomeFaq({ items, showAllLink = true }: { items: FaqItem[]; showAllLink?: boolean }) {
  return (
    <section className="bg-bg border-t border-border py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight text-ink">
          Preguntas frecuentes
        </h2>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {items.map((f) => (
            <details key={f.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-ink focus-visible:outline-2 focus-visible:outline-primary">
                <h3
                  style={{ textTransform: "none", letterSpacing: "normal" }}
                  className="font-body text-[16px] font-semibold"
                >
                  {f.question}
                </h3>
                <span aria-hidden="true" className="mt-0.5 text-primary transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[15px] text-body leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
        {showAllLink && (
          <Link
            href="/preguntas-frecuentes"
            className="inline-block mt-8 text-[11px] font-bold tracking-[0.25em] uppercase text-primary/70 hover:text-primary"
          >
            Ver todas las preguntas
          </Link>
        )}
      </div>
    </section>
  );
}
