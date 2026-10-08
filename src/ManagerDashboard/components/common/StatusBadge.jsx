import { STATUS_LABELS } from "../../utils/format";

const STYLES = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  resigned: "bg-amber-50 text-amber-700 border-amber-200",
  terminated: "bg-red-50 text-red-700 border-red-200",
  current: "bg-blue-50 text-blue-700 border-blue-200",
  "passed-out": "bg-purple-50 text-purple-700 border-purple-200",
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  delayed: "bg-red-50 text-red-700 border-red-200",
  present: "bg-emerald-50 text-emerald-700 border-emerald-200",
  absent: "bg-red-50 text-red-700 border-red-200",
  leave: "bg-amber-50 text-amber-700 border-amber-200",
  unmarked: "bg-slate-50 text-slate-500 border-slate-200",
};

export default function StatusBadge({ status, label }) {
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${STYLES[status] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
      {label || STATUS_LABELS[status] || status}
    </span>
  );
}
