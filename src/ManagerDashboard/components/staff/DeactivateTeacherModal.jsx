import { useState } from "react";
import { UserX } from "lucide-react";
import { managerApi } from "../../api/managerApi";
import Modal from "../common/Modal";
import FormInput from "../common/FormInput";
import ActionButton from "../common/ActionButton";
import InlineError from "../common/InlineError";
import { todayISO } from "../../utils/format";

// Teacher delete nahi hota: deactivate hone par wo Active list se hat ke Staff History me chala jaata hai.
export default function DeactivateTeacherModal({ person, onClose, onDone }) {
  const [date, setDate] = useState(todayISO());
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await managerApi.setStaffStatus("teaching", person.id, { status: "inactive", leavingDate: date, reason });
      onDone();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <Modal title="Deactivate Teacher" subtitle={person.name} onClose={onClose} maxWidth="max-w-lg">
      <form onSubmit={submit} className="grid gap-5 p-6">
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-800">
          {person.name} will be removed from Teaching Staff and moved to Staff History. Their class teacher and subject assignments will become
          available again, and they will not be able to log in. Nothing is deleted - you can reactivate them later.
        </p>
        <FormInput label="Deactivation Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <FormInput label="Reason (optional)" optional maxLength={300} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. On long leave" />
        <InlineError message={error} />
        <div className="flex gap-3">
          <ActionButton variant="outline" className="flex-1 py-3" onClick={onClose} disabled={busy}>Cancel</ActionButton>
          <ActionButton type="submit" variant="danger" icon={UserX} className="flex-1 py-3" disabled={busy}>{busy ? "Saving..." : "Deactivate"}</ActionButton>
        </div>
      </form>
    </Modal>
  );
}
