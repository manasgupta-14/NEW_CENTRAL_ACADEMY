export default function ProfileItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-slate-400">
        <Icon size={17} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="mt-0.5 break-words text-sm font-semibold text-slate-800">{value || "—"}</p>
      </div>
    </div>
  );
}
