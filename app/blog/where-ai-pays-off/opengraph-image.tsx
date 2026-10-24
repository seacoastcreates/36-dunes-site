import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "Where Small Businesses Should (and Shouldn't) Use AI — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="DECISION GUIDE"
        title="Where Small Businesses Should (and Shouldn't) Use AI"
      />
    ),
    { ...size }
  );
}
