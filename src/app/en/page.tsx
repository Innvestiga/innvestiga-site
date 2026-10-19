import Button from "@/components/ui/Button";
import { STATS } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/en",
  title: "CX Audits and Mystery Shopping in Central America | Innvestiga",
  description:
    "Mystery shopping and customer experience audits in 8 countries and 1,282 municipalities across Mesoamerica and the Caribbean. Results in 3 days.",
  locale: "en_US",
  languages: { es: "/", en: "/en", "x-default": "/" },
});

const COUNTERS = [
  { value: STATS.yearsExperience, label: "years of experience" },
  { value: STATS.countries, label: "countries" },
  { value: STATS.municipalities, label: "municipalities we can evaluate" },
];

// The four "Por qué Innvestiga" items of the Spanish home page, translated.
const REASONS = [
  {
    title: "A logistics team across the region.",
    text: "We can evaluate any of the 1,282 municipalities in 8 countries, with one method.",
  },
  { title: "Results in 3 days at most.", text: "You decide while it still matters." },
  { title: "Our own platform, ESI.", text: "Evidence, comparisons and clear results for your committee." },
  {
    title: "18 years of experience.",
    text: "Innvestiga has measured service in the region since 2008, and with ESI since 2013.",
  },
];

// English home page only (section F). The root layout sets lang="es", so
// this subtree declares its own language.
export default function EnglishHome() {
  return (
    <div lang="en">
      <section className="relative bg-bg pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none [mask-image:radial-gradient(120%_90%_at_70%_30%,#000,transparent)]" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary" />
            <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-primary">
              CX audits · Mystery shopping
            </span>
          </div>
          <h1 className="font-heading text-[clamp(2rem,6vw,5rem)] font-bold leading-[0.95] uppercase tracking-tight text-ink max-w-5xl">
            Find out what really happens in each of <span className="text-gold-gradient">your stores.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-body max-w-2xl leading-relaxed">
            Customer experience audits with mystery shoppers in 8 countries across Central America, the Caribbean and
            Chiapas. Real evidence and results in 3 days at most.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contacto" variant="gold">
              Request a pilot
            </Button>
          </div>
          <dl className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
            {COUNTERS.map((c) => (
              <div key={c.label} className="border-t border-border pt-4">
                <dt className="sr-only">{c.label}</dt>
                <dd>
                  <span className="block font-heading text-5xl font-bold text-ink tracking-tight">
                    {c.value.toLocaleString("en-US")}
                  </span>{" "}
                  <span className="block mt-1 text-[11px] font-bold uppercase tracking-[0.25em] text-muted">{c.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-surface border-t border-border py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase leading-[0.95] tracking-tight text-ink">
            Why <span className="text-gold-gradient">Innvestiga</span>
          </h2>
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REASONS.map((r) => (
              <li key={r.title} className="rounded-2xl bg-surface-alt border border-border p-7">
                <h3 style={{ textTransform: "none" }} className="font-heading text-lg font-bold text-ink leading-snug">
                  {r.title}
                </h3>
                <p className="mt-2 text-[14.5px] text-body leading-relaxed">{r.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/contacto" variant="gold">
              Request a pilot
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
