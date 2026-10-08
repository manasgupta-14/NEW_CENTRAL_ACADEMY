import { Eye, EyeOff, Phone, Star } from "lucide-react";
import { formatDate } from "../../utils/format";
import ActionButton from "../common/ActionButton";
import Avatar from "../common/Avatar";
import StatusBadge from "../common/StatusBadge";

export function Stars({ value }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={15} className={n <= value ? "fill-amber-400 text-amber-400" : "text-slate-300"} />
      ))}
    </span>
  );
}

// Ek feedback + Active / Inactive karne ka button.
export default function FeedbackCard({ item, busy, onToggle }) {
  return (
    <div className={`rounded-2xl border bg-white p-5 shadow-sm ${item.isActive ? "border-emerald-200" : "border-slate-200"}`}>
      <div className="flex items-start gap-3">
        <Avatar name={item.name} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="truncate font-bold text-slate-900">{item.name}</h3>
            <span className="text-xs font-medium text-slate-500">{item.relation}</span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <Stars value={item.rating} />
            <span>{item.about}</span>
            <span>{formatDate(item.createdAt)}</span>
            {item.phone && <span className="inline-flex items-center gap-1"><Phone size={12} />{item.phone}</span>}
          </div>
        </div>
        <StatusBadge status={item.isActive ? "active" : "unmarked"} label={item.isActive ? "Active" : "Inactive"} />
      </div>

      <p className="mt-4 whitespace-pre-line break-words text-sm leading-relaxed text-slate-700">{item.message}</p>

      <div className="mt-4 flex justify-end">
        <ActionButton
          variant={item.isActive ? "danger" : "primary"}
          icon={item.isActive ? EyeOff : Eye}
          onClick={() => onToggle(item)}
          disabled={busy}
        >
          {busy ? "Saving..." : item.isActive ? "Make Inactive" : "Make Active"}
        </ActionButton>
      </div>
    </div>
  );
}
