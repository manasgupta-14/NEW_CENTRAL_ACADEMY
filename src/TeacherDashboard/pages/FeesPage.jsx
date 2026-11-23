import { useState } from "react";
import { AlertCircle, CheckCircle2, Clock3, IndianRupee } from "lucide-react";
import { useManagerData } from "../../ManagerDashboard/hooks/useManagerData";
import { useManagerSession } from "../../ManagerDashboard/hooks/useManagerSession";
import { formatCurrency } from "../../ManagerDashboard/utils/format";
import PageHeader from "../../ManagerDashboard/components/common/PageHeader";
import DataState from "../../ManagerDashboard/components/common/DataState";
import StatCard from "../../ManagerDashboard/components/common/StatCard";
import InfoNotice from "../../ManagerDashboard/components/common/InfoNotice";
import ClassStudentList from "../../ManagerDashboard/components/classes/ClassStudentList";
import StudentDetailsModal from "../../ManagerDashboard/components/students/StudentDetailsModal";
import NoClassTeacherNotice from "../components/NoClassTeacherNotice";

// Class teacher apni class ki fee sirf dekh sakta hai.
export default function FeesPage() {
  const { api } = useManagerSession();
  const { data, loading, error, reload } = useManagerData(api.fees);
  const [selectedId, setSelectedId] = useState(null);

  // 403 = class teacher nahi hai
  if (!data && error && /class teacher/i.test(error)) return <><PageHeader title="Fees" subtitle="Fee status of your class." /><NoClassTeacherNotice what="Fee status" /></>;
  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const { summary } = data;
  const selected = data.items.find((s) => s.id === selectedId);
  return (
    <>
      <PageHeader title="Fees" subtitle={`Fee status of ${data.className}.`} />
      <InfoNotice className="mb-6">Fees are view-only. Payments are recorded at the school office by the Manager.</InfoNotice>
      <div className="mb-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Fee" value={formatCurrency(summary.total)} icon={IndianRupee} iconBg="bg-blue-100 text-blue-600" />
        <StatCard title="Collected" value={formatCurrency(summary.collected)} icon={CheckCircle2} iconBg="bg-emerald-100 text-emerald-600" />
        <StatCard title="Pending" value={formatCurrency(summary.pending)} icon={Clock3} iconBg="bg-amber-100 text-amber-600" />
        <StatCard title="Delayed Students" value={summary.delayedStudents} description="Paid less than 50% of fee" icon={AlertCircle} iconBg="bg-red-100 text-red-600" />
      </div>
      <ClassStudentList className={data.className} students={data.items} onBack={null} onOpen={(s) => setSelectedId(s.id)} emptyMessage="No students in this class yet."
        renderMeta={(s) => (
          <div className="flex shrink-0 gap-6 text-right text-sm">
            <div><p className="text-xs text-slate-400">Paid</p><p className="font-semibold text-emerald-600">{formatCurrency(s.paidFee)}</p></div>
            <div><p className="text-xs text-slate-400">Pending</p><p className="font-semibold text-red-600">{formatCurrency(s.remainingFee)}</p></div>
          </div>
        )} />
      {selected && <StudentDetailsModal readOnly student={selected} onClose={() => setSelectedId(null)} />}
    </>
  );
}
