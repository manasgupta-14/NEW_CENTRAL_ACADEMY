import { Link } from "react-router-dom";
import { BookOpen, CalendarCheck, CheckCircle2, IndianRupee, Users, XCircle } from "lucide-react";
import { useManagerData } from "../../ManagerDashboard/hooks/useManagerData";
import { useManagerSession } from "../../ManagerDashboard/hooks/useManagerSession";
import { formatCurrency, formatPercent, todayLocal } from "../../ManagerDashboard/utils/format";
import PageHeader from "../../ManagerDashboard/components/common/PageHeader";
import DataState from "../../ManagerDashboard/components/common/DataState";
import StatCard from "../../ManagerDashboard/components/common/StatCard";
import EmptyState from "../../ManagerDashboard/components/common/EmptyState";
import FeeCollectionCard from "../../ManagerDashboard/components/dashboard/FeeCollectionCard";
import NoClassTeacherNotice from "../components/NoClassTeacherNotice";
import { BASE_PATH } from "../config/navigation";

export default function DashboardPage() {
  const { api } = useManagerSession();
  const { data, loading, error, reload } = useManagerData(api.overview, todayLocal());
  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const cls = data.classTeacherClass;
  return (
    <>
      <PageHeader title={`Welcome, ${data.name}`} subtitle={cls ? `You are the class teacher of ${cls.className}.` : "Your classes, subjects and attendance at a glance."} />

      {!cls && <div className="mb-6"><NoClassTeacherNotice what="Class attendance and fees" /></div>}

      {cls && (
        <>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title={`${cls.className} Students`} value={cls.students} icon={Users} iconBg="bg-blue-100 text-blue-600" />
            <StatCard title="Present Today" value={cls.today.present} description={`${cls.today.unmarked} not marked yet`} icon={CheckCircle2} iconBg="bg-emerald-100 text-emerald-600" />
            <StatCard title="Absent Today" value={cls.today.absent} description={`${cls.today.leave} on leave`} icon={XCircle} iconBg="bg-red-100 text-red-600" />
            <StatCard title="Class Attendance (month)" value={cls.month.total ? formatPercent(cls.month.percent) : "—"} icon={CalendarCheck} iconBg="bg-amber-100 text-amber-600" />
          </div>
          {cls.today.unmarked > 0 && (
            <p className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Today's attendance of {cls.today.unmarked} {cls.today.unmarked === 1 ? "student is" : "students are"} not marked yet.
              <Link to={`${BASE_PATH}/attendance`} className="font-semibold underline">Mark attendance</Link>
            </p>
          )}
        </>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div><h2 className="font-bold text-slate-900">My Subjects</h2><p className="text-sm text-slate-500">Subjects given to you, class-wise</p></div>
            <BookOpen className="text-blue-600" />
          </div>
          {data.subjects.length === 0 ? (
            <EmptyState message="No subject has been assigned to you yet." />
          ) : (
            <ul className="divide-y divide-slate-100">
              {data.subjects.map((s) => (
                <li key={`${s.className}-${s.subject}`} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-semibold text-slate-800">{s.subject}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{s.className}</span>
                </li>
              ))}
            </ul>
          )}
          <Link to={`${BASE_PATH}/results`} className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline">Enter marks</Link>
        </div>

        {cls ? <FeeCollectionCard fees={cls.fees} /> : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">My Attendance This Month</h2>
            <p className="mt-2 text-sm text-slate-500">{data.myAttendance.present} present • {data.myAttendance.absent} absent • {data.myAttendance.leave} leave</p>
          </div>
        )}
      </div>

      {cls && (
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <StatCard title="My Attendance (month)" value={data.myAttendance.total ? formatPercent(data.myAttendance.percent) : "—"} description={`${data.myAttendance.present} present • ${data.myAttendance.absent} absent`} icon={CalendarCheck} iconBg="bg-purple-100 text-purple-600" />
          <StatCard title="Fee Pending (class)" value={formatCurrency(cls.fees.pending)} description={`${cls.fees.delayedStudents} delayed students`} icon={IndianRupee} iconBg="bg-red-100 text-red-600" />
        </div>
      )}
    </>
  );
}
