import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "What a 4.16-Star Average Doesn't Tell You — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="APPLIED NLP · CLIENT PITCH"
        title="What a 4.16-Star Average Doesn't Tell You"
      />
    ),
    { ...size }
  );
}
