import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "Building a Support Assistant That Says “I Don’t Know” — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="BUILD LOG · APPLIED NLP"
        title="Building a Support Assistant That Knows When to Say “I Don’t Know”"
      />
    ),
    { ...size }
  );
}
