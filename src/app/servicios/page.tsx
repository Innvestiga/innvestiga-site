"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import WatermarkText from "@/components/ui/WatermarkText";
import Button from "@/components/ui/Button";

export default function ServiciosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-bg pb-20 pt-40">
        <WatermarkText
          text="SERVICIOS"
          className="top-1/2 -translate-y-1/2 left-0"
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 w-full">
          <motion.span
            className="text-[10px] font-bold tracking-[0.5em] uppercase text-gold mb-6 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Nuestras Soluciones
          </motion.span>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-[800] leading-[0.9] uppercase max-w-5xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Servicios que revelan lo que{" "}
            <span className="text-gold-gradient">otros no ven.</span>
          </motion.h1>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-surface py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="space-y-24">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  i % 2 !== 0 ? "lg:direction-rtl" : ""
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gold mb-4 block">
                    {service.number}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-[800] uppercase leading-[0.9] mb-6">
                    {service.title}
                  </h2>
                  <p className="text-body leading-relaxed mb-8">
                    {service.fullDescription}
                  </p>
                  <Button href={`/servicios/${service.slug}`} variant="outline">
                    Conocer más
                  </Button>
                </div>

                <div
                  className={`${
                    i % 2 !== 0 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="relative h-[50vh] rounded-2xl overflow-hidden bg-surface-alt border border-border">
                    <span className="absolute inset-0 flex items-center justify-center text-[20vw] font-heading font-[800] text-ink/[0.04]">
                      {service.number}
                    </span>
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="grid grid-cols-2 gap-4">
                        {service.features.slice(0, 4).map((f, j) => (
                          <div
                            key={j}
                            className="flex items-start gap-2 text-[10px] text-muted"
                          >
                            <span className="w-1 h-1 bg-gold rounded-full mt-1 flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-alt py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-[800] uppercase leading-[0.9] mb-6">
            ¿Listo para descubrir lo que{" "}
            <span className="text-gold-gradient">realmente</span> sucede?
          </h2>
          <p className="text-body mb-10">
            Contáctanos y diseñaremos una solución a la medida de tu negocio.
          </p>
          <Button href="/contacto" variant="gold">
            Solicitar Propuesta
          </Button>
        </div>
      </section>
    </>
  );
}
