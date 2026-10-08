import { useState } from "react";
import { AlertCircle, CalendarDays, Clock3, GraduationCap, IndianRupee, IdCard, Mail, Phone, RefreshCcw } from "lucide-react";
import Modal from "../common/Modal";
import Avatar from "../common/Avatar";
import StatusBadge from "../common/StatusBadge";
import ProfileItem from "../common/ProfileItem";
import ActionButton from "../common/ActionButton";
import ChangeStatusModal from "./ChangeStatusModal";
import { experienceFrom, formatCurrency, formatDate } from "../../utils/format";

export default function StaffDetailsModal({ person, onClose, onChanged }) {
  const [changing, setChanging] = useState(false);

  if (changing) {
    return (
      <ChangeStatusModal
        person={person}
        onClose={() => setChanging(false)}
        onDone={() => {
          onChanged();
          onClose();
        }}
      />
    );
  }

  return (
    <Modal title="Staff Details" subtitle="Complete personal and professional information" onClose={onClose}>
      <div className="p-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Avatar name={person.name} size="xl" />
          <div>
            <h3 className="text-xl font-bold">{person.name}</h3>
            <p className="text-sm text-slate-500">{person.position}</p>
            <div className="mt-2"><StatusBadge status={person.status} /></div>
          </div>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {person.teacherId && <ProfileItem icon={IdCard} label="Teacher ID" value={person.teacherId} />}
          <ProfileItem icon={GraduationCap} label="Qualification" value={person.qualification} />
          <ProfileItem icon={Phone} label="Phone" value={person.phone} />
          <ProfileItem icon={Mail} label="Email" value={person.email} />
          <ProfileItem icon={CalendarDays} label="Joining Date" value={formatDate(person.joiningDate)} />
          <ProfileItem icon={Clock3} label="Experience" value={experienceFrom(person.joiningDate, person.leavingDate)} />
          <ProfileItem icon={IndianRupee} label="Salary" value={formatCurrency(person.salary)} />
          {person.leavingDate && <ProfileItem icon={CalendarDays} label="Leaving Date" value={formatDate(person.leavingDate)} />}
          {person.leavingReason && <ProfileItem icon={AlertCircle} label="Leaving Reason" value={person.leavingReason} />}
        </div>

        <div className="mt-8 flex justify-end">
          <ActionButton variant="soft" icon={RefreshCcw} onClick={() => setChanging(true)}>Change Status</ActionButton>
        </div>
      </div>
    </Modal>
  );
}
