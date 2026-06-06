"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/constants";

export default function StatsPanel() {
  const stats = [
    { label: "Países", value: STATS.countries, suffix: "" },
    { label: "Departamentos", value: STATS.departments, suffix: "" },
    { label: "Municipios", value: STATS.municipalities, suffix: "+" },
    { label: "Años de experiencia", value: STATS.yearsExperience, suffix: "+" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <AnimatedCounter
            end={stat.value}
            suffix={stat.suffix}
            className="text-4xl md:text-5xl font-heading font-[800] text-gold block"
          />
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted mt-2 block">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
