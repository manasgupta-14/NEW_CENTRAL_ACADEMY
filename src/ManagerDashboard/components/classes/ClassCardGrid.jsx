import { BookOpen, ChevronRight } from "lucide-react";

// groups: [{ name, lines: [text, ...] }]. Card par click karne se onSelect(name) chalta hai.
export default function ClassCardGrid({ groups, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {groups.map(({ name, lines }) => (
        <button
          key={name}
          type="button"
          onClick={() => onSelect(name)}
          className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <BookOpen size={22} />
            </div>
            <ChevronRight size={18} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900">{name}</h3>
          {lines.map((l, i) => (
            <p key={i} className={`mt-1 text-sm ${l.className || "text-slate-500"}`}>{l.text}</p>
          ))}
        </button>
      ))}
    </div>
  );
}
