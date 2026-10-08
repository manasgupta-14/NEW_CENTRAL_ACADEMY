import { formatCurrency } from "../../utils/format";

function Row({ label, value, valueClass = "" }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`font-semibold ${valueClass}`}>{value}</span>
    </div>
  );
}

export default function FeeCollectionCard({ fees }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-bold text-slate-900">Fee Collection</h2>
      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-500">Collection Progress</span>
          <span className="font-bold text-emerald-600">{Math.round(fees.collectedPercent)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${fees.collectedPercent}%` }} />
        </div>
        <div className="mt-5 space-y-3">
          <Row label="Total" value={formatCurrency(fees.total)} />
          <Row label="Collected" value={formatCurrency(fees.collected)} valueClass="text-emerald-600" />
          <Row label="Pending" value={formatCurrency(fees.pending)} valueClass="text-red-600" />
        </div>
      </div>
    </div>
  );
}
