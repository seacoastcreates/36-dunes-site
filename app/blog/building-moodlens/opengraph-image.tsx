import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "Building MoodLens — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="BUILD LOG · PRIVACY"
        title="Building MoodLens: a mood journal that reads between the lines"
      />
    ),
    { ...size }
  );
}
