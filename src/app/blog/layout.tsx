import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// The current posts are placeholders, not real articles: keep the blog out of
// search (and out of the sitemap and footer) until the first 3 are published.
export const metadata: Metadata = {
  ...pageMetadata({
    path: "/blog",
    title: "Blog | Innvestiga",
    description: "Artículos sobre auditorías de experiencia del cliente.",
  }),
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
