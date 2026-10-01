import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "Building Cellar Index — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="BUILD LOG · MLOPS"
        title="Building Cellar Index: Teaching a Model Which Wines Are About to Change Price"
      />
    ),
    { ...size }
  );
}
