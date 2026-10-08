import { Loader2 } from "lucide-react";

export default function LoadingState({ fullScreen = false, label = "Loading..." }) {
  return (
    <div className={`flex items-center justify-center text-slate-500 ${fullScreen ? "min-h-screen bg-slate-50" : "py-24"}`} role="status">
      <Loader2 className="mr-2 animate-spin" size={20} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
