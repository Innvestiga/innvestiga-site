import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle for a minimal Docker runtime image.
  output: "standalone",
  // statusCode 301 (not permanent: true, which sends 308) as the spec asks.
  async redirects() {
    return [
      { source: "/casos-de-exito", destination: "/servicios/auditorias", statusCode: 301 },
      { source: "/casos-de-exito/:path*", destination: "/servicios/auditorias", statusCode: 301 },
      // The demo page was retired (2026-10-19); the pilot request replaces it.
      { source: "/demo", destination: "/contacto", statusCode: 301 },
    ];
  },
};

export default nextConfig;
