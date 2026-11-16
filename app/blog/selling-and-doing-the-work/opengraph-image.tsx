import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "Selling the Work and Doing the Work — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="FIELD NOTES · SMALL BUSINESS"
        title="Selling the Work and Doing the Work: Notes From a One-Person Shop"
      />
    ),
    { ...size }
  );
}
