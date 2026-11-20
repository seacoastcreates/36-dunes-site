import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "Your Best Leads Might Already Be Public Record — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="BUILD LOG · PROSPECTING"
        title="Your Best Leads Might Already Be Public Record"
      />
    ),
    { ...size }
  );
}
