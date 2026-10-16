"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/contacto/ContactForm";
import OfficeLocations from "@/components/contacto/OfficeLocations";
import DirectChannels from "@/components/contacto/DirectChannels";
import SectionHeading from "@/components/ui/SectionHeading";
import WatermarkText from "@/components/ui/WatermarkText";
import JsonLd from "@/components/seo/JsonLd";
import { PILOT_SCOPE } from "@/lib/constants";
import { localBusinessSchemas } from "@/lib/jsonld";

export default function ContactoPage() {
  return (
    <>
      <JsonLd data={localBusinessSchemas()} />
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-bg pb-20 pt-40">
        <WatermarkText text="CONTACTO" className="top-1/2 -translate-y-1/2 left-0" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 w-full">
          <motion.span
            className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary mb-6 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Prueba piloto
          </motion.span>
          <motion.h1
            className="text-[clamp(1.6rem,6vw,5rem)] font-bold leading-[0.95] uppercase text-ink max-w-5xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Comprueba en tus propias sucursales{" "}
            <span className="text-gold-gradient">lo que realmente pasa.</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-base md:text-lg text-body max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            La prueba piloto te permite ver el método y la evidencia en tu operación antes de tomar una decisión.
          </motion.p>
          {PILOT_SCOPE && (
            <p className="mt-4 text-base md:text-lg text-body max-w-2xl leading-relaxed">{PILOT_SCOPE}</p>
          )}
        </div>
      </section>

      {/* Form */}
      <section id="prueba-piloto" className="bg-surface-alt py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          <SectionHeading label="Prueba Piloto" title="Cuéntanos sobre tu operación." light />
          <ContactForm />
        </div>
      </section>

      {/* Channels + offices, below the form */}
      <section className="bg-surface py-20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <SectionHeading label="Contacto" title="Contacto directo." light />
              <DirectChannels />
            </div>
            <div>
              <SectionHeading label="Oficinas" title="Nuestras oficinas." light />
              <OfficeLocations />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
