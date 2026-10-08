import Avatar from "../common/Avatar";
import StatusBadge from "../common/StatusBadge";
import EmptyState from "../common/EmptyState";
import { formatPercent } from "../../utils/format";

const TH = "px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500";

export default function StudentTable({ data, onView, emptyMessage }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className={TH}>Student</th>
              <th className={TH}>Class</th>
              <th className={TH}>Roll No.</th>
              <th className={TH}>Attendance</th>
              <th className={TH}>Fee Status</th>
              <th className={TH}>Status</th>
              <th className={`${TH} text-right`}>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((student) => (
              <tr key={student.id} className="transition hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={student.name} tone="purple" />
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-xs text-slate-500">{student.parentName ? `Father: ${student.parentName}` : student.studentId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm font-medium">{student.className}</td>
                <td className="px-5 py-4 text-sm text-slate-600">{student.rollNo || "—"}</td>
                <td className="px-5 py-4 text-sm font-semibold">{formatPercent(student.attendancePercent)}</td>
                <td className="px-5 py-4"><StatusBadge status={student.feeStatus} /></td>
                <td className="px-5 py-4"><StatusBadge status={student.status} /></td>
                <td className="px-5 py-4 text-right">
                  <button onClick={() => onView(student)} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold hover:bg-blue-100 hover:text-blue-700">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && <EmptyState message={emptyMessage} />}
      </div>
    </div>
  );
}
