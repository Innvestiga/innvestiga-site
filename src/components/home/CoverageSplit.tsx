"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/constants";
import { countries } from "@/data/countries";

export default function CoverageSplit() {
  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 40%, #f8fafc 100%)" }}>
      {/* Atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      {/* Gold rule separator */}
      <div className="gold-rule max-w-7xl mx-auto" />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Country grid */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-px bg-gold/50" />
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-gold/70">
                Cobertura Regional
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {countries.map((country, i) => (
                <motion.div
                  key={country.id}
                  className="group relative p-5 rounded-xl overflow-hidden bg-surface border border-border hover:border-primary/25 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.04] transition-colors duration-500" />
                  <div className="relative z-10">
                    <span className="text-xl mb-2 block">{country.flag}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-ink block">
                      {country.name}
                    </span>
                    <span className="text-[9px] text-muted block mt-1 tracking-wider">
                      {country.departments} depto. · {country.municipalities} mun.
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/cobertura"
              className="group inline-flex items-center gap-3 mt-10 text-[10px] font-bold tracking-[0.3em] uppercase text-gold/50 hover:text-gold transition-colors duration-300"
            >
              <span>Ver mapa interactivo</span>
              <div className="w-4 h-px bg-current group-hover:w-8 transition-all duration-300" />
            </Link>
          </motion.div>

          {/* Right: Giant number + stats */}
          <motion.div
            className="lg:col-span-5 text-center lg:text-right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative inline-block">
              <AnimatedCounter
                end={STATS.countries}
                className="text-[22vw] md:text-[16vw] lg:text-[12vw] font-heading font-[800] leading-none text-gold/90 block tracking-tighter"
              />
              {/* Shadow of the number */}
              <div className="absolute -inset-8 bg-gold/[0.04] rounded-full blur-[60px] -z-10" />
            </div>
            <span className="text-[9px] font-bold tracking-[0.5em] uppercase text-muted mt-2 block">
              Países
            </span>

            <div className="flex flex-col gap-10 mt-20">
              <div className="relative">
                <AnimatedCounter
                  end={STATS.departments}
                  className="text-5xl md:text-6xl font-heading font-[800] text-ink block tracking-tight"
                />
                <span className="text-[9px] tracking-[0.3em] uppercase text-muted mt-2 block font-bold">
                  Departamentos
                </span>
              </div>
              <div className="w-16 h-px bg-gold/20 ml-auto lg:mr-0" />
              <div className="relative">
                <AnimatedCounter
                  end={STATS.municipalities}
                  suffix="+"
                  className="text-5xl md:text-6xl font-heading font-[800] text-ink block tracking-tight"
                />
                <span className="text-[9px] tracking-[0.3em] uppercase text-muted mt-2 block font-bold">
                  Municipios
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
