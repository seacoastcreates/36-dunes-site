// Shared visual template for per-route Open Graph images (app/**/opengraph-image.tsx).
// Mirrors the mark and palette used in app/opengraph-image.tsx so every page shares a
// consistent look while showing its own eyebrow/title instead of the generic default.

export function OgImageTemplate({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
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

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <span
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 3,
            fontWeight: 600,
            color: "#E0B25E",
          }}
        >
          {eyebrow}
        </span>
        <span
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.18,
            maxWidth: 980,
            color: "#EDEAE1",
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}
