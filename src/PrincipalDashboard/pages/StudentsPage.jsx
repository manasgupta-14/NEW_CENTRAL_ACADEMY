import { useState } from "react";
import { BookOpen, GraduationCap, Users } from "lucide-react";
import { useManagerData } from "../../ManagerDashboard/hooks/useManagerData";
import { useManagerSession } from "../../ManagerDashboard/hooks/useManagerSession";
import { groupByClass } from "../../ManagerDashboard/utils/classes";
import PageHeader from "../../ManagerDashboard/components/common/PageHeader";
import DataState from "../../ManagerDashboard/components/common/DataState";
import StatCard from "../../ManagerDashboard/components/common/StatCard";
import StatusBadge from "../../ManagerDashboard/components/common/StatusBadge";
import ClassCardGrid from "../../ManagerDashboard/components/classes/ClassCardGrid";
import ClassStudentList from "../../ManagerDashboard/components/classes/ClassStudentList";
import StudentDetailsModal from "../../ManagerDashboard/components/students/StudentDetailsModal";

// Class cards -> class ke students -> student ki detail (sirf dekhna; naya admission Admissions page se hota hai).
export default function StudentsPage() {
  const { api } = useManagerSession();
  const { data, loading, error, reload } = useManagerData(api.students, "current");
  const [className, setClassName] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const groups = groupByClass(data.items);
  const group = groups.find((g) => g.name === className);
  const selected = data.items.find((s) => s.id === selectedId);

  return (
    <>
      <PageHeader title="Students" subtitle="Class-wise students currently studying in the school." />
      {!group ? (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <StatCard title="Current Students" value={data.items.length} icon={GraduationCap} iconBg="bg-blue-100 text-blue-600" />
            <StatCard title="Classes With Students" value={data.classCount} icon={BookOpen} iconBg="bg-purple-100 text-purple-600" />
            <StatCard title="All Students (incl. passed out)" value={data.totalStudents} icon={Users} iconBg="bg-emerald-100 text-emerald-600" />
          </div>
          <ClassCardGrid
            groups={groups.map((g) => ({ name: g.name, lines: [{ text: `${g.students.length} ${g.students.length === 1 ? "Student" : "Students"}`, className: "font-semibold text-blue-600" }] }))}
            onSelect={setClassName}
          />
        </>
      ) : (
        <ClassStudentList className={group.name} students={group.students} onBack={() => setClassName(null)} onOpen={(s) => setSelectedId(s.id)}
          emptyMessage="No students in this class yet." renderMeta={(s) => <StatusBadge status={s.feeStatus} />} />
      )}
      {selected && <StudentDetailsModal readOnly student={selected} onClose={() => setSelectedId(null)} />}
    </>
  );
}
