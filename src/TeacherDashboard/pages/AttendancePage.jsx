import { useState } from "react";
import { CalendarDays, CalendarRange } from "lucide-react";
import { useManagerData } from "../../ManagerDashboard/hooks/useManagerData";
import { useManagerSession } from "../../ManagerDashboard/hooks/useManagerSession";
import { currentMonth, todayLocal } from "../../ManagerDashboard/utils/format";
import PageHeader from "../../ManagerDashboard/components/common/PageHeader";
import DataState from "../../ManagerDashboard/components/common/DataState";
import DailyAttendance from "../../ManagerDashboard/components/attendance/DailyAttendance";
import MonthlyAttendance from "../../ManagerDashboard/components/attendance/MonthlyAttendance";
import NoClassTeacherNotice from "../components/NoClassTeacherNotice";

const VIEWS = [
  { key: "daily", label: "Daily", icon: CalendarDays },
  { key: "monthly", label: "Monthly Report", icon: CalendarRange },
];

// Class teacher sirf apni class ki attendance lagata hai. Class ka naam server se aata hai, teacher badal nahi sakta.
export default function AttendancePage() {
  const { api } = useManagerSession();
  const { data, loading, error, reload } = useManagerData(api.classes);
  const [view, setView] = useState("daily");
  const [date, setDate] = useState(todayLocal);
  const [month, setMonth] = useState(currentMonth);
  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const mine = data.classes.find((c) => c.isClassTeacher);

  const viewSwitch = (
    <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1" role="tablist" aria-label="Attendance view">
      {VIEWS.map(({ key, label, icon: Icon }) => (
        <button key={key} role="tab" aria-selected={view === key} onClick={() => setView(key)}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${view === key ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
          <Icon size={16} />{label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <PageHeader title="Attendance" subtitle={mine ? `Mark daily attendance and see past months for ${mine.className}.` : "Class attendance"} action={mine && viewSwitch} />
      {!mine ? (
        <NoClassTeacherNotice what="Marking attendance" />
      ) : view === "daily" ? (
        <DailyAttendance group="students" date={date} onDateChange={setDate} fixedClass={mine.className} />
      ) : (
        <MonthlyAttendance group="students" month={month} onMonthChange={setMonth} fixedClass={mine.className} />
      )}
    </>
  );
}
