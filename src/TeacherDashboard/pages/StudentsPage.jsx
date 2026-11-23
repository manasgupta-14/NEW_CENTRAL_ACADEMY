import { useState } from "react";
import { BookOpen, ChevronRight } from "lucide-react";
import { useManagerData } from "../../ManagerDashboard/hooks/useManagerData";
import { useManagerSession } from "../../ManagerDashboard/hooks/useManagerSession";
import PageHeader from "../../ManagerDashboard/components/common/PageHeader";
import DataState from "../../ManagerDashboard/components/common/DataState";
import EmptyState from "../../ManagerDashboard/components/common/EmptyState";
import StatusBadge from "../../ManagerDashboard/components/common/StatusBadge";
import ClassStudentList from "../../ManagerDashboard/components/classes/ClassStudentList";
import StudentDetailsModal from "../../ManagerDashboard/components/students/StudentDetailsModal";

// Meri classes (class teacher wali + jin me subject padhata hu) -> students. Class teacher ko poori detail, subject teacher ko sirf naam / roll no.
export default function StudentsPage() {
  const { api } = useManagerSession();
  const classes = useManagerData(api.classes);
  const [className, setClassName] = useState(null);
  if (!classes.data) return <DataState loading={classes.loading} error={classes.error} onRetry={classes.reload} />;

  if (className) return <ClassView key={className} className={className} onBack={() => setClassName(null)} />;

  return (
    <>
      <PageHeader title="Students" subtitle="Students of the classes you teach." />
      {classes.data.classes.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm"><EmptyState message="No class or subject has been assigned to you yet." /></div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {classes.data.classes.map((c) => (
            <button key={c.className} type="button" onClick={() => setClassName(c.className)}
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600"><BookOpen size={22} /></div>
                <ChevronRight size={18} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{c.className}</h3>
              {c.isClassTeacher && <p className="mt-1 text-sm font-semibold text-blue-600">Class Teacher</p>}
              {c.subjects.length > 0 && <p className="mt-1 text-sm text-slate-500">{c.subjects.join(", ")}</p>}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function ClassView({ className, onBack }) {
  const { api } = useManagerSession();
  const fetchStudents = api.classStudents;
  const { data, loading, error, reload } = useManagerData(fetchStudents, className);
  const [selectedId, setSelectedId] = useState(null);
  if (!data || data.className !== className) return <DataState loading={loading || !error} error={error} onRetry={reload} />;

  const selected = data.items.find((s) => s.id === selectedId);
  return (
    <>
      <ClassStudentList className={className} students={data.items} onBack={onBack} onOpen={(s) => data.isClassTeacher && setSelectedId(s.id)} emptyMessage="No students in this class yet."
        renderMeta={(s) => (data.isClassTeacher ? <StatusBadge status={s.feeStatus} /> : <span className="text-xs text-slate-400">{s.gender}</span>)} />
      {selected && <StudentDetailsModal readOnly student={selected} onClose={() => setSelectedId(null)} />}
    </>
  );
}
