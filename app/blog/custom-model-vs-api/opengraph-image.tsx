import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "When to Build a Custom Model vs. Use an API — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="DECISION GUIDE · ML STRATEGY"
        title="When to Build a Custom Model vs. Use an API"
      />
    ),
    { ...size }
  );
}
