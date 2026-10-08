import { useState } from "react";
import { CheckCircle2, EyeOff, MessageSquareText, Star } from "lucide-react";
import { managerApi } from "../api/managerApi";
import { useManagerData } from "../hooks/useManagerData";
import PageHeader from "../components/common/PageHeader";
import DataState from "../components/common/DataState";
import StatCard from "../components/common/StatCard";
import EmptyState from "../components/common/EmptyState";
import InlineError from "../components/common/InlineError";
import FeedbackCard from "../components/feedback/FeedbackCard";

const TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
];

export default function FeedbackPage() {
  const [tab, setTab] = useState("all");
  const { data, loading, error, reload } = useManagerData(managerApi.feedback, tab);
  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState("");

  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const toggle = async (item) => {
    setBusyId(item.id);
    setActionError("");
    try {
      await managerApi.setFeedbackActive(item.id, !item.isActive);
      reload();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const { summary, items } = data;
  return (
    <>
      <PageHeader
        title="Feedback"
        subtitle="Jo feedback Active hoga wahi website ke Contact page par slider me dikhega."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Feedback" value={summary.total} icon={MessageSquareText} iconBg="bg-blue-100 text-blue-600" />
        <StatCard title="Active (on website)" value={summary.active} icon={CheckCircle2} iconBg="bg-emerald-100 text-emerald-600" />
        <StatCard title="Inactive" value={summary.inactive} icon={EyeOff} iconBg="bg-slate-100 text-slate-600" />
        <StatCard title="Average Rating" value={summary.averageRating || "—"} icon={Star} iconBg="bg-amber-100 text-amber-600" />
      </div>

      <div className="mt-6 inline-flex rounded-xl border border-slate-200 bg-white p-1" role="tablist" aria-label="Filter feedback">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition ${tab === t.key ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4"><InlineError message={actionError} /></div>

      {items.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white"><EmptyState message="No feedback here yet." /></div>
      ) : (
        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          {items.map((f) => (
            <FeedbackCard key={f.id} item={f} busy={busyId === f.id} onToggle={toggle} />
          ))}
        </div>
      )}
    </>
  );
}
