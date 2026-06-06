"use client";

import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import type { Country } from "@/types";

interface CountryDetailProps {
  country: Country | null;
  onClose: () => void;
}

export default function CountryDetail({
  country,
  onClose,
}: CountryDetailProps) {
  return (
    <AnimatePresence>
      {country && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlassCard gold className="relative">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-muted hover:text-ink text-sm"
              aria-label="Cerrar"
            >
              ✕
            </button>

            <span className="text-4xl mb-4 block">{country.flag}</span>
            <h3 className="text-2xl font-[800] uppercase mb-2 text-ink">
              {country.name}
            </h3>
            <p className="text-sm text-body leading-relaxed mb-6">
              {country.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <AnimatedCounter
                  end={country.departments}
                  className="text-3xl font-heading font-[800] text-gold block"
                />
                <span className="text-[10px] tracking-widest uppercase text-muted">
                  Departamentos
                </span>
              </div>
              <div>
                <AnimatedCounter
                  end={country.municipalities}
                  className="text-3xl font-heading font-[800] text-gold block"
                />
                <span className="text-[10px] tracking-widest uppercase text-muted">
                  Municipios
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
