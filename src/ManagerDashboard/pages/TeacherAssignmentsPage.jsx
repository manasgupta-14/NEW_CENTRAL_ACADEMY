import { useState } from "react";
import { BookOpenCheck, ClipboardCheck, GraduationCap } from "lucide-react";
import { managerApi } from "../api/managerApi";
import { useManagerData } from "../hooks/useManagerData";
import PageHeader from "../components/common/PageHeader";
import DataState from "../components/common/DataState";
import StatCard from "../components/common/StatCard";
import SelectFilter from "../components/common/SelectFilter";
import EmptyState from "../components/common/EmptyState";
import ClassAssignmentCard from "../components/assignments/ClassAssignmentCard";

export default function TeacherAssignmentsPage() {
  const { data, loading, error, reload } = useManagerData(managerApi.teacherAssignments);
  const [className, setClassName] = useState("all");

  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const { classes, teachers } = data;
  const withClassTeacher = classes.filter((c) => c.classTeacher).length;
  const allSubjects = classes.flatMap((c) => c.subjects);
  const assigned = allSubjects.filter((s) => s.teacher).length;
  const visible = className === "all" ? classes : classes.filter((c) => c.className === className);
  const options = [{ value: "all", label: "All Classes" }, ...classes.map((c) => ({ value: c.className, label: c.className }))];

  return (
    <>
      <PageHeader
        title="Teacher Assignments"
        subtitle="Make class teachers and give subjects to teachers. A class has one class teacher, and one subject of a class goes to one teacher only."
        action={<SelectFilter value={className} onChange={setClassName} options={options} label="Filter by class" />}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard title="Classes with Class Teacher" value={`${withClassTeacher} / ${classes.length}`} icon={GraduationCap} iconBg="bg-blue-100 text-blue-600" />
        <StatCard title="Subjects Assigned" value={assigned} icon={ClipboardCheck} iconBg="bg-emerald-100 text-emerald-600" />
        <StatCard title="Subjects Available" value={allSubjects.length - assigned} icon={BookOpenCheck} iconBg="bg-amber-100 text-amber-600" />
      </div>

      {teachers.length === 0 && (
        <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          No active teaching staff yet. Add teachers from the Teaching Staff page first, then assign them here.
        </p>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        {visible.map((cls) => (
          <ClassAssignmentCard key={cls.className} cls={cls} teachers={teachers} onChanged={reload} />
        ))}
      </div>

      <h2 className="mb-3 mt-10 text-lg font-bold text-slate-900">Teachers Overview</h2>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        {teachers.length === 0 ? (
          <EmptyState message="No active teachers." />
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Teacher</th>
                <th className="px-4 py-3">Class Teacher Of</th>
                <th className="px-4 py-3">Teaching</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teachers.map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.teacherId}</p>
                  </td>
                  <td className="px-4 py-3">{t.classTeacherOf || <span className="text-slate-400">—</span>}</td>
                  <td className="px-4 py-3">
                    {t.assignments.length === 0 ? (
                      <span className="text-slate-400">No subject assigned</span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {t.assignments.map((a) => (
                          <span key={`${a.className}-${a.subject}`} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                            {a.className}: {a.subject}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
