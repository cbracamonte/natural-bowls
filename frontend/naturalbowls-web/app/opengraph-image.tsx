import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Natural Bowls - Poke Bowls & Smoothies en Trujillo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://naturalbowlscafe.com"
  ).replace(/\/+$/, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background image */}
        <img
          src={`${siteUrl}/images/smoothie-bowl.jpg`}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.15) 100%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 70px",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Brand */}
          <div
            style={{
              fontSize: 28,
              color: "#86efac",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 16,
              display: "flex",
            }}
          >
            Natural Bowls
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              maxWidth: 700,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Poke Bowls &</span>
            <span>Smoothies Frescos</span>
            <span>en Trujillo</span>
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: 32,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                background: "#22c55e",
                color: "white",
                fontSize: 22,
                fontWeight: 700,
                padding: "14px 32px",
                borderRadius: 50,
                display: "flex",
              }}
            >
              Ordena ahora - Delivery disponible
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
