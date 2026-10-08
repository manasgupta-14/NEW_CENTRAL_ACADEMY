import { UserPlus } from "lucide-react";
import { managerApi } from "../../api/managerApi";
import EntityFormModal from "../common/EntityFormModal";
import { STUDENT_FORM } from "../../config/forms";

export default function AddStudentModal({ onClose, onAdded }) {
  return (
    <EntityFormModal
      title="Admit New Student"
      subtitle="Fill the admission details. The student will log in with the Student ID and this password."
      fields={STUDENT_FORM}
      submitLabel="Admit Student"
      submitIcon={UserPlus}
      onClose={onClose}
      onSubmit={async (values) => {
        await managerApi.addStudent(values);
        onAdded();
      }}
    />
  );
}
