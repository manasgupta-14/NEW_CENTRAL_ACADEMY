import { UserPlus } from "lucide-react";
import { managerApi } from "../../api/managerApi";
import EntityFormModal from "../common/EntityFormModal";
import { ADMIN_FORM } from "../../config/forms";

export default function AddAdminModal({ onClose, onAdded }) {
  return (
    <EntityFormModal
      title="Add Admin"
      subtitle="The new admin gets full Manager Panel access and logs in with this email and password."
      fields={ADMIN_FORM}
      submitLabel="Add Admin"
      submitIcon={UserPlus}
      onClose={onClose}
      onSubmit={async (values) => {
        await managerApi.addAdmin(values);
        onAdded();
      }}
    />
  );
}
