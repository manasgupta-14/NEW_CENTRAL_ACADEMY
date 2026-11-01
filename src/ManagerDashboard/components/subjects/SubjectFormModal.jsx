import { useState } from "react";
import { Check, Save } from "lucide-react";
import { managerApi } from "../../api/managerApi";
import Modal from "../common/Modal";
import FormInput from "../common/FormInput";
import ActionButton from "../common/ActionButton";
import InlineError from "../common/InlineError";

// Subject add aur edit dono isi se. `subject` ho to edit, warna naya subject. `allClasses` = backend se aayi class list.
export default function SubjectFormModal({ subject, allClasses, onClose, onSaved }) {
  const editing = !!subject;
  const [name, setName] = useState(subject?.name || "");
  const [classes, setClasses] = useState(subject?.classes || []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const toggle = (c) => setClasses((list) => (list.includes(c) ? list.filter((x) => x !== c) : [...list, c]));

  const submit = async (e) => {
    e.preventDefault();
    if (classes.length === 0) {
      setError("Select at least one class for this subject");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const body = { name, classes };
      if (editing) await managerApi.editSubject(subject.id, body);
      else await managerApi.addSubject(body);
      onSaved();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <Modal
      title={editing ? "Edit Subject" : "Add Subject"}
      subtitle={editing ? "Change the name or the classes of this subject." : "The subject will be available to give to teachers in the selected classes."}
      onClose={onClose}
      maxWidth="max-w-xl"
    >
      <form onSubmit={submit} className="grid gap-5 p-6">
        <FormInput label="Subject Name" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} placeholder="e.g. Moral Science" autoFocus />

        <fieldset>
          <div className="mb-2 flex items-center justify-between">
            <legend className="text-sm font-semibold text-slate-700">Taught in Classes</legend>
            <div className="flex gap-3 text-xs font-semibold">
              <button type="button" onClick={() => setClasses([...allClasses])} className="text-blue-600 hover:underline">Select all</button>
              <button type="button" onClick={() => setClasses([])} className="text-slate-500 hover:underline">Clear</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {allClasses.map((c) => {
              const on = classes.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  onClick={() => toggle(c)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-medium transition ${
                    on ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${on ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"}`}>
                    {on && <Check size={12} strokeWidth={3} />}
                  </span>
                  {c}
                </button>
              );
            })}
          </div>
        </fieldset>

        <InlineError message={error} />
        <div className="flex gap-3">
          <ActionButton variant="outline" className="flex-1 py-3" onClick={onClose} disabled={busy}>Cancel</ActionButton>
          <ActionButton type="submit" icon={Save} className="flex-1 py-3" disabled={busy}>{busy ? "Saving..." : editing ? "Save Changes" : "Add Subject"}</ActionButton>
        </div>
      </form>
    </Modal>
  );
}
