import { useEffect } from "react";
import AdmissionForm from "./AdmissionForm";
import Icon from "../common/Icon";
import { ICONS } from "../../data/icons";
import { SCHOOL } from "../../data/school";

export default function AdmissionModal({ open, onClose }) {
  // Lock page scroll and close on Escape while the popup is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admission-title"
      className="fixed inset-0 z-[70] flex animate-fade items-center justify-center overflow-y-auto bg-navy-950/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative my-8 w-full max-w-xl animate-pop rounded-3xl bg-paper-50 p-6 shadow-2xl sm:p-9">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close admission form"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-navy-900 transition-all duration-300 hover:rotate-90 hover:bg-saffron-100"
        >
          <Icon d={ICONS.close} size={20} />
        </button>
        <p className="text-sm font-medium tracking-wide text-saffron-600">Admissions {SCHOOL.session}</p>
        <h2 id="admission-title" className="mt-1 font-display text-2xl font-semibold text-navy-900 md:text-3xl">
          Apply for admission
        </h2>
        <p className="mb-6 mt-2 text-sm text-ink-900/60">Fill in a few details and our team will get back to you.</p>
        <AdmissionForm onDone={onClose} />
      </div>
    </div>
  );
}
