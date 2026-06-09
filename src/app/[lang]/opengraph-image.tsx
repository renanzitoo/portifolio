import { ImageResponse } from "next/og";

import { getMessages, Locale } from "@/lib/i18n";

export const runtime = "edge";

const localeConfig: Record<Locale, { eyebrow: string; title: string; subtitle: string }> = {
  en: {
    eyebrow: "Portfolio / Full-Stack & Backend",
    title: "Renan Costa",
    subtitle:
      "High-performance systems, AI-driven automation, and scalable B2B products.",
  },
  "pt-BR": {
    eyebrow: "Portfólio / Full-Stack & Backend",
    title: "Renan Costa",
    subtitle:
      "Sistemas de alta performance, automação com IA e produtos B2B escaláveis.",
  },
};

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const messages = await getMessages(lang);
  const config = localeConfig[lang];
  const description =
    messages["hero.description"] ?? config.subtitle;
  const subtitle = messages["hero.subtitle"] ?? config.subtitle;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "72px",
          background:
            "radial-gradient(circle at top left, rgba(124, 58, 237, 0.45), transparent 34%), radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.28), transparent 32%), linear-gradient(135deg, #050816 0%, #0b1020 45%, #121a2e 100%)",
          color: "#f8fafc",
          fontFamily: "Inter, Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "48px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "720px" }}>
            <div
              style={{
                display: "inline-flex",
                width: "fit-content",
                padding: "12px 18px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: "24px",
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              {config.eyebrow}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ fontSize: "88px", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.05em" }}>
                {config.title}
              </div>
              <div style={{ fontSize: "38px", lineHeight: 1.15, color: "rgba(226,232,240,0.92)", maxWidth: "680px" }}>
                {subtitle}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                marginTop: "10px",
              }}
            >
              <div style={tagStyle}>Cloud</div>
              <div style={tagStyle}>AI</div>
              <div style={tagStyle}>Systems Design</div>
              <div style={tagStyle}>B2B SaaS</div>
            </div>

            <div style={{ fontSize: "28px", lineHeight: 1.4, color: "rgba(203,213,225,0.94)", maxWidth: "760px" }}>
              {description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "300px",
              height: "100%",
              padding: "28px",
              borderRadius: "32px",
              background: "linear-gradient(180deg, rgba(15,23,42,0.9), rgba(15,23,42,0.55))",
              border: "1px solid rgba(148,163,184,0.22)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ fontSize: "24px", color: "rgba(226,232,240,0.82)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Available for
              </div>
              <div style={{ fontSize: "40px", fontWeight: 700, lineHeight: 1.1 }}>
                High-impact engineering roles
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "24px", color: "rgba(226,232,240,0.88)" }}>
              <div>Performance-minded</div>
              <div>Product-focused</div>
              <div>AI-enabled delivery</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

const tagStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "10px 16px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.14)",
  fontSize: "22px",
  fontWeight: 600,
  color: "#f8fafc",
};
