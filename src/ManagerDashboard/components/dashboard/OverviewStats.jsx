import { BriefcaseBusiness, GraduationCap, Users, Wallet } from "lucide-react";
import StatCard from "../common/StatCard";
import { formatCurrency } from "../../utils/format";

export default function OverviewStats({ staff, students, fees }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Teaching Staff" value={staff.teaching.active} description={`${staff.teaching.history} staff in history`} icon={GraduationCap} iconBg="bg-blue-100 text-blue-600" />
      <StatCard title="Non-Teaching Staff" value={staff.nonTeaching.active} description={`${staff.nonTeaching.history} staff in history`} icon={BriefcaseBusiness} iconBg="bg-purple-100 text-purple-600" />
      <StatCard title="Current Students" value={students.current} description={`${students.passedOut} passed out`} icon={Users} iconBg="bg-emerald-100 text-emerald-600" />
      <StatCard title="Fee Collected" value={formatCurrency(fees.collected)} description={`${formatCurrency(fees.pending)} pending`} icon={Wallet} iconBg="bg-amber-100 text-amber-600" />
    </div>
  );
}
