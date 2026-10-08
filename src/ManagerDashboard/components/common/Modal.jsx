import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ title, subtitle, onClose, children, maxWidth = "max-w-2xl" }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label={title} className={`max-h-[90vh] w-full ${maxWidth} overflow-y-auto rounded-2xl bg-white shadow-2xl`}>
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-2 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
