import { useState } from "react";
import { BookOpen, GraduationCap, UserPlus, Users } from "lucide-react";
import { managerApi } from "../api/managerApi";
import { useManagerData } from "../hooks/useManagerData";
import { groupByClass } from "../utils/classes";
import PageHeader from "../components/common/PageHeader";
import DataState from "../components/common/DataState";
import StatCard from "../components/common/StatCard";
import StatusBadge from "../components/common/StatusBadge";
import ActionButton from "../components/common/ActionButton";
import ClassCardGrid from "../components/classes/ClassCardGrid";
import ClassStudentList from "../components/classes/ClassStudentList";
import StudentDetailsModal from "../components/students/StudentDetailsModal";
import AddStudentModal from "../components/students/AddStudentModal";

// Class cards (Playway se Class 8) -> class ke students -> student ki detail.
export default function StudentsPage({ passedOut = false }) {
  const { data, loading, error, reload } = useManagerData(managerApi.students, passedOut ? "passed-out" : "current");
  const [className, setClassName] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [adding, setAdding] = useState(false);

  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const students = data.items;
  const groups = groupByClass(students);
  const group = groups.find((g) => g.name === className);
  const selected = students.find((s) => s.id === selectedId);

  const admitButton = !passedOut && <ActionButton icon={UserPlus} onClick={() => setAdding(true)}>Admit Student</ActionButton>;

  return (
    <>
      <PageHeader
        title={passedOut ? "Passed Out Students" : "Current Students"}
        subtitle={passedOut ? "Class-wise students who have completed their school education." : "Class-wise students currently studying in the school."}
        action={!group && admitButton}
      />

      {!group ? (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <StatCard title={passedOut ? "Passed Out" : "Current Students"} value={students.length} icon={GraduationCap} iconBg="bg-blue-100 text-blue-600" />
            <StatCard title="Classes With Students" value={data.classCount} icon={BookOpen} iconBg="bg-purple-100 text-purple-600" />
            <StatCard title="Total Students" value={data.totalStudents} icon={Users} iconBg="bg-emerald-100 text-emerald-600" />
          </div>
          <ClassCardGrid
            groups={groups.map((g) => ({
              name: g.name,
              lines: [{ text: `${g.students.length} ${g.students.length === 1 ? "Student" : "Students"}`, className: "font-semibold text-blue-600" }],
            }))}
            onSelect={setClassName}
          />
        </>
      ) : (
        <ClassStudentList
          className={group.name}
          students={group.students}
          onBack={() => setClassName(null)}
          onOpen={(s) => setSelectedId(s.id)}
          emptyMessage={passedOut ? "No passed out students in this class." : "No students in this class yet."}
          action={admitButton}
          renderMeta={(s) => <StatusBadge status={s.feeStatus} />}
        />
      )}

      {selected && <StudentDetailsModal student={selected} onClose={() => setSelectedId(null)} onChanged={reload} />}
      {adding && (
        <AddStudentModal
          onClose={() => setAdding(false)}
          onAdded={() => {
            setAdding(false);
            reload();
          }}
        />
      )}
    </>
  );
}
