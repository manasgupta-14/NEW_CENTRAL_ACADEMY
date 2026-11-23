import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { useManagerSession } from "../../ManagerDashboard/hooks/useManagerSession";
import ActionButton from "../../ManagerDashboard/components/common/ActionButton";
import InlineError from "../../ManagerDashboard/components/common/InlineError";
import FormInput from "../../ManagerDashboard/components/common/FormInput";
import EmptyState from "../../ManagerDashboard/components/common/EmptyState";

const key = (s) => String(s || "").trim().toLowerCase();

// Subject teacher apne subject ke marks yahin daalta hai. Us exam ke pehle se daale hue marks apne aap bhar jaate hain.
export default function MarksEntryForm({ className, subjects, exams, students, onSaved }) {
  const [subject, setSubject] = useState(subjects[0]);
  const [exam, setExam] = useState(exams[exams.length - 1] || "");
  const [outOf, setOutOf] = useState("100");

  // Pehle se daale hue marks: { studentId: marks }, chuna hua exam + subject ke liye
  const existing = {};
  let savedOutOf = null;
  for (const s of students) {
    const r = s.results.find((x) => key(x.exam) === key(exam));
    const row = r?.subjects.find((x) => key(x.subject) === key(subject));
    if (row) {
      existing[s.id] = row.marks;
      savedOutOf = row.outOf;
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Enter Marks</h2>
      <p className="text-sm text-slate-500">Choose the subject and exam, then fill marks for {className}. Leave a box empty to skip that student.</p>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <FormInput label="Subject" as="select" value={subject} onChange={(e) => setSubject(e.target.value)}>
          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </FormInput>
        <FormInput label="Exam" list="exam-names" placeholder="e.g. Half Yearly 2026" maxLength={60} value={exam} onChange={(e) => setExam(e.target.value)} />
        <FormInput label="Maximum Marks" type="number" min="1" max="1000" value={outOf} onChange={(e) => setOutOf(e.target.value)} />
        <datalist id="exam-names">{exams.map((x) => <option key={x} value={x} />)}</datalist>
      </div>

      {!exam.trim() ? (
        <EmptyState message="Type an exam name to start entering marks." />
      ) : students.length === 0 ? (
        <EmptyState message="No students in this class yet." />
      ) : (
        <MarksTable key={`${subject}|${key(exam)}`} className={className} subject={subject} exam={exam.trim()} outOf={outOf} savedOutOf={savedOutOf} students={students} existing={existing} onSaved={onSaved} />
      )}
    </div>
  );
}

function MarksTable({ className, subject, exam, outOf, savedOutOf, students, existing, onSaved }) {
  const { api } = useManagerSession();
  const [values, setValues] = useState(() => Object.fromEntries(students.map((s) => [s.id, existing[s.id] ?? ""])));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const hasSaved = Object.keys(existing).length > 0;
  const max = Number(outOf) || 100;

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const res = await api.saveMarks(className, { exam, subject, outOf: Number(outOf) || 100, marks: students.map((s) => ({ id: s.id, marks: values[s.id] })) });
      setMessage(`Marks saved for ${res.updated} ${res.updated === 1 ? "student" : "students"}.`);
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!window.confirm(`Remove all ${subject} marks of "${exam}" for ${className}?`)) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await api.removeMarks(className, exam, subject);
      setValues(Object.fromEntries(students.map((s) => [s.id, ""])));
      setMessage("Marks removed.");
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} className="mt-6">
      {hasSaved && savedOutOf !== null && savedOutOf !== max && (
        <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">Saved marks for this exam are out of {savedOutOf}. Saving will change them to be out of {max}.</p>
      )}
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr><th className="px-4 py-3">Roll No.</th><th className="px-4 py-3">Student</th><th className="px-4 py-3 text-right">Marks (out of {max})</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-2.5 text-slate-500">{s.rollNo || "—"}</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">{s.name}</td>
                <td className="px-4 py-2.5 text-right">
                  <input type="number" min="0" max={max} step="0.5" value={values[s.id]} aria-label={`Marks of ${s.name}`}
                    onChange={(e) => setValues((v) => ({ ...v, [s.id]: e.target.value }))}
                    className="w-28 rounded-lg border border-slate-200 px-3 py-1.5 text-right text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4"><InlineError message={error} /></div>
      {message && <p role="status" className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{message}</p>}
      <div className="mt-5 flex flex-wrap gap-3">
        <ActionButton type="submit" icon={Save} disabled={busy}>{busy ? "Saving..." : hasSaved ? "Update Marks" : "Save Marks"}</ActionButton>
        {hasSaved && <ActionButton variant="danger" icon={Trash2} onClick={remove} disabled={busy}>Remove These Marks</ActionButton>}
      </div>
    </form>
  );
}
