"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import type { BlogPost } from "@/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link href={`/blog/${post.slug}`}>
        <GlassCard className="h-full group hover:border-primary/20 transition-all duration-500">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-primary bg-primary/[0.08] px-3 py-1.5 rounded-full border border-primary/10">
                {post.category}
              </span>
              <span className="text-[8px] text-muted tracking-[0.2em] font-bold">
                {post.readTime}
              </span>
            </div>

            <h3 className="text-lg font-heading font-[800] uppercase leading-tight tracking-tight text-ink group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h3>

            <p className="text-[12px] text-body leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between pt-5 border-t border-border">
              <span className="text-[9px] text-muted tracking-[0.15em] font-bold">
                {new Date(post.date).toLocaleDateString("es-GT", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase text-primary/40 group-hover:text-primary transition-colors duration-300">
                <span>Leer</span>
                <div className="w-3 h-px bg-current group-hover:w-6 transition-all duration-300" />
              </span>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
