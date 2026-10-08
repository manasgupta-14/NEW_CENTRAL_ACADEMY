import StatusBadge from "../common/StatusBadge";
import EmptyState from "../common/EmptyState";
import { formatCurrency } from "../../utils/format";

const TH = "px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500";

export default function FeeTable({ data }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h2 className="font-bold text-slate-900">Student Fee Details</h2>
        <p className="mt-1 text-sm text-slate-500">Paid and remaining fee of every student.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-slate-50">
            <tr>
              <th className={TH}>Student</th>
              <th className={TH}>Class</th>
              <th className={TH}>Total Fee</th>
              <th className={TH}>Paid</th>
              <th className={TH}>Remaining</th>
              <th className={TH}>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 font-semibold">{s.name}</td>
                <td className="px-5 py-4 text-sm">{s.className}</td>
                <td className="px-5 py-4 font-semibold">{formatCurrency(s.totalFee)}</td>
                <td className="px-5 py-4 font-semibold text-emerald-600">{formatCurrency(s.paidFee)}</td>
                <td className="px-5 py-4 font-semibold text-red-600">{formatCurrency(s.remainingFee)}</td>
                <td className="px-5 py-4"><StatusBadge status={s.feeStatus} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && <EmptyState message="No fee records yet." />}
      </div>
    </div>
  );
}
