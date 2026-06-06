"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/data/blog";
import BlogGrid from "@/components/blog/BlogGrid";
import WatermarkText from "@/components/ui/WatermarkText";

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-bg pb-20 pt-40">
        <WatermarkText
          text="INSIGHTS"
          className="top-1/2 -translate-y-1/2 left-0"
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 w-full">
          <motion.span
            className="text-[10px] font-bold tracking-[0.5em] uppercase text-gold mb-6 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Blog
          </motion.span>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-[800] leading-[0.9] uppercase text-ink"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Insights y{" "}
            <span className="text-gold-gradient">tendencias.</span>
          </motion.h1>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <BlogGrid posts={blogPosts} />
        </div>
      </section>
    </>
  );
}
