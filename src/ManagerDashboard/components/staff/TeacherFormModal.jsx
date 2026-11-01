import { Save, UserPlus } from "lucide-react";
import { managerApi } from "../../api/managerApi";
import { useManagerData } from "../../hooks/useManagerData";
import Modal from "../common/Modal";
import DataState from "../common/DataState";
import ActionButton from "../common/ActionButton";
import EntityFormModal from "../common/EntityFormModal";
import { teachingForm } from "../../config/forms";

const dateOnly = (d) => (d ? String(d).slice(0, 10) : "");

// Teacher add aur edit dono isi se. `teacher` ho to edit, warna naya teacher.
// Subject dropdown Subjects page ki list se aata hai.
export default function TeacherFormModal({ teacher, onClose, onSaved }) {
  const editing = !!teacher;
  const { data, loading, error, reload } = useManagerData(managerApi.subjects);

  if (!data) {
    return (
      <Modal title={editing ? "Edit Teacher" : "Add Teaching Staff"} onClose={onClose}>
        <DataState loading={loading} error={error} onRetry={reload} />
      </Modal>
    );
  }

  const names = data.items.map((s) => s.name);
  // Teacher ka purana subject agar ab list me nahi hai (delete / rename hua) to bhi dropdown me dikhe, warna edit karte hi khaali ho jata
  if (editing && teacher.position && !names.includes(teacher.position)) names.push(teacher.position);

  if (!editing && names.length === 0) {
    return (
      <Modal title="Add Teaching Staff" onClose={onClose} maxWidth="max-w-lg">
        <div className="p-6">
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            There is no subject yet. Add subjects from the Subjects page first, then add the teacher.
          </p>
          <ActionButton variant="outline" className="mt-5 w-full py-3" onClick={onClose}>Close</ActionButton>
        </div>
      </Modal>
    );
  }

  const initialValues = editing
    ? {
        name: teacher.name,
        teacherId: teacher.teacherId,
        subject: teacher.position,
        qualification: teacher.qualification,
        phone: teacher.phone,
        email: teacher.email,
        joiningDate: dateOnly(teacher.joiningDate),
        salary: teacher.salary ?? "",
      }
    : undefined;

  return (
    <EntityFormModal
      title={editing ? "Edit Teacher" : "Add Teaching Staff"}
      subtitle={editing ? `Update details of ${teacher.name}.` : "Add a new teaching staff member to the school."}
      fields={teachingForm(names, editing)}
      initialValues={initialValues}
      submitLabel={editing ? "Save Changes" : "Add Staff"}
      submitIcon={editing ? Save : UserPlus}
      onClose={onClose}
      onSubmit={async (values) => {
        if (editing) await managerApi.editStaff("teaching", teacher.id, values);
        else await managerApi.addStaff("teaching", values);
        onSaved();
      }}
    />
  );
}
