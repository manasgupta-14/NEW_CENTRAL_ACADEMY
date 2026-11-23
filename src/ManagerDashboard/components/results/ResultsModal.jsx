import Modal from "../common/Modal";
import Avatar from "../common/Avatar";
import EmptyState from "../common/EmptyState";
import { formatPercent } from "../../utils/format";

// Ek student ke saare exam results (exam-wise subject marks). student = { name, className, rollNo, results: [...] }
export default function ResultsModal({ student, onClose }) {
  return (
    <Modal title="Student Results" subtitle="Exam-wise marks" onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center gap-4">
          <Avatar name={student.name} size="lg" tone="purple" />
          <div>
            <h3 className="text-xl font-bold">{student.name}</h3>
            <p className="text-sm text-slate-500">{student.className}{student.rollNo ? ` • Roll No. ${student.rollNo}` : ""}</p>
          </div>
        </div>

        {student.results.length === 0 ? (
          <EmptyState message="No result has been added for this student yet." />
        ) : (
          <div className="mt-6 space-y-5">
            {student.results.map((r) => (
              <div key={r.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-bold text-slate-900">{r.exam}</h4>
                  <p className="text-sm font-semibold text-blue-600">{r.total} / {r.outOf} • {formatPercent(r.percent)}</p>
                </div>
                <table className="mt-3 w-full text-left text-sm">
                  <thead className="text-xs uppercase text-slate-500">
                    <tr><th className="py-2">Subject</th><th className="py-2 text-right">Marks</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {r.subjects.map((s) => (
                      <tr key={s.subject}>
                        <td className="py-2 text-slate-700">{s.subject}</td>
                        <td className="py-2 text-right font-semibold text-slate-900">{s.marks} / {s.outOf}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {r.remark && <p className="mt-3 text-sm text-slate-500">Remark: {r.remark}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
