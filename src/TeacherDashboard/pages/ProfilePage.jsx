import { useState } from "react";
import { BookOpen, CalendarDays, ChevronLeft, ChevronRight, Clock, GraduationCap, IdCard, Mail, Phone, UserRound } from "lucide-react";
import { useManagerData } from "../../ManagerDashboard/hooks/useManagerData";
import { useManagerSession } from "../../ManagerDashboard/hooks/useManagerSession";
import { currentMonth, experienceFrom, formatDate, formatPercent, monthLabel, shiftMonth } from "../../ManagerDashboard/utils/format";
import PageHeader from "../../ManagerDashboard/components/common/PageHeader";
import DataState from "../../ManagerDashboard/components/common/DataState";
import Avatar from "../../ManagerDashboard/components/common/Avatar";
import ProfileItem from "../../ManagerDashboard/components/common/ProfileItem";
import ActionButton from "../../ManagerDashboard/components/common/ActionButton";
import ChangePasswordCard from "../../ManagerDashboard/components/common/ChangePasswordCard";

const CELL = {
  present: "bg-emerald-100 text-emerald-700",
  absent: "bg-red-100 text-red-700",
  leave: "bg-amber-100 text-amber-700",
};

export default function ProfilePage() {
  const { api } = useManagerSession();
  const [month, setMonth] = useState(currentMonth);
  const { data, loading, error, reload } = useManagerData(api.profile, month);
  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const { profile: p, subjects, attendance: a } = data;
  const thisMonth = currentMonth();
  const days = Array.from({ length: a.daysInMonth }, (_, i) => i + 1);

  return (
    <>
      <PageHeader title="My Profile" subtitle="Your details and your own attendance. To change your details, please contact the Manager." />

      <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar name={p.name} size="lg" />
          <div className="min-w-0"><h2 className="truncate text-xl font-bold text-slate-900">{p.name}</h2><p className="text-sm text-slate-500">Teacher{p.classTeacherOf ? ` • Class Teacher of ${p.classTeacherOf}` : ""}</p></div>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <ProfileItem icon={UserRound} label="Full Name" value={p.name} />
          <ProfileItem icon={IdCard} label="Teacher ID" value={p.teacherId} />
          <ProfileItem icon={Mail} label="Email" value={p.email} />
          <ProfileItem icon={Phone} label="Phone" value={p.phone} />
          <ProfileItem icon={BookOpen} label="Main Subject" value={p.position} />
          <ProfileItem icon={GraduationCap} label="Qualification" value={p.qualification} />
          <ProfileItem icon={CalendarDays} label="Joining Date" value={formatDate(p.joiningDate)} />
          <ProfileItem icon={Clock} label="Experience" value={experienceFrom(p.joiningDate)} />
        </div>
        {subjects.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {subjects.map((s) => <span key={`${s.className}-${s.subject}`} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{s.className}: {s.subject}</span>)}
          </div>
        )}
      </div>

      <div className="mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><h2 className="text-lg font-bold text-slate-900">My Attendance</h2><p className="text-sm text-slate-500">{monthLabel(month)} • {a.present} present, {a.absent} absent, {a.leave} leave • {a.total ? formatPercent(a.percent) : "—"}</p></div>
          <div className="flex gap-2">
            <ActionButton variant="outline" icon={ChevronLeft} aria-label="Previous month" onClick={() => setMonth(shiftMonth(month, -1))} />
            <ActionButton variant="outline" icon={ChevronRight} aria-label="Next month" disabled={month >= thisMonth} onClick={() => setMonth(shiftMonth(month, 1))} />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-7 gap-2 sm:grid-cols-10">
          {days.map((d) => (
            <div key={d} title={a.days[d] || "Not marked"} className={`flex h-11 flex-col items-center justify-center rounded-lg text-xs ${CELL[a.days[d]] || "bg-slate-50 text-slate-400"}`}>
              <span className="font-bold">{d}</span>
              <span className="text-[10px] font-semibold">{a.days[d] ? a.days[d][0].toUpperCase() : "·"}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">P = Present, A = Absent, L = Leave. Attendance is marked by the Manager or Principal.</p>
      </div>

      <div className="mt-6"><ChangePasswordCard /></div>
    </>
  );
}
