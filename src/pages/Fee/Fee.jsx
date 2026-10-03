import PortalLookup from "../../components/forms/PortalLookup";
import { ICONS } from "../../data/icons";
import { CLASS_OPTIONS } from "../../data/values";

function Fee() {
  return (
    <PortalLookup
      title="Fee details"
      icon={ICONS.wallet}
      intro="Check your child's fee status using the admission number."
      submitLabel="Check fee"
      help="For fee structure, dues or receipts, please contact the school office during working hours."
      fields={[
        { label: "Admission number", name: "admissionNo", placeholder: "e.g. NCA-1024" },
        { label: "Class", name: "className", as: "select", options: CLASS_OPTIONS },
      ]}
    />
  );
}

export default Fee;
