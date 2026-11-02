// The "book a 15-minute call" link (Cal.com, Calendly, etc.). Set
// NEXT_PUBLIC_BOOKING_URL in Netlify and rebuild; until it is set, every
// booking button renders nothing, so no dead links ship.
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ?? "";
