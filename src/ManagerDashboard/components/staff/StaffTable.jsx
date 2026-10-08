import { Eye } from "lucide-react";
import Avatar from "../common/Avatar";
import StatusBadge from "../common/StatusBadge";
import EmptyState from "../common/EmptyState";
import { STAFF_LABEL } from "../../config/forms";
import { formatCurrency } from "../../utils/format";

const TH = "px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500";

export default function StaffTable({ data, type, onView, emptyMessage, emptyAction }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className={TH}>Staff</th>
              <th className={TH}>{STAFF_LABEL[type].position}</th>
              <th className={TH}>Qualification</th>
              <th className={TH}>Salary</th>
              <th className={TH}>Status</th>
              <th className={`${TH} text-right`}>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((person) => (
              <tr key={person.id} className="transition hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={person.name} />
                    <div>
                      <p className="font-semibold text-slate-900">{person.name}</p>
                      <p className="text-xs text-slate-500">{person.email || person.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">{person.position || "—"}</td>
                <td className="px-5 py-4 text-sm text-slate-600">{person.qualification || "—"}</td>
                <td className="px-5 py-4 font-semibold text-slate-800">{formatCurrency(person.salary)}</td>
                <td className="px-5 py-4"><StatusBadge status={person.status} /></td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => onView(person)}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-blue-100 hover:text-blue-700"
                  >
                    <Eye size={15} />
                    View
                  </button>
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
