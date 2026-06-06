"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ESI_BENEFITS, CONTACT } from "@/lib/constants";

export default function ESISection() {
  return (
    <section className="relative bg-surface-alt py-28 md:py-36 overflow-hidden">
      {/* Subtle blue dot texture */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionHeading
          label="Tecnología"
          title="Nuestra Plataforma ESI"
          align="center"
          light
        />

        {/* Intro copy */}
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-5 -mt-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-body text-base md:text-lg leading-relaxed">
            Desarrollada desde el 2013 y actualmente en su tercera generación, ESI
            (Exploración Sistémica) es el corazón tecnológico de nuestro servicio.
          </p>
          <p className="text-body text-base md:text-lg leading-relaxed">
            Publicamos los resultados de cada auditoría en máximo 3 días y te entregamos
            una plataforma completa para que puedas gestionar tu Experiencia del Cliente de
            forma inteligente.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {ESI_BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit}
              className="flex items-start gap-4 rounded-2xl bg-surface border border-border p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_rgba(15,23,42,0.04)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: (i % 2) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <p className="text-body text-[15px] leading-relaxed">
                <span className="text-ink font-semibold">{benefit}</span>
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button href={CONTACT.portal} external variant="gold">
            Quiero conocer ESI
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
