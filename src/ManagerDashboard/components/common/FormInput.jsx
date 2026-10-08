import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const BASE =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

// type="password" wale har field me Show / Hide button. Add Staff / Principal / Student / Admin sab isi se bante hain.
export default function FormInput({ label, as: Tag = "input", className = "", children, optional = false, type, ...props }) {
  const [visible, setVisible] = useState(false);
  const isPassword = Tag === "input" && type === "password";

  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      {isPassword ? (
        <div className="relative">
          <input className={`${BASE} pr-11`} type={visible ? "text" : "password"} required={!optional} {...props} />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            onMouseDown={(e) => e.preventDefault()}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-xl text-slate-400 transition hover:text-blue-600 focus-visible:text-blue-600 focus-visible:outline-none"
          >
            {visible ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      ) : (
        <Tag className={BASE} required={!optional} type={type} {...props}>{children}</Tag>
      )}
    </label>
  );
}
