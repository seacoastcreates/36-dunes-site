import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "Why Most “Add AI” Pitches Fail — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="DECISION GUIDE"
        title="Why Most “Add AI” Pitches Fail (and What a Good Scoped MVP Looks Like)"
      />
    ),
    { ...size }
  );
}
