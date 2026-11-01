import { useState } from "react";
import { History, UserMinus, UserX, XCircle } from "lucide-react";
import { managerApi } from "../api/managerApi";
import { useManagerData } from "../hooks/useManagerData";
import { matchesQuery } from "../utils/format";
import PageHeader from "../components/common/PageHeader";
import DataState from "../components/common/DataState";
import StatCard from "../components/common/StatCard";
import SearchBox from "../components/common/SearchBox";
import EmptyState from "../components/common/EmptyState";
import StaffHistoryCard from "../components/staff/StaffHistoryCard";
import StaffDetailsModal from "../components/staff/StaffDetailsModal";

export default function StaffHistoryPage() {
  const { data, loading, error, reload } = useManagerData(managerApi.staffHistory);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const history = data.items;
  const filtered = history.filter((p) => matchesQuery(search, p.name, p.position, p.category));

  return (
    <>
      <PageHeader title="Staff History" subtitle="Deactivated, resigned and terminated staff. Open a deactivated teacher to reactivate them." />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total History" value={history.length} icon={History} iconBg="bg-slate-100 text-slate-600" />
        <StatCard title="Deactivated" value={history.filter((p) => p.status === "inactive").length} icon={UserMinus} iconBg="bg-blue-100 text-blue-600" />
        <StatCard title="Resigned" value={history.filter((p) => p.status === "resigned").length} icon={UserX} iconBg="bg-amber-100 text-amber-600" />
        <StatCard title="Terminated" value={history.filter((p) => p.status === "terminated").length} icon={XCircle} iconBg="bg-red-100 text-red-600" />
      </div>

      <div className="mb-5"><SearchBox value={search} onChange={setSearch} placeholder="Search by name or role..." /></div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <EmptyState message={history.length === 0 ? "No staff has been deactivated, resigned or terminated." : "No staff found."} />
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((person) => (
            <StaffHistoryCard key={`${person.type}-${person.id}`} person={person} onView={setSelected} />
          ))}
        </div>
      )}

      {selected && <StaffDetailsModal person={selected} onClose={() => setSelected(null)} onChanged={reload} />}
    </>
  );
}
