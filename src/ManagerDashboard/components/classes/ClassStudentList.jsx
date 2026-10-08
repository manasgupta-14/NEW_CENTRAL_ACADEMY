import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Avatar from "../common/Avatar";
import SearchBox from "../common/SearchBox";
import EmptyState from "../common/EmptyState";
import ActionButton from "../common/ActionButton";
import { matchesQuery } from "../../utils/format";

// Ek class ke students ki list. `renderMeta(student)` se right side ka data aata hai (fee, status, etc.).
export default function ClassStudentList({ className, students, onBack, onOpen, renderMeta, emptyMessage, action }) {
  const [search, setSearch] = useState("");
  const shown = students.filter((s) => matchesQuery(search, s.name, s.rollNo, s.studentId, s.fatherName));

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <ActionButton variant="outline" icon={ArrowLeft} onClick={onBack}>All Classes</ActionButton>
        {action}
      </div>

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">{className}</h2>
        <p className="text-sm text-slate-500">{students.length} {students.length === 1 ? "student" : "students"}</p>
      </div>

      {students.length > 0 && <div className="mb-5"><SearchBox value={search} onChange={setSearch} placeholder="Search by name, roll no. or ID..." /></div>}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {shown.length === 0 ? (
          <EmptyState message={students.length === 0 ? emptyMessage : "No students found."} />
        ) : (
          <ul className="divide-y divide-slate-100">
            {shown.map((s) => (
              <li key={s.id}>
                <button type="button" onClick={() => onOpen(s)} className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-slate-50">
                  <Avatar name={s.name} tone="purple" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-900">{s.name}</p>
                    <p className="truncate text-xs text-slate-500">{s.rollNo ? `Roll No. ${s.rollNo} • ` : ""}{s.studentId}</p>
                  </div>
                  {renderMeta(s)}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
