// Form delivery that does NOT use WhatsApp (feedback and career forms).
//
// The site has no server of its own. To really receive these forms, set an endpoint in a .env file
// (any form service such as Formspree / Getform / your own API that accepts a POST):
//
//   VITE_FEEDBACK_ENDPOINT=https://...
//   VITE_CAREER_ENDPOINT=https://...
//
// Until an endpoint is set, the submission only succeeds on the screen (feedback is also kept
// in this browser's localStorage).

async function post(url, body, isJson) {
  const res = await fetch(url, {
    method: "POST",
    headers: isJson ? { "Content-Type": "application/json", Accept: "application/json" } : { Accept: "application/json" },
    body: isJson ? JSON.stringify(body) : body,
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
}

export async function submitFeedback(entry) {
  const record = { ...entry, submittedAt: new Date().toISOString() };
  try {
    const list = JSON.parse(localStorage.getItem("nca-feedback") || "[]");
    localStorage.setItem("nca-feedback", JSON.stringify([...list, record]));
  } catch {
    /* storage unavailable - ignore */
  }
  const url = import.meta.env.VITE_FEEDBACK_ENDPOINT;
  if (url) await post(url, record, true);
}

export async function submitApplication(fields, resume) {
  const url = import.meta.env.VITE_CAREER_ENDPOINT;
  if (!url) return;
  const data = new FormData();
  Object.entries(fields).forEach(([k, v]) => data.append(k, v));
  if (resume) data.append("resume", resume, resume.name);
  await post(url, data, false);
}
