import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorState({ message, onRetry, fullScreen = false }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 px-4 text-center ${fullScreen ? "min-h-screen bg-slate-50" : "py-24"}`} role="alert">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertCircle size={24} />
      </div>
      <p className="max-w-md text-sm text-slate-600">{message || "Something went wrong."}</p>
      {onRetry && (
        <button onClick={onRetry} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
          <RefreshCw size={15} />
          Try again
        </button>
      )}
    </div>
  );
}
