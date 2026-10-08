import { useState } from "react";
import { CalendarX, CheckCircle2, ChevronLeft, ChevronRight, Percent, XCircle } from "lucide-react";
import { managerApi } from "../../api/managerApi";
import { useManagerData } from "../../hooks/useManagerData";
import { CLASS_LIST } from "../../config/forms";
import { currentMonth, formatPercent, matchesQuery, monthLabel, shiftMonth } from "../../utils/format";
import DataState from "../common/DataState";
import StatCard from "../common/StatCard";
import SearchBox from "../common/SearchBox";
import EmptyState from "../common/EmptyState";
import ActionButton from "../common/ActionButton";
import SelectFilter from "../common/SelectFilter";

const CLASS_OPTIONS = [{ value: "", label: "Select class" }, ...CLASS_LIST.map((c) => ({ value: c, label: c }))];

const CELL = {
  present: { letter: "P", style: "bg-emerald-100 text-emerald-700", title: "Present" },
  absent: { letter: "A", style: "bg-red-100 text-red-700", title: "Absent" },
  leave: { letter: "L", style: "bg-amber-100 text-amber-700", title: "Leave" },
};

// "group|month|className" ek key me (useManagerData ko ek hi stable function + ek argument chahiye)
const fetchMonth = (key) => {
  const [group, month, className] = key.split("|");
  return managerApi.attendanceMonth(group, month, className);
};

// Pichle mahine (ya kisi bhi mahine) ki attendance, din-ba-din.
// Attendance badalni ho to Daily view me us din ki date chuno.
export default function MonthlyAttendance({ group, month, onMonthChange }) {
  const [className, setClassName] = useState("");
  const thisMonth = currentMonth();
  const needsClass = group === "students" && !className;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <ActionButton variant="outline" icon={ChevronLeft} onClick={() => onMonthChange(shiftMonth(month, -1))} aria-label="Previous month" />
        <input
          type="month"
          value={month}
          max={thisMonth}
          onChange={(e) => e.target.value && onMonthChange(e.target.value)}
          aria-label="Attendance month"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        <ActionButton variant="outline" icon={ChevronRight} onClick={() => onMonthChange(shiftMonth(month, 1))} disabled={month >= thisMonth} aria-label="Next month" />
        <ActionButton variant="soft" onClick={() => onMonthChange(shiftMonth(thisMonth, -1))} disabled={month === shiftMonth(thisMonth, -1)}>Last Month</ActionButton>
        <ActionButton variant="soft" onClick={() => onMonthChange(thisMonth)} disabled={month === thisMonth}>This Month</ActionButton>
        {group === "students" && <SelectFilter value={className} onChange={setClassName} options={CLASS_OPTIONS} label="Class" />}
      </div>

      {needsClass ? (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <EmptyState message="Select a class to see its monthly attendance." />
        </div>
      ) : (
        <MonthReport key={`${group}|${month}|${className}`} group={group} month={month} className={className} />
      )}
    </>
  );
}

function MonthReport({ group, month, className }) {
  const { data, loading, error, reload } = useManagerData(fetchMonth, `${group}|${month}|${className}`);
  const [search, setSearch] = useState("");

  if (!data || data.group !== group || data.month !== month || (data.className || "") !== className) {
    return <DataState loading={loading || !error} error={error} onRetry={reload} />;
  }

  const [year, mon] = month.split("-").map(Number);
  const days = Array.from({ length: data.daysInMonth }, (_, i) => i + 1);
  const weekday = (d) => new Date(Date.UTC(year, mon - 1, d)).getUTCDay(); // 0 = Sunday

  const rows = data.items;
  const shown = rows.filter((r) => matchesQuery(search, r.name, r.rollNo, r.studentId));
  const total = (key) => rows.reduce((a, r) => a + r[key], 0);
  const overall = total("total") ? Math.round((total("present") / total("total")) * 1000) / 10 : null;
  const noun = group === "principals" ? "principal" : group === "teachers" ? "teachers" : "students";

  return (
    <>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Present Days" value={total("present")} icon={CheckCircle2} iconBg="bg-emerald-100 text-emerald-600" />
        <StatCard title="Absent Days" value={total("absent")} icon={XCircle} iconBg="bg-red-100 text-red-600" />
        <StatCard title="Leave Days" value={total("leave")} icon={CalendarX} iconBg="bg-amber-100 text-amber-600" />
        <StatCard title="Attendance" value={formatPercent(overall)} icon={Percent} iconBg="bg-blue-100 text-blue-600" />
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{monthLabel(month)}{className ? ` • ${className}` : ""}</h2>
          <p className="text-sm text-slate-500">{rows.length} {noun}</p>
        </div>
        <p className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          {Object.values(CELL).map((c) => (
            <span key={c.letter} className="inline-flex items-center gap-1.5">
              <span className={`inline-flex h-5 w-5 items-center justify-center rounded text-[11px] font-bold ${c.style}`}>{c.letter}</span>
              {c.title}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5"><span className="inline-flex h-5 w-5 items-center justify-center text-slate-300">·</span>Not marked</span>
        </p>
      </div>

      {rows.length > 0 && <div className="mb-5"><SearchBox value={search} onChange={setSearch} placeholder="Search by name or ID..." /></div>}

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        {shown.length === 0 ? (
          <EmptyState message={rows.length === 0 ? `No ${noun} found for this month.` : "No results found."} />
        ) : (
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500">
                <th className="sticky left-0 z-10 min-w-[180px] bg-slate-50 px-4 py-3 text-left font-semibold">Name</th>
                {days.map((d) => (
                  <th key={d} className={`min-w-[32px] px-0.5 py-2 text-center font-medium ${weekday(d) === 0 ? "bg-slate-100 text-slate-400" : ""}`}>
                    <div>{d}</div>
                    <div className="text-[10px] font-normal">{"SMTWTFS"[weekday(d)]}</div>
                  </th>
                ))}
                <th className="px-3 py-3 text-center font-semibold text-emerald-700">P</th>
                <th className="px-3 py-3 text-center font-semibold text-red-700">A</th>
                <th className="px-3 py-3 text-center font-semibold text-amber-700">L</th>
                <th className="px-3 py-3 text-center font-semibold">%</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.id} className="border-t border-slate-100">
                  <td className="sticky left-0 z-10 bg-white px-4 py-2.5">
                    <p className="truncate font-semibold text-slate-900">{r.name}</p>
                    <p className="truncate text-xs text-slate-500">{[r.rollNo && `Roll No. ${r.rollNo}`, r.position, r.studentId].filter(Boolean).join(" • ")}</p>
                  </td>
                  {days.map((d) => {
                    const c = CELL[r.days[d]];
                    return (
                      <td key={d} className={`px-0.5 py-1.5 text-center ${weekday(d) === 0 ? "bg-slate-50" : ""}`}>
                        {c ? (
                          <span title={c.title} className={`inline-flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold ${c.style}`}>{c.letter}</span>
                        ) : (
                          <span className="text-slate-300">·</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-3 text-center font-semibold text-emerald-700">{r.present}</td>
                  <td className="px-3 text-center font-semibold text-red-700">{r.absent}</td>
                  <td className="px-3 text-center font-semibold text-amber-700">{r.leave}</td>
                  <td className="px-3 text-center font-semibold text-slate-800">{formatPercent(r.percent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
