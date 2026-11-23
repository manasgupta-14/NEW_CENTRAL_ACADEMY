import { useState } from "react";
import { Eye, GraduationCap } from "lucide-react";
import { useManagerData } from "../../ManagerDashboard/hooks/useManagerData";
import { useManagerSession } from "../../ManagerDashboard/hooks/useManagerSession";
import { formatPercent } from "../../ManagerDashboard/utils/format";
import { groupByClass } from "../../ManagerDashboard/utils/classes";
import PageHeader from "../../ManagerDashboard/components/common/PageHeader";
import DataState from "../../ManagerDashboard/components/common/DataState";
import InfoNotice from "../../ManagerDashboard/components/common/InfoNotice";
import ClassCardGrid from "../../ManagerDashboard/components/classes/ClassCardGrid";
import ClassStudentList from "../../ManagerDashboard/components/classes/ClassStudentList";
import ResultsModal from "../../ManagerDashboard/components/results/ResultsModal";

// Results sirf dekhne ke liye: marks subject teachers daalte hain.
export default function ResultsPage() {
  const { api } = useManagerSession();
  const { data, loading, error, reload } = useManagerData(api.results);
  const [className, setClassName] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const groups = groupByClass(data.items);
  const group = groups.find((g) => g.name === className);
  const selected = data.items.find((s) => s.id === selectedId);
  const latest = (s) => s.results[s.results.length - 1];

  return (
    <>
      <PageHeader title="Results" subtitle="Exam results of every student, class-wise." />
      <InfoNotice className="mb-6">Results are view-only for the Principal. Marks are entered by the subject teachers.</InfoNotice>
      {!group ? (
        <ClassCardGrid
          groups={groups.map((g) => {
            const done = g.students.filter((s) => s.results.length).length;
            return { name: g.name, lines: [
              { text: `${g.students.length} ${g.students.length === 1 ? "Student" : "Students"}` },
              { text: done ? `${done} with results` : "No results yet", className: done ? "font-semibold text-blue-600" : "text-slate-400" },
            ] };
          })}
          onSelect={setClassName}
        />
      ) : (
        <ClassStudentList className={group.name} students={group.students} onBack={() => setClassName(null)} onOpen={(s) => setSelectedId(s.id)} emptyMessage="No students in this class yet."
          renderMeta={(s) => (
            <div className="flex shrink-0 items-center gap-4 text-right text-sm">
              {s.results.length ? (
                <div><p className="text-xs text-slate-400">{latest(s).exam}</p><p className="font-semibold text-blue-600">{formatPercent(latest(s).percent)}</p></div>
              ) : <span className="text-xs text-slate-400">No result</span>}
              <Eye size={17} className="text-slate-300" />
            </div>
          )} />
      )}
      {!group && data.items.length === 0 && <p className="mt-6 flex items-center gap-2 text-sm text-slate-500"><GraduationCap size={16} /> No students yet.</p>}
      {selected && <ResultsModal student={selected} onClose={() => setSelectedId(null)} />}
    </>
  );
}
