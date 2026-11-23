import { useState } from "react";
import { CalendarDays, CalendarRange } from "lucide-react";
import { currentMonth, todayLocal } from "../../ManagerDashboard/utils/format";
import PageHeader from "../../ManagerDashboard/components/common/PageHeader";
import InfoNotice from "../../ManagerDashboard/components/common/InfoNotice";
import DailyAttendance from "../../ManagerDashboard/components/attendance/DailyAttendance";
import MonthlyAttendance from "../../ManagerDashboard/components/attendance/MonthlyAttendance";

const TABS = [
  { key: "teachers", label: "Teachers", canMark: true },
  { key: "students", label: "Students", canMark: false },
];
const VIEWS = [
  { key: "daily", label: "Daily", icon: CalendarDays },
  { key: "monthly", label: "Monthly Report", icon: CalendarRange },
];

// Principal teachers ki attendance laga sakta hai; students ki attendance sirf dekh sakta hai (class teacher lagata hai).
export default function AttendancePage() {
  const [group, setGroup] = useState("teachers");
  const [view, setView] = useState("daily");
  const [date, setDate] = useState(todayLocal);
  const [month, setMonth] = useState(currentMonth);
  const tab = TABS.find((t) => t.key === group);

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
      <PageHeader title="Attendance" subtitle="Mark teacher attendance and see student attendance class-wise." action={viewSwitch} />

      <div className="mb-6 flex gap-2 overflow-x-auto" role="tablist">
        {TABS.map((t) => (
          <button key={t.key} role="tab" aria-selected={group === t.key} onClick={() => setGroup(t.key)}
            className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold transition ${group === t.key ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white text-slate-600 hover:bg-slate-100"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {!tab.canMark && <InfoNotice className="mb-6">Student attendance is marked by each class teacher. You can view it here but cannot change it.</InfoNotice>}

      {view === "daily" ? (
        <DailyAttendance key={group} group={group} date={date} onDateChange={setDate} canMark={tab.canMark} />
      ) : (
        <MonthlyAttendance key={group} group={group} month={month} onMonthChange={setMonth} />
      )}
    </>
  );
}
