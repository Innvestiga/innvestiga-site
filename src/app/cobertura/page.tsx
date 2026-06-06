"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import InteractiveMap from "@/components/cobertura/InteractiveMap";
import CountryDetail from "@/components/cobertura/CountryDetail";
import StatsPanel from "@/components/cobertura/StatsPanel";
import SectionHeading from "@/components/ui/SectionHeading";
import WatermarkText from "@/components/ui/WatermarkText";
import type { Country } from "@/types";

export default function CoberturaPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-surface-alt pb-20 pt-40">
        <WatermarkText
          text="COBERTURA"
          className="top-1/2 -translate-y-1/2 left-0"
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 w-full">
          <motion.span
            className="text-[10px] font-bold tracking-[0.5em] uppercase text-gold mb-6 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Presencia Regional
          </motion.span>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-[800] leading-[0.9] uppercase text-ink"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Nuestra{" "}
            <span className="text-gold-gradient">cobertura.</span>
          </motion.h1>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface py-20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <StatsPanel />
        </div>
      </section>

      {/* Interactive Map */}
      <section className="bg-bg py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <SectionHeading
            label="Mapa Interactivo"
            title="Explora nuestra presencia."
            subtitle="Haz clic en un país para ver los detalles de nuestra cobertura."
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3">
              <InteractiveMap
                onCountrySelect={setSelectedCountry}
                selectedCountry={selectedCountry}
              />
            </div>
            <div className="lg:col-span-2">
              <CountryDetail
                country={selectedCountry}
                onClose={() => setSelectedCountry(null)}
              />
              {!selectedCountry && (
                <div className="text-center py-16">
                  <p className="text-muted text-sm">
                    Selecciona un país en el mapa
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
