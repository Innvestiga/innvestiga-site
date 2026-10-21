import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle for a minimal Docker runtime image.
  output: "standalone",
  // statusCode 301 (not permanent: true, which sends 308) as the spec asks.
  async redirects() {
    return [
      // www is the canonical host since the cutover (2026-10-21). The old
      // staging host and the bare domain send every path there.
      ...["main.innvestiga.com", "innvestiga.com"].map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: "https://www.innvestiga.com/:path*",
        statusCode: 301 as const,
      })),
      // Home page of the old cPanel site.
      { source: "/index.html", destination: "/", statusCode: 301 },
      { source: "/casos-de-exito", destination: "/servicios/auditorias", statusCode: 301 },
      { source: "/casos-de-exito/:path*", destination: "/servicios/auditorias", statusCode: 301 },
      // The demo page was retired (2026-10-19); the pilot request replaces it.
      { source: "/demo", destination: "/contacto", statusCode: 301 },
      // "Otros estudios" was retired (client, 2026-10).
      { source: "/servicios/consumer-insights", destination: "/servicios", statusCode: 301 },
    ];
  },
};

export default nextConfig;
