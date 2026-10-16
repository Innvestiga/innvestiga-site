import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

// Server-rendered hero: the H1 and first paragraph are plain HTML, never
// hidden behind an entrance animation.
export default function PageHero({
  crumbs,
  label,
  title,
  intro,
  children,
  aside,
}: {
  crumbs?: Crumb[];
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative bg-bg pt-36 md:pt-40 pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none [mask-image:radial-gradient(120%_90%_at_70%_20%,#000,transparent)]" />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className={aside ? "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start" : ""}>
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-primary">{label}</span>
            </div>
            <h1 className="font-heading text-[clamp(1.8rem,5.2vw,4.25rem)] font-bold leading-[0.98] uppercase tracking-tight text-ink max-w-4xl">
              {title}
            </h1>
            {intro && <div className="mt-6 space-y-4 text-base md:text-lg text-body max-w-2xl leading-relaxed">{intro}</div>}
            {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
