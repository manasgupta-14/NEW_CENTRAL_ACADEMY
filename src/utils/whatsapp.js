import { SCHOOL } from "../data/school";

// Builds a wa.me link that opens WhatsApp with the message already typed in.
// The person still has to tap "Send" inside WhatsApp (nothing is sent automatically).
export function whatsappLink(message) {
  return `https://wa.me/91${SCHOOL.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message) {
  const url = whatsappLink(message);
  window.open(url, "_blank", "noopener,noreferrer");
  return url;
}
