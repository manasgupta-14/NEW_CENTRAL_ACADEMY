import { useState } from "react";
import { CircleDollarSign, History, Plus, UserCheck } from "lucide-react";
import { managerApi } from "../api/managerApi";
import { useManagerData } from "../hooks/useManagerData";
import { STAFF_LABEL } from "../config/forms";
import { formatCurrency, matchesQuery } from "../utils/format";
import PageHeader from "../components/common/PageHeader";
import DataState from "../components/common/DataState";
import StatCard from "../components/common/StatCard";
import SearchBox from "../components/common/SearchBox";
import SelectFilter from "../components/common/SelectFilter";
import ActionButton from "../components/common/ActionButton";
import StaffTable from "../components/staff/StaffTable";
import StaffDetailsModal from "../components/staff/StaffDetailsModal";
import TeacherFormModal from "../components/staff/TeacherFormModal";
import DeactivateTeacherModal from "../components/staff/DeactivateTeacherModal";
import AddStaffModal from "../components/staff/AddStaffModal";

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "resigned", label: "Resigned" },
  { value: "terminated", label: "Terminated" },
];

// type: "teaching" | "non-teaching"
export default function StaffPage({ type }) {
  const { data, loading, error, reload } = useManagerData(managerApi.staff, type);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState(null);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null); // teacher edit
  const [deactivating, setDeactivating] = useState(null); // teacher deactivate

  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const label = STAFF_LABEL[type];
  const teaching = type === "teaching";
  const all = data.items;
  const active = all.filter((s) => s.status === "active");
  // Teaching staff me sirf active teachers dikhte hain; deactivate hue teachers Staff History me hote hain.
  const staff = teaching ? active : all;
  const monthlySalary = active.reduce((sum, s) => sum + Number(s.salary || 0), 0);
  const filtered = staff.filter(
    (s) => matchesQuery(search, s.name, s.position, s.email) && (status === "all" || s.status === status)
  );

  const addButton = <ActionButton icon={Plus} onClick={() => setAdding(true)}>Add Staff</ActionButton>;

  return (
    <>
      <PageHeader title={label.title} subtitle={teaching ? "View active teachers, edit their details or deactivate them. Deactivated teachers move to Staff History." : `View all ${label.noun} and salary details.`} action={addButton} />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard title="Active Staff" value={active.length} icon={UserCheck} iconBg="bg-emerald-100 text-emerald-600" />
        <StatCard title={teaching ? "In Staff History" : "Staff History"} value={all.length - active.length} icon={History} iconBg="bg-amber-100 text-amber-600" />
        <StatCard title="Monthly Salary" value={formatCurrency(monthlySalary)} icon={CircleDollarSign} iconBg="bg-blue-100 text-blue-600" />
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1"><SearchBox value={search} onChange={setSearch} placeholder="Search by name or role..." /></div>
        {!teaching && <SelectFilter value={status} onChange={setStatus} options={STATUS_OPTIONS} label="Filter by status" />}
      </div>

      <StaffTable
        data={filtered}
        type={type}
        onView={setSelected}
        onEdit={teaching ? setEditing : undefined}
        onDeactivate={teaching ? setDeactivating : undefined}
        emptyMessage={staff.length === 0 ? (teaching ? "No active teachers." : `No ${label.noun} added yet.`) : "No staff found."}
        emptyAction={staff.length === 0 && all.length === 0 ? addButton : null}
      />

      {selected && <StaffDetailsModal person={selected} onClose={() => setSelected(null)} onChanged={reload} />}
      {editing && (
        <TeacherFormModal
          teacher={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            reload();
          }}
        />
      )}
      {deactivating && (
        <DeactivateTeacherModal
          person={deactivating}
          onClose={() => setDeactivating(null)}
          onDone={() => {
            setDeactivating(null);
            reload();
          }}
        />
      )}
      {adding && (
        <AddStaffModal
          type={type}
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
