import { useMemo, useState } from "react";
import { AdmissionContext } from "./AdmissionContext";
import AdmissionModal from "../components/forms/AdmissionModal";

export default function AdmissionProvider({ children }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ openAdmission: () => setOpen(true) }), []);

  return (
    <AdmissionContext.Provider value={value}>
      {children}
      <AdmissionModal open={open} onClose={() => setOpen(false)} />
    </AdmissionContext.Provider>
  );
}
