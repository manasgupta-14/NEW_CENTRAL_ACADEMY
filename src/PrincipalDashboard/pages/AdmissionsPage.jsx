import { useState } from "react";
import { CheckCircle2, Clock3, FilePlus2, UserPlus, XCircle } from "lucide-react";
import { useManagerData } from "../../ManagerDashboard/hooks/useManagerData";
import { useManagerSession } from "../../ManagerDashboard/hooks/useManagerSession";
import { STUDENT_FORM, CLASS_LIST } from "../../ManagerDashboard/config/forms";
import { formatDate, matchesQuery } from "../../ManagerDashboard/utils/format";
import PageHeader from "../../ManagerDashboard/components/common/PageHeader";
import DataState from "../../ManagerDashboard/components/common/DataState";
import StatCard from "../../ManagerDashboard/components/common/StatCard";
import ActionButton from "../../ManagerDashboard/components/common/ActionButton";
import SearchBox from "../../ManagerDashboard/components/common/SearchBox";
import EmptyState from "../../ManagerDashboard/components/common/EmptyState";
import InlineError from "../../ManagerDashboard/components/common/InlineError";
import EntityFormModal from "../../ManagerDashboard/components/common/EntityFormModal";

const STATUS_STYLE = { new: "bg-blue-50 text-blue-700 border-blue-200", contacted: "bg-amber-50 text-amber-700 border-amber-200", admitted: "bg-emerald-50 text-emerald-700 border-emerald-200", rejected: "bg-red-50 text-red-700 border-red-200" };
const FILTERS = [{ key: "", label: "All" }, { key: "new", label: "New" }, { key: "contacted", label: "Contacted" }, { key: "admitted", label: "Admitted" }, { key: "rejected", label: "Rejected" }];
const TH = "px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500";

// Website se aayi admission applications + naya student seedha admit karna.
export default function AdmissionsPage() {
  const { api } = useManagerSession();
  const { data, loading, error, reload } = useManagerData(api.admissions, "");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [admitting, setAdmitting] = useState(null); // null = band, {} = khaali form, {application} = bhara hua form
  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState("");
  const [notice, setNotice] = useState("");

  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  const items = data.items;
  const count = (s) => items.filter((a) => a.status === s).length;
  const shown = items.filter((a) => (!filter || a.status === filter) && matchesQuery(search, a.studentName, a.parentName, a.phone, a.className));

  const setStatus = async (a, status) => {
    setBusyId(a._id);
    setActionError("");
    try {
      await api.setAdmissionStatus(a._id, status);
      reload();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const initial = admitting?.application
    ? { name: admitting.application.studentName, className: CLASS_LIST.includes(admitting.application.className) ? admitting.application.className : "", fatherName: admitting.application.parentName, phone: admitting.application.phone, email: admitting.application.email || "" }
    : undefined;

  return (
    <>
      <PageHeader title="Admissions" subtitle="Admission requests from the website, and new student admission."
        action={<ActionButton icon={UserPlus} onClick={() => setAdmitting({})}>New Admission</ActionButton>} />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Requests" value={items.length} icon={FilePlus2} iconBg="bg-blue-100 text-blue-600" />
        <StatCard title="New" value={count("new")} description="Not contacted yet" icon={Clock3} iconBg="bg-amber-100 text-amber-600" />
        <StatCard title="Admitted" value={count("admitted")} icon={CheckCircle2} iconBg="bg-emerald-100 text-emerald-600" />
        <StatCard title="Rejected" value={count("rejected")} icon={XCircle} iconBg="bg-red-100 text-red-600" />
      </div>

      {notice && <p role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{notice}</p>}
      <div className="mt-6"><InlineError message={actionError} /></div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex gap-2 overflow-x-auto" role="tablist">
          {FILTERS.map((f) => (
            <button key={f.key} role="tab" aria-selected={filter === f.key} onClick={() => setFilter(f.key)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${filter === f.key ? "bg-blue-600 text-white" : "bg-white text-slate-600 hover:bg-slate-100"}`}>{f.label}</button>
          ))}
        </div>
        <div className="min-w-[220px] flex-1"><SearchBox value={search} onChange={setSearch} placeholder="Search by student, parent or phone..." /></div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px]">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr><th className={TH}>Student</th><th className={TH}>Class</th><th className={TH}>Parent</th><th className={TH}>Applied On</th><th className={TH}>Status</th><th className={`${TH} text-right`}>Action</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shown.map((a) => (
                <tr key={a._id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4"><p className="font-semibold text-slate-900">{a.studentName}</p>{a.message && <p className="max-w-xs truncate text-xs text-slate-500" title={a.message}>{a.message}</p>}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{a.className}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{a.parentName}<p className="text-xs text-slate-500">{a.phone}</p></td>
                  <td className="px-5 py-4 text-sm text-slate-600">{formatDate(a.createdAt)}</td>
                  <td className="px-5 py-4"><span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLE[a.status] || ""}`}>{a.status}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap justify-end gap-2">
                      {a.status !== "admitted" && <ActionButton icon={UserPlus} className="px-3 py-2 text-xs" onClick={() => setAdmitting({ application: a })}>Admit</ActionButton>}
                      {a.status === "new" && <ActionButton variant="soft" className="px-3 py-2 text-xs" disabled={busyId === a._id} onClick={() => setStatus(a, "contacted")}>Mark Contacted</ActionButton>}
                      {(a.status === "new" || a.status === "contacted") && <ActionButton variant="danger" className="px-3 py-2 text-xs" disabled={busyId === a._id} onClick={() => setStatus(a, "rejected")}>Reject</ActionButton>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {shown.length === 0 && <EmptyState message={items.length ? "No requests found." : "No admission requests yet."} />}
        </div>
      </div>

      {admitting && (
        <EntityFormModal
          title="Admit New Student"
          subtitle="Fill the admission details. The student will log in with the Student ID and this password."
          fields={STUDENT_FORM}
          initialValues={initial}
          submitLabel="Admit Student"
          submitIcon={UserPlus}
          onClose={() => setAdmitting(null)}
          onSubmit={async (values) => {
            const row = await api.admitStudent({ ...values, admissionId: admitting.application?._id });
            setAdmitting(null);
            setNotice(`${row.name} has been admitted to ${row.className}.`);
            reload();
          }}
        />
      )}
    </>
  );
}
