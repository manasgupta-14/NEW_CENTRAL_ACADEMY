import { useState } from "react";
import { Eye } from "lucide-react";
import { useManagerData } from "../../ManagerDashboard/hooks/useManagerData";
import { useManagerSession } from "../../ManagerDashboard/hooks/useManagerSession";
import { formatPercent } from "../../ManagerDashboard/utils/format";
import PageHeader from "../../ManagerDashboard/components/common/PageHeader";
import DataState from "../../ManagerDashboard/components/common/DataState";
import EmptyState from "../../ManagerDashboard/components/common/EmptyState";
import SelectFilter from "../../ManagerDashboard/components/common/SelectFilter";
import InfoNotice from "../../ManagerDashboard/components/common/InfoNotice";
import ClassStudentList from "../../ManagerDashboard/components/classes/ClassStudentList";
import ResultsModal from "../../ManagerDashboard/components/results/ResultsModal";
import MarksEntryForm from "../components/MarksEntryForm";

// Subject teacher apne subject ke marks daalta hai; class teacher apni class ke poore results dekhta hai.
export default function ResultsPage() {
  const { api } = useManagerSession();
  const classes = useManagerData(api.classes);
  const [picked, setPicked] = useState("");
  if (!classes.data) return <DataState loading={classes.loading} error={classes.error} onRetry={classes.reload} />;

  const list = classes.data.classes;
  const className = list.some((c) => c.className === picked) ? picked : list[0]?.className || "";

  return (
    <>
      <PageHeader title="Results" subtitle="Enter marks of your subject, and see the results of your class."
        action={list.length > 1 && <SelectFilter value={className} onChange={setPicked} label="Class" options={list.map((c) => ({ value: c.className, label: c.className }))} />} />
      {list.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm"><EmptyState message="No class or subject has been assigned to you yet." /></div>
      ) : (
        <ClassResults key={className} className={className} />
      )}
    </>
  );
}

function ClassResults({ className }) {
  const { api } = useManagerSession();
  const { data, loading, error, reload } = useManagerData(api.results, className);
  const [selectedId, setSelectedId] = useState(null);
  if (!data || data.className !== className) return <DataState loading={loading || !error} error={error} onRetry={reload} />;

  const selected = data.items.find((s) => s.id === selectedId);
  const latest = (s) => s.results[s.results.length - 1];

  return (
    <div className="space-y-6">
      {data.mySubjects.length > 0 ? (
        <MarksEntryForm className={className} subjects={data.mySubjects} exams={data.exams} students={data.items} onSaved={reload} />
      ) : (
        <InfoNotice>You are the class teacher of {className}, so you can see all results here. Marks are entered by each subject teacher.</InfoNotice>
      )}

      <ClassStudentList className={`${className} - ${data.isClassTeacher ? "All Results" : "My Subject Marks"}`} students={data.items} onBack={null} onOpen={(s) => setSelectedId(s.id)} emptyMessage="No students in this class yet."
        renderMeta={(s) => (
          <div className="flex shrink-0 items-center gap-4 text-right text-sm">
            {s.results.length ? <div><p className="text-xs text-slate-400">{latest(s).exam}</p><p className="font-semibold text-blue-600">{data.isClassTeacher ? formatPercent(latest(s).percent) : `${latest(s).total}/${latest(s).outOf}`}</p></div> : <span className="text-xs text-slate-400">No marks yet</span>}
            <Eye size={17} className="text-slate-300" />
          </div>
        )} />
      {selected && <ResultsModal student={{ ...selected, className }} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
