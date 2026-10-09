import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "Building Hearth Index — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="BUILD LOG · MLOPS"
        title="Building Hearth Index: Forecasting Home Prices for Every ZIP Code, Not Just the Metro"
      />
    ),
    { ...size }
  );
}
