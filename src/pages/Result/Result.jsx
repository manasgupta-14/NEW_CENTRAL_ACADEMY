import PortalLookup from "../../components/forms/PortalLookup";
import { ICONS } from "../../data/icons";
import { CLASS_OPTIONS } from "../../data/values";

function Result() {
  return (
    <PortalLookup
      title="Results"
      icon={ICONS.award}
      intro="Find exam results using the admission number and date of birth."
      submitLabel="Show result"
      help="Result sheets are also handed out at the school after every exam. Call the office if you need a copy."
      fields={[
        { label: "Admission number", name: "admissionNo", placeholder: "e.g. NCA-1024" },
        { label: "Class", name: "className", as: "select", options: CLASS_OPTIONS },
        { label: "Date of birth", name: "dob", type: "date" },
      ]}
    />
  );
}

export default Result;
