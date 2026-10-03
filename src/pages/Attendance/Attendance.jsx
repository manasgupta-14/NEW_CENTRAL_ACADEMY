import PortalLookup from "../../components/forms/PortalLookup";
import { ICONS } from "../../data/icons";
import { CLASS_OPTIONS } from "../../data/values";

function Attendance() {
  return (
    <PortalLookup
      title="Attendance"
      icon={ICONS.calendar}
      intro="See how regularly your child has been attending school."
      submitLabel="View attendance"
      help="If you notice a mistake in your child's attendance, tell the class teacher or call the school office."
      fields={[
        { label: "Admission number", name: "admissionNo", placeholder: "e.g. NCA-1024" },
        { label: "Class", name: "className", as: "select", options: CLASS_OPTIONS },
      ]}
    />
  );
}

export default Attendance;
