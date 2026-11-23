import { Briefcase, CalendarDays, Clock, GraduationCap, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import { useManagerData } from "../../ManagerDashboard/hooks/useManagerData";
import { useManagerSession } from "../../ManagerDashboard/hooks/useManagerSession";
import { experienceFrom, formatCurrency, formatDate } from "../../ManagerDashboard/utils/format";
import PageHeader from "../../ManagerDashboard/components/common/PageHeader";
import DataState from "../../ManagerDashboard/components/common/DataState";
import Avatar from "../../ManagerDashboard/components/common/Avatar";
import ProfileItem from "../../ManagerDashboard/components/common/ProfileItem";
import ChangePasswordCard from "../../ManagerDashboard/components/common/ChangePasswordCard";

export default function ProfilePage() {
  const { api } = useManagerSession();
  const { data, loading, error, reload } = useManagerData(api.profile);
  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  return (
    <>
      <PageHeader title="My Profile" subtitle="Your personal and professional details. To change them, please contact the Manager." />
      <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar name={data.name} size="lg" />
          <div className="min-w-0"><h2 className="truncate text-xl font-bold text-slate-900">{data.name}</h2><p className="text-sm text-slate-500">Principal</p></div>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <ProfileItem icon={UserRound} label="Full Name" value={data.name} />
          <ProfileItem icon={ShieldCheck} label="Designation" value="Principal" />
          <ProfileItem icon={Mail} label="Email" value={data.email} />
          <ProfileItem icon={Phone} label="Phone" value={data.phone} />
          <ProfileItem icon={GraduationCap} label="Qualification" value={data.qualification} />
          <ProfileItem icon={CalendarDays} label="Joining Date" value={formatDate(data.joiningDate)} />
          <ProfileItem icon={Clock} label="Experience" value={experienceFrom(data.joiningDate)} />
          <ProfileItem icon={Briefcase} label="Monthly Salary" value={formatCurrency(data.salary)} />
        </div>
      </div>
      <div className="mt-6"><ChangePasswordCard /></div>
    </>
  );
}
