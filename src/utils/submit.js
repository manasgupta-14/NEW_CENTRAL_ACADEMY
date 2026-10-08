// Forms ab seedha school ke backend (server/ folder) par jaate hain. WhatsApp ka isse koi lena-dena nahi.
import { api } from "./api";

export const submitFeedback = (entry) =>
  api("/feedback", {
    method: "POST",
    body: { name: entry.name, relation: entry.relation, about: entry.about, phone: entry.phone, rating: entry.rating, message: entry.message },
  });

export function submitApplication(fields, resume) {
  const data = new FormData();
  Object.entries(fields).forEach(([k, v]) => data.append(k, v));
  if (resume) data.append("resume", resume, resume.name);
  return api("/careers", { method: "POST", body: data });
}

export const submitAdmission = (fields) => api("/admissions", { method: "POST", body: fields });

// Contact page ke slider ke liye: sirf manager ne jo feedback Active kiya hai wahi aata hai.
export const fetchActiveFeedback = () => api("/testimonials");
