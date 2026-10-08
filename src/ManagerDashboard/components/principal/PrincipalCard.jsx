import { CalendarDays, Clock3, Eye, GraduationCap, IndianRupee, Mail, Phone, Trash2 } from "lucide-react";
import Avatar from "../common/Avatar";
import StatusBadge from "../common/StatusBadge";
import ProfileItem from "../common/ProfileItem";
import ActionButton from "../common/ActionButton";
import { experienceFrom, formatCurrency, formatDate } from "../../utils/format";

export default function PrincipalCard({ principal, onView, onDelete, deleting }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={principal.name} size="lg" />
          <div>
            <h2 className="text-lg font-bold text-slate-900">{principal.name}</h2>
            <p className="text-sm text-slate-500">School Principal</p>
          </div>
        </div>
        <StatusBadge status={principal.status} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ProfileItem icon={GraduationCap} label="Qualification" value={principal.qualification} />
        <ProfileItem icon={Phone} label="Phone" value={principal.phone} />
        <ProfileItem icon={Mail} label="Email" value={principal.email} />
        <ProfileItem icon={CalendarDays} label="Joining Date" value={formatDate(principal.joiningDate)} />
        <ProfileItem icon={Clock3} label="Experience" value={experienceFrom(principal.joiningDate)} />
        <ProfileItem icon={IndianRupee} label="Salary" value={formatCurrency(principal.salary)} />
      </div>

      <div className="mt-6 flex gap-3">
        <ActionButton variant="soft" icon={Eye} className="flex-1" onClick={() => onView(principal)}>View Details</ActionButton>
        <ActionButton variant="danger" icon={Trash2} onClick={() => onDelete(principal)} disabled={deleting}>
          {deleting ? "Deleting..." : "Delete"}
        </ActionButton>
      </div>
    </div>
  );
}
