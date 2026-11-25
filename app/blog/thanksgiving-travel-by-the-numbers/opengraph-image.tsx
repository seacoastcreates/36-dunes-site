import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "Thanksgiving Travel by the Numbers, and Which Models Can Predict It — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="DATA NOTES"
        title="Thanksgiving Travel by the Numbers, and Which Models Can Predict It"
      />
    ),
    { ...size }
  );
}
