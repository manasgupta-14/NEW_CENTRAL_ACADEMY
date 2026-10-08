import { TrendingUp } from "lucide-react";
import { formatCurrency } from "../../utils/format";

function Tile({ label, value, valueClass = "" }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-bold ${valueClass}`}>{value}</p>
    </div>
  );
}

export default function SchoolOverviewCard({ students, fees }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-900">School Overview</h2>
          <p className="text-sm text-slate-500">Current school statistics</p>
        </div>
        <TrendingUp size={22} className="text-emerald-600" />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Tile label="Total Students" value={students.total} />
        <Tile label="Total Fee" value={formatCurrency(fees.total)} />
        <Tile label="Pending Fee" value={formatCurrency(fees.pending)} valueClass="text-red-600" />
      </div>
    </div>
  );
}
