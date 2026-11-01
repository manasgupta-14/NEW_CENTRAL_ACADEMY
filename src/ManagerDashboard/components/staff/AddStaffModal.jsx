import { UserPlus } from "lucide-react";
import { managerApi } from "../../api/managerApi";
import EntityFormModal from "../common/EntityFormModal";
import { STAFF_FORM, STAFF_LABEL } from "../../config/forms";
import TeacherFormModal from "./TeacherFormModal";

export default function AddStaffModal({ type, onClose, onAdded }) {
  const label = STAFF_LABEL[type];
  // Teacher ke form me subject dropdown hai (Subjects page ki list), isliye wo alag modal hai
  if (type === "teaching") return <TeacherFormModal onClose={onClose} onSaved={onAdded} />;
  return (
    <EntityFormModal
      title={`Add ${label.title}`}
      subtitle={`Add a new ${label.noun} member to the school.`}
      fields={STAFF_FORM[type]}
      submitLabel="Add Staff"
      submitIcon={UserPlus}
      onClose={onClose}
      onSubmit={async (values) => {
        await managerApi.addStaff(type, values);
        onAdded();
      }}
    />
  );
}
