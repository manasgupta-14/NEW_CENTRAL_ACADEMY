import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const BASE =
  "w-full rounded-xl border border-navy-900/15 bg-paper-50 px-4 py-3 text-ink-900 placeholder:text-ink-900/35 transition focus:border-saffron-500 focus:outline-none focus:ring-4 focus:ring-saffron-500/20";

// type="password" wale har field me khud Show / Hide ki eye-button aa jaati hai (Login ya kahin bhi).
export default function FormField({ label, as: Tag = "input", className = "", children, type, ...props }) {
  const [visible, setVisible] = useState(false);
  const isPassword = Tag === "input" && type === "password";

  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-navy-900">{label}</span>
      {isPassword ? (
        <div className="relative">
          <input className={`${BASE} pr-12`} type={visible ? "text" : "password"} {...props} />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            onMouseDown={(e) => e.preventDefault()} // input ka focus na hate
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-navy-900/50 transition-colors hover:text-saffron-600 focus-visible:text-saffron-600 focus-visible:outline-none"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      ) : (
        <Tag className={BASE} type={type} {...props}>{children}</Tag>
      )}
    </label>
  );
}
