import { useState } from "react";
import { Plus, UserCheck, UserMinus } from "lucide-react";
import { managerApi } from "../../api/managerApi";
import ActionButton from "../common/ActionButton";
import InlineError from "../common/InlineError";

const SELECT = "min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500";

// Teacher dropdown. `blockClassTeachers` = true ho to jo teacher pehle se kisi class ka class teacher hai wo disabled dikhta hai.
function TeacherSelect({ value, onChange, teachers, blockClassTeachers = false, label }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label} className={SELECT}>
      <option value="">Select teacher</option>
      {teachers.map((t) => {
        const blocked = blockClassTeachers && t.classTeacherOf;
        return (
          <option key={t.id} value={t.id} disabled={!!blocked}>
            {t.name} ({t.teacherId}){blocked ? ` - class teacher of ${t.classTeacherOf}` : ""}
          </option>
        );
      })}
    </select>
  );
}

// Ek class ka card: class teacher + har subject ka teacher (ya "Available"). Har action ke baad server se data dobara aata hai.
export default function ClassAssignmentCard({ cls, teachers, onChanged }) {
  const [editing, setEditing] = useState(null); // "class-teacher" | subjectId
  const [teacherId, setTeacherId] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const open = (key) => {
    setEditing(key);
    setTeacherId("");
    setError("");
  };

  const run = async (fn) => {
    setSaving(true);
    setError("");
    try {
      await fn();
      setEditing(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
      onChanged(); // fail hone par bhi taaki dusre manager ka change dikh jaye
    }
  };

  const assignClassTeacher = () => run(() => managerApi.assignClassTeacher(cls.className, teacherId));
  const removeClassTeacher = () => {
    if (!window.confirm(`Remove ${cls.classTeacher.name} as class teacher of ${cls.className}?`)) return;
    run(() => managerApi.removeClassTeacher(cls.className));
  };
  const assignSubject = (subjectId) => run(() => managerApi.assignSubject(cls.className, subjectId, teacherId));
  const unassignSubject = (row) => {
    if (!window.confirm(`Take ${row.subject} of ${cls.className} back from ${row.teacher.name}? It will become available again.`)) return;
    run(() => managerApi.unassignSubject(row.assignmentId));
  };

  const assignedCount = cls.subjects.filter((s) => s.teacher).length;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-900">{cls.className}</h3>
        <span className="text-xs font-semibold text-slate-500">{assignedCount}/{cls.subjects.length} subjects assigned</span>
      </div>

      <div className="mt-4">
        <InlineError message={error} />
      </div>

      {/* Class teacher */}
      <div className="mt-4 rounded-xl bg-blue-50/60 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Class Teacher</p>
        {cls.classTeacher ? (
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-semibold text-slate-800">
              {cls.classTeacher.name} <span className="font-normal text-slate-500">({cls.classTeacher.teacherId})</span>
            </span>
            <ActionButton variant="danger" icon={UserMinus} disabled={saving} onClick={removeClassTeacher} className="!px-3 !py-1.5">Remove</ActionButton>
          </div>
        ) : editing === "class-teacher" ? (
          <div className="mt-2 flex flex-wrap gap-2">
            <TeacherSelect value={teacherId} onChange={setTeacherId} teachers={teachers} blockClassTeachers label={`Class teacher of ${cls.className}`} />
            <ActionButton icon={UserCheck} disabled={saving || !teacherId} onClick={assignClassTeacher} className="!px-3 !py-2">Assign</ActionButton>
            <ActionButton variant="outline" disabled={saving} onClick={() => setEditing(null)} className="!px-3 !py-2">Cancel</ActionButton>
          </div>
        ) : (
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm text-slate-500">Not assigned</span>
            <ActionButton variant="soft" icon={Plus} disabled={saving} onClick={() => open("class-teacher")} className="!px-3 !py-1.5">Assign</ActionButton>
          </div>
        )}
      </div>

      {/* Subjects */}
      {cls.subjects.length === 0 && (
        <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
          No subject is set for {cls.className}. Add one from the Subjects page and select this class.
        </p>
      )}
      <ul className="mt-4 divide-y divide-slate-100">
        {cls.subjects.map((row) => (
          <li key={row.subjectId} className="py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">{row.subject}</p>
                {row.teacher ? (
                  <p className="text-sm text-slate-500">{row.teacher.name} ({row.teacher.teacherId})</p>
                ) : (
                  <span className="mt-1 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">Available</span>
                )}
              </div>
              {row.teacher ? (
                <ActionButton variant="danger" icon={UserMinus} disabled={saving} onClick={() => unassignSubject(row)} className="!px-3 !py-1.5">Unassign</ActionButton>
              ) : editing !== row.subjectId ? (
                <ActionButton variant="soft" icon={Plus} disabled={saving} onClick={() => open(row.subjectId)} className="!px-3 !py-1.5">Assign</ActionButton>
              ) : null}
            </div>
            {!row.teacher && editing === row.subjectId && (
              <div className="mt-2 flex flex-wrap gap-2">
                <TeacherSelect value={teacherId} onChange={setTeacherId} teachers={teachers} label={`Teacher for ${row.subject}`} />
                <ActionButton icon={UserCheck} disabled={saving || !teacherId} onClick={() => assignSubject(row.subjectId)} className="!px-3 !py-2">Assign</ActionButton>
                <ActionButton variant="outline" disabled={saving} onClick={() => setEditing(null)} className="!px-3 !py-2">Cancel</ActionButton>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
