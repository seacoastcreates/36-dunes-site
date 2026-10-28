import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "Building Rulebook Trader — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="BUILD LOG · AI STRATEGY"
        title="Building Rulebook Trader: Where the Rules Decide and AI Just Reviews"
      />
    ),
    { ...size }
  );
}
