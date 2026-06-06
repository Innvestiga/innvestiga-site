"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-16 ${align === "center" ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {label && (
        <div className={`flex items-center gap-4 mb-6 ${align === "center" ? "justify-center" : ""}`}>
          <div className={`w-10 h-px ${light ? "bg-primary/40" : "bg-primary/40"}`} />
          <span className="text-[9px] font-bold tracking-[0.5em] uppercase text-primary/70">
            {label}
          </span>
        </div>
      )}
      <h2
        className={`font-heading text-3xl md:text-5xl lg:text-6xl font-[800] leading-[0.88] uppercase tracking-tighter ${
          light ? "text-ink" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-6 text-[13px] max-w-2xl leading-relaxed ${
            light ? "text-body" : "text-body"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
