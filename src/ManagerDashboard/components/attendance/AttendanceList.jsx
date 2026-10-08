import { useState } from "react";
import { ArrowLeft, CheckCheck, ClipboardCheck, Save } from "lucide-react";
import { managerApi } from "../../api/managerApi";
import Avatar from "../common/Avatar";
import SearchBox from "../common/SearchBox";
import EmptyState from "../common/EmptyState";
import ActionButton from "../common/ActionButton";
import InlineError from "../common/InlineError";
import StatusBadge from "../common/StatusBadge";
import { formatPercent, matchesQuery } from "../../utils/format";

const OPTIONS = [
  { value: "present", label: "P", title: "Present", on: "bg-emerald-600 text-white" },
  { value: "absent", label: "A", title: "Absent", on: "bg-red-600 text-white" },
  { value: "leave", label: "L", title: "Leave", on: "bg-amber-500 text-white" },
];

// Ek list (class ke students / teachers / principal) ki attendance, us date ke liye.
// "Mark Attendance" dabane par har naam ke aage P / A / L aa jaate hain, Save karne par ek saath save hota hai.
export default function AttendanceList({ title, subtitle, group, date, rows, onSaved, onBack, emptyMessage }) {
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState(null); // null = sirf dekh rahe hain, object = edit mode { id: status }
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const editing = draft !== null;
  const shown = rows.filter((r) => matchesQuery(search, r.name, r.rollNo, r.studentId));

  const startEdit = () => {
    setError("");
    setDraft(Object.fromEntries(rows.map((r) => [r.id, r.status || "present"])));
  };
  const setAll = (status) => setDraft(Object.fromEntries(rows.map((r) => [r.id, status])));

  const save = async () => {
    setBusy(true);
    setError("");
    try {
      await managerApi.markAttendance(group, { date, records: rows.map((r) => ({ id: r.id, status: draft[r.id] })) });
      setDraft(null);
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        {onBack ? <ActionButton variant="outline" icon={ArrowLeft} onClick={onBack}>All Classes</ActionButton> : <span />}
        {rows.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {editing ? (
              <>
                <ActionButton variant="soft" icon={CheckCheck} onClick={() => setAll("present")} disabled={busy}>All Present</ActionButton>
                <ActionButton variant="outline" onClick={() => setDraft(null)} disabled={busy}>Cancel</ActionButton>
                <ActionButton icon={Save} onClick={save} disabled={busy}>{busy ? "Saving..." : "Save Attendance"}</ActionButton>
              </>
            ) : (
              <ActionButton icon={ClipboardCheck} onClick={startEdit}>Mark Attendance</ActionButton>
            )}
          </div>
        )}
      </div>

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="mb-5"><InlineError message={error} /></div>
      {rows.length > 0 && <div className="mb-5"><SearchBox value={search} onChange={setSearch} placeholder="Search by name or ID..." /></div>}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {shown.length === 0 ? (
          <EmptyState message={rows.length === 0 ? emptyMessage : "No results found."} />
        ) : (
          <ul className="divide-y divide-slate-100">
            {shown.map((r) => (
              <li key={r.id} className="flex items-center gap-4 px-5 py-4">
                <Avatar name={r.name} tone="purple" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-900">{r.name}</p>
                  <p className="truncate text-xs text-slate-500">
                    {[r.rollNo && `Roll No. ${r.rollNo}`, r.position, r.studentId].filter(Boolean).join(" • ")}
                  </p>
                </div>

                <div className="hidden shrink-0 text-right sm:block">
                  <p className="text-xs text-slate-400">This month</p>
                  <p className="text-sm font-semibold text-slate-800" title={`Present ${r.month.present}, Absent ${r.month.absent}, Leave ${r.month.leave}`}>
                    {formatPercent(r.month.percent)} <span className="font-normal text-slate-400">({r.month.present}/{r.month.total})</span>
                  </p>
                </div>

                {editing ? (
                  <div className="flex shrink-0 overflow-hidden rounded-xl border border-slate-200" role="group" aria-label={`Attendance of ${r.name}`}>
                    {OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        title={o.title}
                        aria-pressed={draft[r.id] === o.value}
                        onClick={() => setDraft((d) => ({ ...d, [r.id]: o.value }))}
                        className={`h-10 w-10 text-sm font-bold transition ${draft[r.id] === o.value ? o.on : "bg-white text-slate-500 hover:bg-slate-50"}`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <StatusBadge status={r.status || "unmarked"} />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
