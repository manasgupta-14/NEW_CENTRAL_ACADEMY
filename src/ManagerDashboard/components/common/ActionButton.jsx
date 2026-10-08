const VARIANTS = {
  primary: "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700",
  soft: "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700",
  danger: "bg-red-50 text-red-600 hover:bg-red-100",
  outline: "border border-slate-200 text-slate-700 hover:bg-slate-50",
};

export default function ActionButton({ variant = "primary", icon: Icon, className = "", children, ...rest }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}
