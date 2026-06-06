"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { caseStudies, industries } from "@/data/cases";
import CaseGrid from "@/components/casos/CaseGrid";
import IndustryFilter from "@/components/casos/IndustryFilter";
import WatermarkText from "@/components/ui/WatermarkText";

export default function CasosDeExitoPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filtered =
    activeFilter === "Todos"
      ? caseStudies
      : caseStudies.filter((c) => c.industry === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-surface-alt pb-20 pt-40">
        <WatermarkText
          text="CASOS"
          className="top-1/2 -translate-y-1/2 left-0"
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 w-full">
          <motion.span
            className="text-[10px] font-bold tracking-[0.5em] uppercase text-gold mb-6 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Resultados Comprobados
          </motion.span>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-[800] leading-[0.9] uppercase text-ink"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Casos de{" "}
            <span className="text-gold-gradient">éxito.</span>
          </motion.h1>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-bg py-20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <IndustryFilter
            industries={industries}
            active={activeFilter}
            onChange={setActiveFilter}
          />
          <CaseGrid cases={filtered} />
        </div>
      </section>
    </>
  );
}
