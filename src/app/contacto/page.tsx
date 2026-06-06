"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/contacto/ContactForm";
import OfficeLocations from "@/components/contacto/OfficeLocations";
import DirectChannels from "@/components/contacto/DirectChannels";
import SectionHeading from "@/components/ui/SectionHeading";
import WatermarkText from "@/components/ui/WatermarkText";

export default function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-bg pb-20 pt-40">
        <WatermarkText
          text="CONTACTO"
          className="top-1/2 -translate-y-1/2 left-0"
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 w-full">
          <motion.span
            className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary mb-6 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Ponte en Contacto
          </motion.span>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-[800] leading-[0.9] uppercase text-ink"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Solicita tu{" "}
            <span className="text-gold-gradient">Prueba Piloto.</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-base md:text-lg text-body max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Queremos conocer mejor tu operación para diseñarte una prueba piloto a la medida.
          </motion.p>
        </div>
      </section>

      {/* Direct Channels */}
      <section className="bg-surface py-20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <DirectChannels />
        </div>
      </section>

      {/* Form + Offices */}
      <section id="prueba-piloto" className="bg-surface-alt py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionHeading
                label="Prueba Piloto"
                title="Solicita tu prueba piloto."
                subtitle="Completa el formulario con los datos de tu operación y nos pondremos en contacto contigo para coordinarla."
                light
              />
              <ContactForm />
            </div>

            <div>
              <SectionHeading
                label="Oficinas"
                title="Encuéntranos."
                light
              />
              <OfficeLocations />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
