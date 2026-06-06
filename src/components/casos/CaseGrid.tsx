"use client";

import { motion, AnimatePresence } from "framer-motion";
import CaseCard from "./CaseCard";
import type { CaseStudy } from "@/types";

interface CaseGridProps {
  cases: CaseStudy[];
}

export default function CaseGrid({ cases }: CaseGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      layout
    >
      <AnimatePresence>
        {cases.map((study) => (
          <CaseCard key={study.id} study={study} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
