import { useState } from "react";
import { AlertCircle, CheckCircle2, Clock3, IndianRupee } from "lucide-react";
import { managerApi } from "../api/managerApi";
import { useManagerData } from "../hooks/useManagerData";
import { formatCurrency } from "../utils/format";
import { groupByClass } from "../utils/classes";
import PageHeader from "../components/common/PageHeader";
import DataState from "../components/common/DataState";
import StatCard from "../components/common/StatCard";
import ClassCardGrid from "../components/classes/ClassCardGrid";
import ClassStudentList from "../components/classes/ClassStudentList";
import StudentDetailsModal from "../components/students/StudentDetailsModal";

const sum = (rows, key) => rows.reduce((a, s) => a + s[key], 0);

// Class cards -> class ke students (naam, paid, pending) -> student par click: mummy, papa, mobile + fee detail.
export default function FeesPage() {
  const { data, loading, error, reload } = useManagerData(managerApi.fees);
  const [className, setClassName] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const { summary } = data;
  const groups = groupByClass(data.items);
  const group = groups.find((g) => g.name === className);
  const selected = data.items.find((s) => s.id === selectedId);

  return (
    <>
      <PageHeader title="Fee Management" subtitle="Class-wise paid and pending fees of every student." />

      {!group ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total Fee" value={formatCurrency(summary.total)} icon={IndianRupee} iconBg="bg-blue-100 text-blue-600" />
            <StatCard title="Collected" value={formatCurrency(summary.collected)} icon={CheckCircle2} iconBg="bg-emerald-100 text-emerald-600" />
            <StatCard title="Pending" value={formatCurrency(summary.pending)} icon={Clock3} iconBg="bg-amber-100 text-amber-600" />
            <StatCard title="Delayed Students" value={summary.delayedStudents} description="Paid less than 50% of fee" icon={AlertCircle} iconBg="bg-red-100 text-red-600" />
          </div>

          <div className="mt-6">
            <ClassCardGrid
              groups={groups.map((g) => ({
                name: g.name,
                lines: [
                  { text: `${g.students.length} ${g.students.length === 1 ? "Student" : "Students"}` },
                  { text: `Paid ${formatCurrency(sum(g.students, "paidFee"))}`, className: "font-semibold text-emerald-600" },
                  { text: `Pending ${formatCurrency(sum(g.students, "remainingFee"))}`, className: "font-semibold text-red-600" },
                ],
              }))}
              onSelect={setClassName}
            />
          </div>
        </>
      ) : (
        <ClassStudentList
          className={group.name}
          students={group.students}
          onBack={() => setClassName(null)}
          onOpen={(s) => setSelectedId(s.id)}
          emptyMessage="No students in this class yet."
          renderMeta={(s) => (
            <div className="flex shrink-0 gap-6 text-right text-sm">
              <div>
                <p className="text-xs text-slate-400">Paid</p>
                <p className="font-semibold text-emerald-600">{formatCurrency(s.paidFee)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Pending</p>
                <p className="font-semibold text-red-600">{formatCurrency(s.remainingFee)}</p>
              </div>
            </div>
          )}
        />
      )}

      {selected && <StudentDetailsModal student={selected} onClose={() => setSelectedId(null)} onChanged={reload} />}
    </>
  );
}
