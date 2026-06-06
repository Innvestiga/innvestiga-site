"use client";

import Link from "next/link";
import type { BlogPost as BlogPostType } from "@/types";

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="bg-bg min-h-screen pt-40 pb-32">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back */}
        <Link
          href="/blog"
          className="text-[10px] font-bold tracking-widest uppercase text-primary/60 hover:text-primary transition-colors mb-12 block"
        >
          ← Volver al blog
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[9px] font-bold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-[9px] text-muted tracking-widest">
              {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-[800] uppercase leading-[0.95] mb-6 text-ink">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-[10px] text-muted tracking-widest uppercase">
            <span>{post.author}</span>
            <span>·</span>
            <span>
              {new Date(post.date).toLocaleDateString("es-GT", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none [&_h2]:font-heading [&_h2]:font-[800] [&_h2]:uppercase [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-ink [&_h3]:font-heading [&_h3]:font-[700] [&_h3]:uppercase [&_h3]:text-lg [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-ink [&_p]:text-body [&_p]:leading-relaxed [&_li]:text-body [&_strong]:text-ink">
          {post.content.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return null;
            if (trimmed.startsWith("### "))
              return <h3 key={i}>{trimmed.replace("### ", "")}</h3>;
            if (trimmed.startsWith("## "))
              return <h2 key={i}>{trimmed.replace("## ", "")}</h2>;
            if (trimmed.startsWith("- "))
              return (
                <p key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: trimmed
                        .replace("- ", "")
                        .replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong class="text-ink">$1</strong>'
                        ),
                    }}
                  />
                </p>
              );
            return (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: trimmed.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="text-ink">$1</strong>'
                  ),
                }}
              />
            );
          })}
        </div>
      </div>
    </article>
  );
}
