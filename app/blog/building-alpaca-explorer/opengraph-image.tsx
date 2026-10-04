import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "Building Alpaca Explorer — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="BUILD LOG · AGENTIC AI"
        title="Building Alpaca Explorer: Asking the Market a Question Instead of Reading a Dashboard"
      />
    ),
    { ...size }
  );
}
