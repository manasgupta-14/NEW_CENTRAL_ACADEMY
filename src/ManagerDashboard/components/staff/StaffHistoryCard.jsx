import { Eye } from "lucide-react";
import Avatar from "../common/Avatar";
import StatusBadge from "../common/StatusBadge";
import ActionButton from "../common/ActionButton";
import { formatDate } from "../../utils/format";

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-semibold">{value || "—"}</p>
    </div>
  );
}

export default function StaffHistoryCard({ person, onView }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={person.name} size="lg" tone="slate" />
          <div>
            <h3 className="font-bold text-slate-900">{person.name}</h3>
            <p className="text-sm text-slate-500">{person.position}</p>
          </div>
        </div>
        <StatusBadge status={person.status} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Field label="Category" value={person.category} />
        <Field label="Joining Date" value={formatDate(person.joiningDate)} />
        <Field label="Leaving Date" value={formatDate(person.leavingDate)} />
        <Field label="Reason" value={person.leavingReason} />
      </div>

      <ActionButton variant="soft" icon={Eye} className="mt-5 w-full" onClick={() => onView(person)}>
        View Full History
      </ActionButton>
    </div>
  );
}
