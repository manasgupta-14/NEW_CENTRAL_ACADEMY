import { useState } from "react";
import { CalendarDays, CalendarRange } from "lucide-react";
import { currentMonth, todayLocal } from "../utils/format";
import PageHeader from "../components/common/PageHeader";
import DailyAttendance from "../components/attendance/DailyAttendance";
import MonthlyAttendance from "../components/attendance/MonthlyAttendance";

const TABS = [
  { key: "students", label: "Students" },
  { key: "teachers", label: "Teachers" },
  { key: "principals", label: "Principal" },
];

const VIEWS = [
  { key: "daily", label: "Daily", icon: CalendarDays },
  { key: "monthly", label: "Monthly Report", icon: CalendarRange },
];

// Upar Students / Teachers / Principal tabs, aur Daily (attendance lagao) ya Monthly Report (pichle mahine bhi dekho) ka switch.
export default function AttendancePage() {
  const [group, setGroup] = useState("students");
  const [view, setView] = useState("daily");
  const [date, setDate] = useState(todayLocal);
  const [month, setMonth] = useState(currentMonth);

  const viewSwitch = (
    <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1" role="tablist" aria-label="Attendance view">
      {VIEWS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          role="tab"
          aria-selected={view === key}
          onClick={() => setView(key)}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${view === key ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <PageHeader
        title="Attendance"
        subtitle="Mark daily attendance and see past months for students (class-wise), teachers and principal."
        action={viewSwitch}
      />

      <div className="mb-6 flex gap-2 overflow-x-auto" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={group === t.key}
            onClick={() => setGroup(t.key)}
            className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold transition ${group === t.key ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white text-slate-600 hover:bg-slate-100"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* key={group}: tab badalte hi class ka selection reset ho jaye */}
      {view === "daily" ? (
        <DailyAttendance key={group} group={group} date={date} onDateChange={setDate} />
      ) : (
        <MonthlyAttendance key={group} group={group} month={month} onMonthChange={setMonth} />
      )}
    </>
  );
}
