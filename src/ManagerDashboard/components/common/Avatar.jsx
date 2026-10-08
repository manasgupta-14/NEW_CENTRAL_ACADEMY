const SIZES = { sm: "h-9 w-9 text-sm", md: "h-10 w-10", lg: "h-16 w-16 text-2xl", xl: "h-20 w-20 text-3xl" };
const TONES = { blue: "bg-blue-100 text-blue-700", purple: "bg-purple-100 text-purple-700", slate: "bg-slate-200 text-slate-700" };

export default function Avatar({ name = "", size = "md", tone = "blue" }) {
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-full font-bold ${SIZES[size]} ${TONES[tone]}`}>
      {name.trim().charAt(0).toUpperCase() || "?"}
    </div>
  );
}
