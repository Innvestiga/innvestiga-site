"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import WatermarkText from "@/components/ui/WatermarkText";

const values = [
  {
    title: "Precisión",
    description:
      "Cada dato, cada evaluación, cada insight es verificado con rigurosidad metodológica.",
  },
  {
    title: "Integridad",
    description:
      "Operamos con los más altos estándares éticos en cada país donde tenemos presencia.",
  },
  {
    title: "Innovación",
    description:
      "Incorporamos tecnología de punta y metodologías actualizadas en cada proyecto.",
  },
  {
    title: "Compromiso",
    description:
      "Nos involucramos profundamente con los objetivos de cada cliente para entregar resultados reales.",
  },
];

const methodology = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Entendemos tu negocio, tus objetivos y los desafíos específicos de tu industria.",
  },
  {
    step: "02",
    title: "Diseño",
    description:
      "Creamos instrumentos de evaluación personalizados y seleccionamos la metodología ideal.",
  },
  {
    step: "03",
    title: "Ejecución",
    description:
      "Nuestro equipo regional ejecuta el levantamiento de datos con rigor y confidencialidad.",
  },
  {
    step: "04",
    title: "Análisis",
    description:
      "Procesamos la información con herramientas avanzadas para generar indicadores clave.",
  },
  {
    step: "05",
    title: "Entrega",
    description:
      "Presentamos reportes ejecutivos con insights accionables y recomendaciones estratégicas.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-bg pb-20 pt-40">
        <WatermarkText
          text="NOSOTROS"
          className="top-1/2 -translate-y-1/2 left-0"
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 w-full">
          <motion.span
            className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary mb-6 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sobre Innvestiga
          </motion.span>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-[800] leading-[0.9] uppercase"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Revelamos lo que
            <br />
            <span className="text-gold-gradient">otros no ven.</span>
          </motion.h1>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-bg py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard gold>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary block mb-4">
                  Visión
                </span>
                <p className="text-lg md:text-xl leading-relaxed text-body">
                  Ser la firma de inteligencia de mercado más confiable y
                  visionaria de Centroamérica, transformando la manera en que las
                  empresas comprenden a sus clientes y mercados.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlassCard>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary block mb-4">
                  Misión
                </span>
                <p className="text-lg md:text-xl leading-relaxed text-body">
                  Proporcionar inteligencia de mercado premium que impulse
                  decisiones estratégicas, utilizando metodologías rigurosas y
                  un equipo regional comprometido con la excelencia.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-surface-alt py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <SectionHeading
            label="Metodología"
            title="Nuestro proceso."
            subtitle="Una metodología probada que garantiza resultados precisos y accionables en cada proyecto."
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/15 -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {methodology.map((item, i) => (
                <motion.div
                  key={item.step}
                  className={`flex items-start gap-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className={`flex-1 ${
                      i % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <span className="text-primary text-sm font-bold tracking-widest">
                      {item.step}
                    </span>
                    <h3 className="text-2xl font-[800] uppercase mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed max-w-md inline-block">
                      {item.description}
                    </p>
                  </div>
                  {/* Timeline dot */}
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-primary/20 border-2 border-primary flex-shrink-0 mt-2" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bg py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <SectionHeading
            label="Valores"
            title="Lo que nos define."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="h-full">
                  <h3 className="text-lg font-[800] uppercase mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {value.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
