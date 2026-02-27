/**
 * Booking / "Get Started" destination.
 * Set NEXT_PUBLIC_BOOKING_URL to your Calendly (or Cal.com, etc.) link to use any email (e.g. GoDaddy).
 * If unset, the button goes to /contact.
 */
export const BOOKING_URL =
  typeof process.env.NEXT_PUBLIC_BOOKING_URL === "string" &&
  process.env.NEXT_PUBLIC_BOOKING_URL.trim() !== ""
    ? process.env.NEXT_PUBLIC_BOOKING_URL.trim()
    : "/contact";

export const isExternalBooking = BOOKING_URL.startsWith("http");
