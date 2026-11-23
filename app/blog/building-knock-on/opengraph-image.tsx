import { ImageResponse } from "next/og";
import { OgImageTemplate } from "../../lib/og-image";

export const alt = "Building Knock-On — 36 Dunes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="BUILD LOG · SIDE PROJECT"
        title="Building Knock-On: A Puzzle Game My Kids Have to Think Through"
      />
    ),
    { ...size }
  );
}
