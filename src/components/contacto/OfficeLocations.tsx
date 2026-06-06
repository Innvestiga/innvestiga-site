"use client";

import GlassCard from "@/components/ui/GlassCard";
import { OFFICES } from "@/lib/constants";

export default function OfficeLocations() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {OFFICES.map((office) => (
        <GlassCard key={office.city} gold>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary block mb-3">
            {office.country}
          </span>
          <h3 className="text-xl font-[800] uppercase mb-2 text-ink">{office.city}</h3>
          <p className="text-sm text-body mb-1">{office.address}</p>
          <p className="text-sm text-muted">{office.phone}</p>
        </GlassCard>
      ))}
    </div>
  );
}
