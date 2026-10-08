import { UserPlus } from "lucide-react";
import { managerApi } from "../../api/managerApi";
import EntityFormModal from "../common/EntityFormModal";
import { STAFF_FORM, STAFF_LABEL } from "../../config/forms";

export default function AddStaffModal({ type, onClose, onAdded }) {
  const label = STAFF_LABEL[type];
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
