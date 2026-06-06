"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import type { CaseStudy } from "@/types";

export default function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      layout
    >
      <GlassCard className="h-full group hover:border-gold/20 transition-all duration-500">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-gold bg-gold/[0.08] px-3 py-1.5 rounded-full border border-gold/10">
              {study.industry}
            </span>
            <span className="text-[8px] text-muted tracking-[0.2em] uppercase font-bold">
              {study.country}
            </span>
          </div>

          <h3 className="text-lg font-heading font-[800] uppercase leading-tight tracking-tight text-ink group-hover:text-gold transition-colors duration-300">
            {study.title}
          </h3>

          <div className="space-y-4 text-[12px]">
            <div>
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-muted block mb-1.5">
                Desafío
              </span>
              <p className="text-body leading-relaxed">{study.challenge}</p>
            </div>
            <div>
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-muted block mb-1.5">
                Resultado
              </span>
              <p className="text-body leading-relaxed">{study.result}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-5 border-t border-border">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <span className="text-base font-heading font-[800] text-gold block tracking-tight">
                  {metric.value}
                </span>
                <span className="text-[7px] tracking-[0.2em] uppercase text-muted font-bold">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
