import { useState } from "react";
import { managerApi } from "../../api/managerApi";
import Modal from "../common/Modal";
import FormInput from "../common/FormInput";
import ActionButton from "../common/ActionButton";
import InlineError from "../common/InlineError";
import { STATUS_LABELS, todayISO } from "../../utils/format";

export default function ChangeStatusModal({ person, onClose, onDone }) {
  const [status, setStatus] = useState(person.status);
  const [leavingDate, setLeavingDate] = useState(() => (person.leavingDate ? person.leavingDate.slice(0, 10) : todayISO()));
  const [reason, setReason] = useState(person.leavingReason || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const leaving = status !== "active";

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await managerApi.setStaffStatus(person.type, person.id, { status, leavingDate, reason });
      onDone();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <Modal title="Change Status" subtitle={person.name} onClose={onClose} maxWidth="max-w-lg">
      <form onSubmit={submit} className="grid gap-5 p-6">
        <FormInput label="Status" as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
          {["active", "resigned", "terminated"].map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </FormInput>

        {leaving && (
          <>
            <FormInput label="Leaving Date" type="date" value={leavingDate} onChange={(e) => setLeavingDate(e.target.value)} />
            <FormInput label="Reason (optional)" optional maxLength={300} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Personal reasons" />
          </>
        )}

        <InlineError message={error} />
        <div className="flex gap-3">
          <ActionButton variant="outline" className="flex-1 py-3" onClick={onClose} disabled={busy}>Cancel</ActionButton>
          <ActionButton type="submit" className="flex-1 py-3" disabled={busy}>{busy ? "Saving..." : "Save"}</ActionButton>
        </div>
      </form>
    </Modal>
  );
}
