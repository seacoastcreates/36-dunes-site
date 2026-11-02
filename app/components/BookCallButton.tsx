"use client";

import { BOOKING_URL } from "../lib/booking";

type Props = {
  className?: string;
  label?: string;
  source: string;
};

// Renders nothing until NEXT_PUBLIC_BOOKING_URL is configured.
export default function BookCallButton({
  className = "btn btn-ghost",
  label = "Book a 15-min call",
  source,
}: Props) {
  if (!BOOKING_URL) return null;
  return (
    <a
      className={className}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        window.gtag?.("event", "book_call_click", { link_location: source })
      }
    >
      {label}
    </a>
  );
}
