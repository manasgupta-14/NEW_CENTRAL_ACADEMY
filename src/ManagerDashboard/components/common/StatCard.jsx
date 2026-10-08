export default function StatCard({ title, value, icon: Icon, description, iconBg }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>
          {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon size={23} />
        </div>
      </div>
    </div>
  );
}
