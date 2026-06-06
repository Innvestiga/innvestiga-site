"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Service } from "@/types";

export default function ServiceProcess({ service }: { service: Service }) {
  return (
    <>
      {/* Features */}
      <section className="bg-surface-alt py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <SectionHeading
            label="Características"
            title="Qué incluye."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-start gap-4">
                    <span className="w-2 h-2 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                    <p className="text-sm text-body leading-relaxed">
                      {feature}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-surface py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <SectionHeading
            label="Proceso"
            title="Cómo trabajamos."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <span className="text-6xl font-heading font-[800] text-gold/10 block mb-4">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-[800] uppercase mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">
                  {step.description}
                </p>
                {/* Connector line */}
                {i < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-8 h-px bg-gold/20 translate-x-full" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
