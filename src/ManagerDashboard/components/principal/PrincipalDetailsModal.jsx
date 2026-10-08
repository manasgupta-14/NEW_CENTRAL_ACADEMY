import { CalendarDays, Clock3, GraduationCap, IndianRupee, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import Modal from "../common/Modal";
import ProfileItem from "../common/ProfileItem";
import { experienceFrom, formatCurrency, formatDate, STATUS_LABELS } from "../../utils/format";

export default function PrincipalDetailsModal({ principal, onClose }) {
  return (
    <Modal title="Principal Details" onClose={onClose} maxWidth="max-w-xl">
      <div className="grid gap-5 p-6 sm:grid-cols-2">
        <ProfileItem icon={UserRound} label="Full Name" value={principal.name} />
        <ProfileItem icon={GraduationCap} label="Qualification" value={principal.qualification} />
        <ProfileItem icon={Phone} label="Phone" value={principal.phone} />
        <ProfileItem icon={Mail} label="Email" value={principal.email} />
        <ProfileItem icon={CalendarDays} label="Joining Date" value={formatDate(principal.joiningDate)} />
        <ProfileItem icon={Clock3} label="Experience" value={experienceFrom(principal.joiningDate)} />
        <ProfileItem icon={IndianRupee} label="Salary" value={formatCurrency(principal.salary)} />
        <ProfileItem icon={ShieldCheck} label="Status" value={STATUS_LABELS[principal.status]} />
      </div>
    </Modal>
  );
}
