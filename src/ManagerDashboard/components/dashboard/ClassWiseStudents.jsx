import { BookOpen } from "lucide-react";
import EmptyState from "../common/EmptyState";

export default function ClassWiseStudents({ classWise }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-900">Class-wise Students</h2>
          <p className="text-sm text-slate-500">Current students in each class</p>
        </div>
        <BookOpen className="text-blue-600" />
      </div>

      {classWise.length === 0 ? (
        <EmptyState message="No students added yet." />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {classWise.map(({ className, count }) => (
            <div key={className} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
              <p className="text-lg font-bold text-slate-900">{className}</p>
              <p className="mt-1 text-sm font-semibold text-blue-600">{count} {count === 1 ? "Student" : "Students"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
