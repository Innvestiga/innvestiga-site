// A plain content band with an H2. `tone` alternates the background.
export default function Section({
  id,
  label,
  title,
  tone = "surface",
  children,
  narrow = false,
}: {
  id?: string;
  label?: string;
  title: React.ReactNode;
  tone?: "surface" | "alt" | "bg";
  children: React.ReactNode;
  narrow?: boolean;
}) {
  const bg = tone === "alt" ? "bg-surface-alt" : tone === "bg" ? "bg-bg" : "bg-surface";
  return (
    <section id={id} className={`${bg} border-t border-border py-16 md:py-24`}>
      <div className={`${narrow ? "max-w-4xl" : "max-w-[1400px]"} mx-auto px-6 md:px-16 lg:px-24`}>
        {label && (
          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-px bg-primary/40" />
            <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-primary/70">{label}</span>
          </div>
        )}
        <h2 className="font-heading text-[clamp(1.6rem,3.4vw,2.75rem)] font-bold leading-[1] uppercase tracking-tight text-ink max-w-4xl">
          {title}
        </h2>
        <div className="mt-8 md:mt-10">{children}</div>
      </div>
    </section>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 max-w-3xl text-[16px] text-body leading-relaxed">
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

export function Checklist({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={`grid gap-x-10 gap-y-4 max-w-4xl ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] text-ink leading-snug">
          <span aria-hidden="true" className="mt-[7px] w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}
