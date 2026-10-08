// Backend se baat karne ka ek hi jagah. Server ka address .env me VITE_API_URL se aata hai.
// Local: VITE_API_URL=http://localhost:5000/api
const BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

const TOKEN_KEY = "nca-token";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => (t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY));

export async function api(path, { method = "GET", body, auth = false } = {}) {
  const isForm = body instanceof FormData;
  const headers = {};
  if (body && !isForm) headers["Content-Type"] = "application/json";
  if (auth && getToken()) headers.Authorization = `Bearer ${getToken()}`;

  let res;
  try {
    res = await fetch(`${BASE}${path}`, { method, headers, body: body ? (isForm ? body : JSON.stringify(body)) : undefined });
  } catch {
    throw new Error("Could not reach the server. Please check your internet and try again.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || `Request failed (${res.status})`);
    err.status = res.status; // 401 par manager dashboard login par bhej deta hai
    throw err;
  }
  return data;
}
