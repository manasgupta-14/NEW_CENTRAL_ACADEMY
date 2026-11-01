import { useState } from "react";
import { BookOpen, CheckCircle2, Plus, CircleDashed } from "lucide-react";
import { managerApi } from "../api/managerApi";
import { useManagerData } from "../hooks/useManagerData";
import { matchesQuery } from "../utils/format";
import PageHeader from "../components/common/PageHeader";
import DataState from "../components/common/DataState";
import StatCard from "../components/common/StatCard";
import SearchBox from "../components/common/SearchBox";
import SelectFilter from "../components/common/SelectFilter";
import ActionButton from "../components/common/ActionButton";
import InlineError from "../components/common/InlineError";
import SubjectTable from "../components/subjects/SubjectTable";
import SubjectFormModal from "../components/subjects/SubjectFormModal";

// Subjects master list. Manager aur Principal dono yahan subject add / edit / delete kar sakte hain.
// Teacher Assignments page par isi list ke subjects teachers ko diye jaate hain.
export default function SubjectsPage() {
  const { data, loading, error, reload } = useManagerData(managerApi.subjects);
  const [search, setSearch] = useState("");
  const [className, setClassName] = useState("all");
  const [form, setForm] = useState(null); // null | "new" | subject
  const [busyId, setBusyId] = useState("");
  const [actionError, setActionError] = useState("");

  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const subjects = data.items;
  const given = subjects.filter((s) => s.assignedCount > 0).length;
  const filtered = subjects.filter((s) => matchesQuery(search, s.name) && (className === "all" || s.classes.includes(className)));
  const classOptions = [{ value: "all", label: "All Classes" }, ...data.classes.map((c) => ({ value: c, label: c }))];

  const remove = async (s) => {
    const warning = s.assignedCount > 0 ? ` It is currently given to teachers in ${s.assignedCount} class${s.assignedCount > 1 ? "es" : ""}, and those will be unassigned.` : "";
    if (!window.confirm(`Delete subject "${s.name}"?${warning}`)) return;
    setBusyId(s.id);
    setActionError("");
    try {
      await managerApi.deleteSubject(s.id);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setBusyId("");
      reload();
    }
  };

  const addButton = <ActionButton icon={Plus} onClick={() => setForm("new")}>Add Subject</ActionButton>;

  return (
    <>
      <PageHeader title="Subjects" subtitle="Add, edit or delete subjects. Teachers are given subjects from this list on the Teacher Assignments page." action={addButton} />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Subjects" value={subjects.length} icon={BookOpen} iconBg="bg-blue-100 text-blue-600" />
        <StatCard title="Given to Teachers" value={given} icon={CheckCircle2} iconBg="bg-emerald-100 text-emerald-600" />
        <StatCard title="Not Given Yet" value={subjects.length - given} icon={CircleDashed} iconBg="bg-amber-100 text-amber-600" />
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1"><SearchBox value={search} onChange={setSearch} placeholder="Search subject..." /></div>
        <SelectFilter value={className} onChange={setClassName} options={classOptions} label="Filter by class" />
      </div>

      <div className="mb-4"><InlineError message={actionError} /></div>

      <SubjectTable
        data={filtered}
        busyId={busyId}
        onEdit={setForm}
        onDelete={remove}
        emptyMessage={subjects.length === 0 ? "No subjects added yet." : "No subject found."}
        emptyAction={subjects.length === 0 ? addButton : null}
      />

      {form && (
        <SubjectFormModal
          subject={form === "new" ? null : form}
          allClasses={data.classes}
          onClose={() => setForm(null)}
          onSaved={() => {
            setForm(null);
            reload();
          }}
        />
      )}
    </>
  );
}
