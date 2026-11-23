import { Link } from "react-router-dom";
import { CalendarCheck, CheckCircle2, ClipboardList, FilePlus2, GraduationCap, Users, Wallet, XCircle } from "lucide-react";
import { useManagerData } from "../../ManagerDashboard/hooks/useManagerData";
import { useManagerSession } from "../../ManagerDashboard/hooks/useManagerSession";
import { formatCurrency, formatDate, todayLocal } from "../../ManagerDashboard/utils/format";
import PageHeader from "../../ManagerDashboard/components/common/PageHeader";
import DataState from "../../ManagerDashboard/components/common/DataState";
import StatCard from "../../ManagerDashboard/components/common/StatCard";
import EmptyState from "../../ManagerDashboard/components/common/EmptyState";
import FeeCollectionCard from "../../ManagerDashboard/components/dashboard/FeeCollectionCard";
import ClassWiseStudents from "../../ManagerDashboard/components/dashboard/ClassWiseStudents";
import { BASE_PATH } from "../config/navigation";

const ADMISSION_STYLE = { new: "bg-blue-50 text-blue-700 border-blue-200", contacted: "bg-amber-50 text-amber-700 border-amber-200", admitted: "bg-emerald-50 text-emerald-700 border-emerald-200", rejected: "bg-red-50 text-red-700 border-red-200" };

function TodayCard({ title, data }) {
  const rows = [
    { label: "Present", value: data.present, icon: CheckCircle2, cls: "text-emerald-600" },
    { label: "Absent", value: data.absent, icon: XCircle, cls: "text-red-600" },
    { label: "On Leave", value: data.leave, icon: CalendarCheck, cls: "text-amber-600" },
  ];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-bold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500">{data.total} in total • {data.unmarked} not marked yet</p>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {rows.map(({ label, value, icon: Icon, cls }) => (
          <div key={label} className="rounded-xl bg-slate-50 p-4 text-center">
            <Icon size={20} className={`mx-auto ${cls}`} />
            <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { api } = useManagerSession();
  const { data, loading, error, reload } = useManagerData(api.overview, todayLocal());
  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const { students, staff, attendanceToday, fees, admissions, assignments } = data;
  return (
    <>
      <PageHeader title="Principal Dashboard" subtitle="Today's attendance, admissions, fees and teacher assignments at a glance." />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Current Students" value={students.current} description="Across all classes" icon={Users} iconBg="bg-emerald-100 text-emerald-600" />
        <StatCard title="Teaching Staff" value={staff.teaching} description={`${staff.nonTeaching} non-teaching staff`} icon={GraduationCap} iconBg="bg-blue-100 text-blue-600" />
        <StatCard title="Fee Collected" value={formatCurrency(fees.collected)} description={`${formatCurrency(fees.pending)} pending`} icon={Wallet} iconBg="bg-amber-100 text-amber-600" />
        <StatCard title="New Admission Requests" value={admissions.new} description={`${admissions.total} applications in total`} icon={FilePlus2} iconBg="bg-purple-100 text-purple-600" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <TodayCard title="Student Attendance Today" data={attendanceToday.students} />
        <TodayCard title="Teacher Attendance Today" data={attendanceToday.teachers} />
        <FeeCollectionCard fees={fees} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Recent Admission Requests</h2>
            <Link to={`${BASE_PATH}/admissions`} className="text-sm font-semibold text-blue-600 hover:underline">View all</Link>
          </div>
          {admissions.recent.length === 0 ? (
            <EmptyState message="No admission requests yet." />
          ) : (
            <ul className="divide-y divide-slate-100">
              {admissions.recent.map((a) => (
                <li key={a._id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">{a.studentName}</p>
                    <p className="truncate text-xs text-slate-500">{a.className} • {a.parentName} • {formatDate(a.createdAt)}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${ADMISSION_STYLE[a.status] || ""}`}>{a.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Teacher Assignments</h2>
            <Link to={`${BASE_PATH}/teacher-assignments`} className="text-sm font-semibold text-blue-600 hover:underline">Manage</Link>
          </div>
          <div className="space-y-4">
            {[
              { label: "Classes with a class teacher", ...assignments.classTeachers },
              { label: "Subjects given to teachers", ...assignments.subjects },
            ].map((x) => {
              const pct = x.total ? Math.round((x.assigned / x.total) * 100) : 0;
              return (
                <div key={x.label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-500"><ClipboardList size={14} className="mr-1 inline" />{x.label}</span>
                    <span className="font-semibold text-slate-800">{x.assigned} / {x.total}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{ width: `${pct}%` }} /></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6"><ClassWiseStudents classWise={students.classWise} /></div>
    </>
  );
}
