import { Pencil, Trash2 } from "lucide-react";
import EmptyState from "../common/EmptyState";

const TH = "px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500";

export default function SubjectTable({ data, busyId, onEdit, onDelete, emptyMessage, emptyAction }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className={TH}>Subject</th>
              <th className={TH}>Classes</th>
              <th className={TH}>Given to Teachers</th>
              <th className={`${TH} text-right`}>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((s) => (
              <tr key={s.id} className="transition hover:bg-slate-50">
                <td className="px-5 py-4 font-semibold text-slate-900">{s.name}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {s.classes.map((c) => (
                      <span key={c} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">{c}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">
                  {s.assignedCount > 0 ? `${s.assignedCount} class${s.assignedCount > 1 ? "es" : ""}` : <span className="text-slate-400">Not given yet</span>}
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(s)}
                      disabled={busyId === s.id}
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-blue-100 hover:text-blue-700 disabled:opacity-60"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(s)}
                      disabled={busyId === s.id}
                      className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && <EmptyState message={emptyMessage} action={emptyAction} />}
      </div>
    </div>
  );
}
