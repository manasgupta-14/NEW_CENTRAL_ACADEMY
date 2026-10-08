export const formatCurrency = (n) => (n === null || n === undefined || n === "" ? "—" : `₹${Number(n).toLocaleString("en-IN")}`);

export function formatDate(d) {
  if (!d) return "—";
  const x = new Date(d);
  return Number.isNaN(x.getTime()) ? "—" : x.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export const formatPercent = (p) => (p === null || p === undefined ? "—" : `${p}%`);

// Joining date se experience (kaam chhod chuke staff ke liye leaving date tak)
export function experienceFrom(joining, until) {
  if (!joining) return "—";
  const start = new Date(joining);
  const end = until ? new Date(until) : new Date();
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "—";
  let months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
  if (end.getDate() < start.getDate()) months -= 1;
  if (months < 1) return "Newly joined";
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} Month${m > 1 ? "s" : ""}`;
  return m ? `${y} Yr ${m} Mo` : `${y} Year${y > 1 ? "s" : ""}`;
}

export const STATUS_LABELS = {
  active: "Active",
  resigned: "Resigned",
  terminated: "Terminated",
  current: "Current",
  "passed-out": "Passed Out",
  paid: "Paid",
  pending: "Pending",
  delayed: "Delayed",
  none: "No Fee Added",
  present: "Present",
  absent: "Absent",
  leave: "Leave",
  unmarked: "Not Marked",
};

export const matchesQuery = (query, ...values) => {
  const q = query.trim().toLowerCase();
  return !q || values.some((v) => String(v ?? "").toLowerCase().includes(q));
};

export const todayISO = () => new Date().toISOString().slice(0, 10);

// Local date (India me subah 5:30 se pehle UTC date kal ki hoti hai, isliye toISOString seedha nahi)
export const todayLocal = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

// Mahine "YYYY-MM" format me
export const currentMonth = () => todayLocal().slice(0, 7);

export function shiftMonth(month, delta) {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1 + delta, 1)).toISOString().slice(0, 7);
}

export function monthLabel(month) {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-IN", { month: "long", year: "numeric", timeZone: "UTC" });
}
