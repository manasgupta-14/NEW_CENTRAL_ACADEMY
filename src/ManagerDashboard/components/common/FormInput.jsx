const BASE =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function FormInput({ label, as: Tag = "input", className = "", children, optional = false, ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      <Tag className={BASE} required={!optional} {...props}>{children}</Tag>
    </label>
  );
}
