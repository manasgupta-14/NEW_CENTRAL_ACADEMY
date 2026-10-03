const BASE =
  "w-full rounded-xl border border-navy-900/15 bg-paper-50 px-4 py-3 text-ink-900 placeholder:text-ink-900/35 transition focus:border-saffron-500 focus:outline-none focus:ring-4 focus:ring-saffron-500/20";

export default function FormField({ label, as: Tag = "input", className = "", children, ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-navy-900">{label}</span>
      <Tag className={BASE} {...props}>{children}</Tag>
    </label>
  );
}
