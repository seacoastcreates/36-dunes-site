import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "Call List — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="CASE STUDY · SALES PROSPECTING"
        title="Call List: Researched, Ranked Sales Prospects. Free 10-Lead Preview."
      />
    ),
    { ...size }
  );
}
