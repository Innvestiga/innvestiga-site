"use client";

import Link from "next/link";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  width?: string;
}

const cardGradients = [
  "from-primary/[0.06] via-transparent to-surface-alt/80",
  "from-surface-alt/80 via-transparent to-primary/[0.04]",
  "from-transparent via-primary/[0.03] to-surface-alt/60",
];

export default function ServiceCard({ service, width }: ServiceCardProps) {
  const idx = parseInt(service.number) - 1;
  const gradient = cardGradients[idx] || cardGradients[0];

  return (
    <Link
      href={`/servicios/${service.slug}`}
      className="group block flex-shrink-0 snap-center"
      style={{ width: width || "85vw" }}
    >
      <div className={`relative h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-700 p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br ${gradient}`}>
        {/* Background mesh */}
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

        {/* Glow spot */}
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gold/[0.05] blur-[80px] group-hover:bg-gold/[0.1] transition-all duration-700 pointer-events-none" />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24">
          <div className="absolute top-6 right-6 w-12 h-px bg-gold/20 group-hover:w-16 group-hover:bg-gold/40 transition-all duration-500" />
          <div className="absolute top-6 right-6 h-12 w-px bg-gold/20 group-hover:h-16 group-hover:bg-gold/40 transition-all duration-500" />
        </div>

        {/* Service number — large watermark */}
        <div className="relative z-10">
          <span className="text-[12vw] md:text-[7vw] font-heading font-[800] leading-none text-ink/[0.06] group-hover:text-primary/[0.1] transition-colors duration-700">
            {service.number}
          </span>
        </div>

        {/* Content — bottom */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-gold/50" />
            <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-gold/70">
              {service.number} — Servicio
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-[800] uppercase leading-[0.92] mb-4 text-ink group-hover:text-primary transition-colors duration-500">
            {service.title}
          </h3>
          <p className="text-[13px] text-muted leading-relaxed max-w-md group-hover:text-body transition-colors duration-500">
            {service.shortDescription}
          </p>

          <div className="flex items-center gap-2 mt-8 text-[9px] font-bold tracking-[0.3em] uppercase text-gold/40 group-hover:text-gold group-hover:gap-4 transition-all duration-500">
            <span>Explorar</span>
            <div className="w-4 h-px bg-current transition-all duration-500 group-hover:w-8" />
          </div>
        </div>

        {/* Bottom edge glow on hover */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/40 transition-all duration-700" />
      </div>
    </Link>
  );
}
