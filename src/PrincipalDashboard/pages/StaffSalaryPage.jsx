import { useState } from "react";
import { Briefcase, GraduationCap, Wallet } from "lucide-react";
import { useManagerData } from "../../ManagerDashboard/hooks/useManagerData";
import { useManagerSession } from "../../ManagerDashboard/hooks/useManagerSession";
import { formatCurrency, formatDate, experienceFrom, matchesQuery } from "../../ManagerDashboard/utils/format";
import PageHeader from "../../ManagerDashboard/components/common/PageHeader";
import DataState from "../../ManagerDashboard/components/common/DataState";
import StatCard from "../../ManagerDashboard/components/common/StatCard";
import InfoNotice from "../../ManagerDashboard/components/common/InfoNotice";
import SearchBox from "../../ManagerDashboard/components/common/SearchBox";
import Avatar from "../../ManagerDashboard/components/common/Avatar";
import StatusBadge from "../../ManagerDashboard/components/common/StatusBadge";
import EmptyState from "../../ManagerDashboard/components/common/EmptyState";

const TABS = [{ key: "teaching", label: "Teaching Staff", position: "Subject" }, { key: "non-teaching", label: "Non-Teaching Staff", position: "Role" }];
const TH = "px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500";

// Staff aur unki salary sirf dekhne ke liye (add / edit / deactivate Manager karta hai).
export default function StaffSalaryPage() {
  const { api } = useManagerSession();
  const [type, setType] = useState("teaching");
  const [search, setSearch] = useState("");
  const { data, loading, error, reload } = useManagerData(api.staff, type);
  const tab = TABS.find((t) => t.key === type);

  const tabs = (
    <div className="mb-6 flex gap-2 overflow-x-auto" role="tablist">
      {TABS.map((t) => (
        <button key={t.key} role="tab" aria-selected={type === t.key} onClick={() => { setType(t.key); setSearch(""); }}
          className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold transition ${type === t.key ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white text-slate-600 hover:bg-slate-100"}`}>{t.label}</button>
      ))}
    </div>
  );
  const header = <PageHeader title="Staff & Salary" subtitle="Teaching and non-teaching staff with their salary details." />;

  if (!data || data.items.some((s) => s.type !== type)) return <>{header}{tabs}<DataState loading={loading || !error} error={error} onRetry={reload} /></>;

  const active = data.items.filter((s) => s.status === "active");
  const payroll = active.reduce((a, s) => a + Number(s.salary || 0), 0);
  const shown = data.items.filter((s) => matchesQuery(search, s.name, s.position, s.email, s.phone));

  return (
    <>
      {header}
      <InfoNotice tone="amber" className="mb-6">Salary information is view-only for the Principal. Staff records are managed by the Manager.</InfoNotice>
      {tabs}
      <div className="mb-6 grid gap-5 sm:grid-cols-3">
        <StatCard title="Active Staff" value={active.length} icon={type === "teaching" ? GraduationCap : Briefcase} iconBg="bg-blue-100 text-blue-600" />
        <StatCard title="Total Records" value={data.items.length} icon={Briefcase} iconBg="bg-purple-100 text-purple-600" />
        <StatCard title="Monthly Payroll (active)" value={formatCurrency(payroll)} icon={Wallet} iconBg="bg-emerald-100 text-emerald-600" />
      </div>
      <div className="mb-5"><SearchBox value={search} onChange={setSearch} placeholder="Search by name or role..." /></div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr><th className={TH}>Staff</th><th className={TH}>{tab.position}</th><th className={TH}>Qualification</th><th className={TH}>Joined</th><th className={TH}>Experience</th><th className={TH}>Salary</th><th className={TH}>Status</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shown.map((p) => (
                <tr key={p.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4"><div className="flex items-center gap-3"><Avatar name={p.name} /><div><p className="font-semibold text-slate-900">{p.name}</p><p className="text-xs text-slate-500">{p.email || p.phone}</p></div></div></td>
                  <td className="px-5 py-4 text-sm text-slate-600">{p.position || "—"}{p.classTeacherOf && <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">CT {p.classTeacherOf}</span>}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{p.qualification || "—"}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{formatDate(p.joiningDate)}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{experienceFrom(p.joiningDate, p.leavingDate)}</td>
                  <td className="px-5 py-4 font-semibold text-slate-800">{formatCurrency(p.salary)}</td>
                  <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {shown.length === 0 && <EmptyState message={data.items.length ? "No staff found." : "No staff added yet."} />}
        </div>
      </div>
    </>
  );
}
