import { UserPlus } from "lucide-react";
import { managerApi } from "../../api/managerApi";
import EntityFormModal from "../common/EntityFormModal";
import { PRINCIPAL_FORM } from "../../config/forms";

export default function AddPrincipalModal({ onClose, onAdded }) {
  return (
    <EntityFormModal
      title="Add Principal"
      subtitle="Add a new principal to the school. They will log in with their name, email and this password."
      fields={PRINCIPAL_FORM}
      submitLabel="Add Principal"
      submitIcon={UserPlus}
      onClose={onClose}
      onSubmit={async (values) => {
        await managerApi.addPrincipal(values);
        onAdded();
      }}
    />
  );
}
