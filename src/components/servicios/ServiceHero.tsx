"use client";

import { motion } from "framer-motion";
import WatermarkText from "@/components/ui/WatermarkText";
import type { Service } from "@/types";

export default function ServiceHero({ service }: { service: Service }) {
  return (
    <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-bg pb-20 pt-40">
      <WatermarkText
        text={service.number}
        className="top-1/2 -translate-y-1/2 right-0 text-[40vw]"
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 w-full">
        <motion.span
          className="text-[10px] font-bold tracking-[0.5em] uppercase text-gold mb-6 block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {service.number} — Servicios
        </motion.span>
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-[800] leading-[0.9] uppercase max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {service.title}
        </motion.h1>
        <motion.p
          className="mt-6 text-body text-sm md:text-base max-w-2xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {service.fullDescription}
        </motion.p>
      </div>
    </section>
  );
}
