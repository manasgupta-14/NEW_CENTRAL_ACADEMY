import { useState } from "react";
import { Mail, Plus, ShieldCheck, Trash2, UserCog } from "lucide-react";
import { managerApi } from "../api/managerApi";
import { useManagerData } from "../hooks/useManagerData";
import { formatDate } from "../utils/format";
import PageHeader from "../components/common/PageHeader";
import DataState from "../components/common/DataState";
import StatCard from "../components/common/StatCard";
import ActionButton from "../components/common/ActionButton";
import InlineError from "../components/common/InlineError";
import Avatar from "../components/common/Avatar";
import AddAdminModal from "../components/admin/AddAdminModal";

export default function AdminsPage() {
  const { data, loading, error, reload } = useManagerData(managerApi.admins);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [actionError, setActionError] = useState("");

  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const remove = async (admin) => {
    if (!window.confirm(`Delete admin ${admin.name}? Their login will stop working.`)) return;
    setDeletingId(admin.id);
    setActionError("");
    try {
      await managerApi.deleteAdmin(admin.id);
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
        title="Admin Management"
        subtitle="Add or remove people who can log in to this Manager Panel."
        action={<ActionButton icon={Plus} onClick={() => setAdding(true)}>Add Admin</ActionButton>}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <StatCard title="Total Admins" value={data.items.length} icon={UserCog} iconBg="bg-blue-100 text-blue-600" />
      </div>

      <div className="mt-6"><InlineError message={actionError} /></div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {data.items.map((a) => (
          <div key={a.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <Avatar name={a.name} size="lg" />
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-bold text-slate-900">{a.name}{a.isYou && <span className="ml-2 text-xs font-semibold text-blue-600">(You)</span>}</h2>
                <p className="flex items-center gap-1.5 truncate text-sm text-slate-500"><Mail size={14} />{a.email}</p>
                {a.createdAt && <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400"><ShieldCheck size={13} />Added {formatDate(a.createdAt)}</p>}
              </div>
              {!a.isYou && (
                <ActionButton variant="danger" icon={Trash2} onClick={() => remove(a)} disabled={deletingId === a.id}>
                  {deletingId === a.id ? "Deleting..." : "Delete"}
                </ActionButton>
              )}
            </div>
          </div>
        ))}
      </div>

      {adding && (
        <AddAdminModal
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
