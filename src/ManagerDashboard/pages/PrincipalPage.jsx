import { useState } from "react";
import { Plus, ShieldCheck, UserCheck, Wallet } from "lucide-react";
import { managerApi } from "../api/managerApi";
import { useManagerData } from "../hooks/useManagerData";
import { formatCurrency } from "../utils/format";
import PageHeader from "../components/common/PageHeader";
import DataState from "../components/common/DataState";
import StatCard from "../components/common/StatCard";
import ActionButton from "../components/common/ActionButton";
import InlineError from "../components/common/InlineError";
import EmptyState from "../components/common/EmptyState";
import PrincipalCard from "../components/principal/PrincipalCard";
import PrincipalDetailsModal from "../components/principal/PrincipalDetailsModal";
import AddPrincipalModal from "../components/principal/AddPrincipalModal";

export default function PrincipalPage() {
  const { data, loading, error, reload } = useManagerData(managerApi.principals);
  const [viewing, setViewing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [actionError, setActionError] = useState("");

  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const principals = data.items;
  const active = principals.filter((p) => p.status === "active");
  const hasPrincipal = principals.length > 0; // school me sirf ek principal ho sakta hai
  const monthlySalary = principals.reduce((sum, p) => sum + Number(p.salary || 0), 0);

  const remove = async (principal) => {
    if (!window.confirm(`Are you sure you want to delete ${principal.name}? Their login will stop working.`)) return;
    setDeletingId(principal.id);
    setActionError("");
    try {
      await managerApi.deletePrincipal(principal.id);
      reload();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Principal Management"
        subtitle="View principal details. Only one principal can be added."
        action={
          <ActionButton
            icon={Plus}
            onClick={() => setAdding(true)}
            disabled={hasPrincipal}
            title={hasPrincipal ? "A principal is already added. Delete the current principal to add a new one." : undefined}
          >
            Add Principal
          </ActionButton>
        }
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard title="Total Principal" value={principals.length} icon={ShieldCheck} iconBg="bg-blue-100 text-blue-600" />
        <StatCard title="Active Principal" value={active.length} icon={UserCheck} iconBg="bg-emerald-100 text-emerald-600" />
        <StatCard title="Monthly Salary" value={formatCurrency(monthlySalary)} icon={Wallet} iconBg="bg-purple-100 text-purple-600" />
      </div>

      {hasPrincipal && (
        <p className="mt-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          A principal is already added. Only one principal is allowed - delete the current principal first if you want to add a new one.
        </p>
      )}

      <div className="mt-6"><InlineError message={actionError} /></div>

      {principals.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <EmptyState message="No principal added yet." />
        </div>
      ) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {principals.map((p) => (
            <PrincipalCard key={p.id} principal={p} onView={setViewing} onDelete={remove} deleting={deletingId === p.id} />
          ))}
        </div>
      )}

      {viewing && <PrincipalDetailsModal principal={viewing} onClose={() => setViewing(null)} />}
      {adding && (
        <AddPrincipalModal
          onClose={() => setAdding(false)}
          onAdded={() => {
            setAdding(false);
            reload();
          }}
        />
      )}
    </>
  );
}
