import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "Building SwingSync — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="BUILD LOG · COMPUTER VISION"
        title="Building SwingSync: Comparing Two Golf Swings That Don't Run at the Same Speed"
      />
    ),
    { ...size }
  );
}
