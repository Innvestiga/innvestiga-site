import { ImageResponse } from "next/og";

export const dynamic = "force-static";

// Wordmark for the Organization schema `logo`.
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#1e40af",
        }}
      >
        <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: "-0.04em" }}>INNVESTIGA</div>
        <div style={{ fontSize: 26, letterSpacing: "0.25em", marginTop: 8 }}>MARKET SPECIALISTS</div>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
