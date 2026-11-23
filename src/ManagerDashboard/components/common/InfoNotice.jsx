import { Info } from "lucide-react";

// tone: "blue" (jaankari, jaise "sirf dekh sakte hain") ya "amber" (chetavni)
const TONES = { blue: "border-blue-100 bg-blue-50 text-blue-700", amber: "border-amber-200 bg-amber-50 text-amber-800" };

export default function InfoNotice({ children, tone = "blue", className = "" }) {
  return (
    <p className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${TONES[tone]} ${className}`}>
      <Info size={16} className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}
