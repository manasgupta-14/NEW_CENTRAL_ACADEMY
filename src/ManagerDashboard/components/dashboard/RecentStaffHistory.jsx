import { History } from "lucide-react";
import Avatar from "../common/Avatar";
import StatusBadge from "../common/StatusBadge";
import EmptyState from "../common/EmptyState";
import { formatDate } from "../../utils/format";

export default function RecentStaffHistory({ items }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-900">Staff History</h2>
          <p className="text-sm text-slate-500">Resigned and terminated staff</p>
        </div>
        <History className="text-amber-600" />
      </div>

      {items.length === 0 ? (
        <EmptyState message="No staff has left yet." />
      ) : (
        <div className="space-y-3">
          {items.map((person) => (
            <div key={`${person.type}-${person.id}`} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar name={person.name} size="sm" tone="slate" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{person.name}</p>
                  <p className="text-xs text-slate-500">{formatDate(person.leavingDate)}</p>
                </div>
              </div>
              <StatusBadge status={person.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
