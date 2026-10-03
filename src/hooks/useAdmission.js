import { useContext } from "react";
import { AdmissionContext } from "../context/AdmissionContext";

// Any component can call openAdmission() to show the admission popup.
export default function useAdmission() {
  return useContext(AdmissionContext);
}
