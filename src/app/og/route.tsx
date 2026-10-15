import { ImageResponse } from "next/og";

export const dynamic = "force-static";

// Default share image for every page until the client sends a designed one.
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #f8fafc 0%, #e0e8f7 100%)",
          color: "#1f2937",
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: "0.3em", color: "#1e40af", fontWeight: 700 }}>
          INNVESTIGA MARKET SPECIALISTS
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 28, maxWidth: 960 }}>
          Auditorías CX con Cliente Oculto
        </div>
        <div style={{ fontSize: 34, marginTop: 28, color: "#4b5563" }}>
          8 países · 1,282 municipios · Resultados en máximo 3 días
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
