export default function EmptyState({ message, action }) {
  return (
    <div className="flex flex-col items-center gap-3 px-5 py-12 text-center">
      <p className="text-sm text-slate-500">{message}</p>
      {action}
    </div>
  );
}
