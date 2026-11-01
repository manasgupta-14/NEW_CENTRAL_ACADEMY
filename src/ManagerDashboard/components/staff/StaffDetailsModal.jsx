import { useState } from "react";
import { AlertCircle, BookOpen, CalendarDays, Clock3, GraduationCap, Pencil, School, IndianRupee, IdCard, Mail, Phone, RefreshCcw, UserCheck, UserX } from "lucide-react";
import Modal from "../common/Modal";
import Avatar from "../common/Avatar";
import StatusBadge from "../common/StatusBadge";
import ProfileItem from "../common/ProfileItem";
import ActionButton from "../common/ActionButton";
import ChangeStatusModal from "./ChangeStatusModal";
import TeacherFormModal from "./TeacherFormModal";
import DeactivateTeacherModal from "./DeactivateTeacherModal";
import InlineError from "../common/InlineError";
import { managerApi } from "../../api/managerApi";
import { experienceFrom, formatCurrency, formatDate } from "../../utils/format";

export default function StaffDetailsModal({ person, onClose, onChanged }) {
  const [mode, setMode] = useState(null); // null | "status" | "edit" | "deactivate"
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const done = () => {
    onChanged();
    onClose();
  };
  const teaching = person.type === "teaching";
  const active = person.status === "active";

  // Deactivate hue teacher ko wapas active karna (leaving details hat jaati hain)
  const reactivate = async () => {
    setBusy(true);
    setError("");
    try {
      await managerApi.setStaffStatus("teaching", person.id, { status: "active" });
      done();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  if (mode === "status") return <ChangeStatusModal person={person} onClose={() => setMode(null)} onDone={done} />;
  if (mode === "edit") return <TeacherFormModal teacher={person} onClose={() => setMode(null)} onSaved={done} />;
  if (mode === "deactivate") return <DeactivateTeacherModal person={person} onClose={() => setMode(null)} onDone={done} />;

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
          {person.type === "teaching" && <ProfileItem icon={School} label="Class Teacher Of" value={person.classTeacherOf || "Not a class teacher"} />}
          {person.type === "teaching" && <ProfileItem icon={BookOpen} label="Teaching In" value={person.classes?.length ? person.classes.join(", ") : "No class assigned"} />}
          <ProfileItem icon={GraduationCap} label="Qualification" value={person.qualification} />
          <ProfileItem icon={Phone} label="Phone" value={person.phone} />
          <ProfileItem icon={Mail} label="Email" value={person.email} />
          <ProfileItem icon={CalendarDays} label="Joining Date" value={formatDate(person.joiningDate)} />
          <ProfileItem icon={Clock3} label="Experience" value={experienceFrom(person.joiningDate, person.leavingDate)} />
          <ProfileItem icon={IndianRupee} label="Salary" value={formatCurrency(person.salary)} />
          {person.leavingDate && <ProfileItem icon={CalendarDays} label={person.status === "inactive" ? "Deactivated On" : "Leaving Date"} value={formatDate(person.leavingDate)} />}
          {person.leavingReason && <ProfileItem icon={AlertCircle} label={person.status === "inactive" ? "Deactivation Reason" : "Leaving Reason"} value={person.leavingReason} />}
        </div>

        <div className="mt-6"><InlineError message={error} /></div>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          {teaching ? (
            active ? (
              <>
                <ActionButton variant="soft" icon={Pencil} onClick={() => setMode("edit")}>Edit</ActionButton>
                <ActionButton variant="danger" icon={UserX} onClick={() => setMode("deactivate")}>Deactivate</ActionButton>
              </>
            ) : (
              <>
                <ActionButton variant="soft" icon={Pencil} onClick={() => setMode("edit")}>Edit</ActionButton>
                <ActionButton icon={UserCheck} disabled={busy} onClick={reactivate}>{busy ? "Saving..." : "Reactivate"}</ActionButton>
              </>
            )
          ) : (
            <ActionButton variant="soft" icon={RefreshCcw} onClick={() => setMode("status")}>Change Status</ActionButton>
          )}
        </div>
      </div>
    </Modal>
  );
}
