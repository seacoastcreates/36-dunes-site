import { ImageResponse } from "next/og";

export const alt = "36 Dunes — AI/ML & Software Engineering Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#13151C",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="72" height="45" viewBox="0 0 64 40" fill="none">
            <path
              d="M2 20 C 10 8, 18 8, 24 15 C 27 18.5, 22 21, 19 18 C 26 10, 36 9, 44 17 C 48 21, 56 22, 62 15"
              stroke="#E0B25E"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
              opacity={0.55}
            />
            <path
              d="M2 27 C 12 15, 22 15, 30 23 C 33 26.5, 27 28.5, 24 25.5 C 32 17, 42 16, 50 24 C 54 28, 58 28.5, 62 23"
              stroke="#E0B25E"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
              opacity={0.78}
            />
            <path
              d="M2 34 C 14 24, 24 24, 33 31 C 40 36.5, 52 36.5, 62 29"
              stroke="#E0B25E"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span
            style={{
              display: "flex",
              fontSize: 30,
              letterSpacing: 5,
              fontWeight: 600,
              color: "#EDEAE1",
            }}
          >
            36 DUNES
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.12,
              maxWidth: 920,
              color: "#EDEAE1",
            }}
          >
            Intelligence at scale. Strategy in code.
          </span>
          <span
            style={{
              display: "flex",
              fontSize: 28,
              color: "#9C978A",
              maxWidth: 820,
            }}
          >
            AI/ML &amp; software engineering studio for forward-thinking
            businesses.
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
