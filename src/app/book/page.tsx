import { redirect } from "next/navigation";
import { BOOKING_URL } from "@/lib/booking-url";

export default function BookPage() {
  redirect(BOOKING_URL);
}
