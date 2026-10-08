import { useState } from "react";
import { CalendarX, CheckCircle2, Clock3, XCircle } from "lucide-react";
import { managerApi } from "../../api/managerApi";
import { useManagerData } from "../../hooks/useManagerData";
import { groupByClass } from "../../utils/classes";
import { formatPercent, todayLocal } from "../../utils/format";
import DataState from "../common/DataState";
import StatCard from "../common/StatCard";
import ClassCardGrid from "../classes/ClassCardGrid";
import AttendanceList from "./AttendanceList";

// useManagerData ko ek hi stable function aur ek hi argument chahiye, isliye "group|date" ek key me
const fetchAttendance = (key) => {
  const [group, date] = key.split("|");
  return managerApi.attendance(group, date);
};

const count = (rows, status) => rows.filter((r) => (r.status || "unmarked") === status).length;
const sum = (rows, fn) => rows.reduce((a, r) => a + fn(r), 0);

// Kisi ek din ki attendance dekhna / lagana. Students me pehle class chuno.
export default function DailyAttendance({ group, date, onDateChange }) {
  const [className, setClassName] = useState(null);
  const { data, loading, error, reload } = useManagerData(fetchAttendance, `${group}|${date}`);

  const dateInput = (
    <div className="mb-6 flex items-center gap-3">
      <span className="text-sm font-semibold text-slate-600">Date</span>
      <input
        type="date"
        value={date}
        max={todayLocal()}
        onChange={(e) => e.target.value && onDateChange(e.target.value)}
        aria-label="Attendance date"
        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );

  // Date badalte hi purana data nayi list me na dikhe, isliye jab tak sahi group + date ka data na aaye loading dikhao
  if (!data || data.group !== group || data.date !== date) {
    return (
      <>
        {dateInput}
        <DataState loading={loading || !error} error={error} onRetry={reload} />
      </>
    );
  }

  const rows = data.items;
  const inClass = group === "students" && className;
  const groups = group === "students" ? groupByClass(rows) : [];
  const classRows = inClass ? rows.filter((r) => r.className === className) : rows;

  return (
    <>
      {dateInput}

      {!inClass && (
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Present" value={count(rows, "present")} icon={CheckCircle2} iconBg="bg-emerald-100 text-emerald-600" />
          <StatCard title="Absent" value={count(rows, "absent")} icon={XCircle} iconBg="bg-red-100 text-red-600" />
          <StatCard title="On Leave" value={count(rows, "leave")} icon={CalendarX} iconBg="bg-amber-100 text-amber-600" />
          <StatCard title="Not Marked" value={count(rows, "unmarked")} icon={Clock3} iconBg="bg-slate-100 text-slate-600" />
        </div>
      )}

      {group === "students" && !inClass ? (
        <ClassCardGrid
          groups={groups.map((g) => {
            const monthTotal = sum(g.students, (s) => s.month.total);
            const monthPresent = sum(g.students, (s) => s.month.present);
            return {
              name: g.name,
              lines: [
                { text: `${g.students.length} ${g.students.length === 1 ? "Student" : "Students"}` },
                { text: `P ${count(g.students, "present")} • A ${count(g.students, "absent")} • L ${count(g.students, "leave")}`, className: "font-semibold text-slate-700" },
                { text: count(g.students, "unmarked") ? `${count(g.students, "unmarked")} not marked` : g.students.length ? "All marked" : "—", className: count(g.students, "unmarked") ? "font-semibold text-amber-600" : "text-emerald-600" },
                { text: `This month ${monthTotal ? formatPercent(Math.round((monthPresent / monthTotal) * 1000) / 10) : "—"}`, className: "text-blue-600" },
              ],
            };
          })}
          onSelect={setClassName}
        />
      ) : (
        <AttendanceList
          key={`${group}|${date}|${className}`}
          title={inClass ? className : group === "teachers" ? "Teachers" : "Principal"}
          subtitle={`${classRows.length} ${group === "principals" ? "principal" : group === "teachers" ? "teachers" : "students"} • ${new Date(`${data.date}T00:00:00`).toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "short", year: "numeric" })}`}
          group={group}
          date={date}
          rows={classRows}
          onSaved={reload}
          onBack={inClass ? () => setClassName(null) : null}
          emptyMessage={inClass ? "No students in this class yet." : group === "teachers" ? "No active teachers added yet." : "No active principal added yet."}
        />
      )}
    </>
  );
}
