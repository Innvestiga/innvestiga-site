import { SITE_SUBTITLE } from "@/lib/constants";

// Horizontal text wordmark shared by the navbar and the footer so both
// show the same brand mark (client request, 2026-10-19).
export default function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`text-lg md:text-xl font-heading font-bold tracking-tighter text-primary leading-none ${className}`.trim()}
    >
      INNVESTIGA
      <span className="text-primary/60 text-[10px] block font-body tracking-[0.25em] font-normal mt-0.5 group-hover:text-primary transition-colors duration-300">
        {SITE_SUBTITLE}
      </span>
    </span>
  );
}
