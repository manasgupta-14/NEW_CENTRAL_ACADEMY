import { useState } from "react";
import Modal from "./Modal";
import FormInput from "./FormInput";
import ActionButton from "./ActionButton";
import InlineError from "./InlineError";

// Add Staff, Add Principal aur Edit Profile isi se bante hain. fields -> config/forms.js
// initialValues: edit form me pehle se bhare hue values { fieldName: value }
export default function EntityFormModal({ title, subtitle, fields, initialValues, submitLabel, submitIcon, onSubmit, onClose }) {
  const [values, setValues] = useState(() => Object.fromEntries(fields.map((f) => [f.name, initialValues?.[f.name] ?? ""])));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await onSubmit(values);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <Modal title={title} subtitle={subtitle} onClose={onClose}>
      <form onSubmit={submit} className="grid gap-5 p-6 sm:grid-cols-2">
        {fields.map(({ name, options, ...f }) => (
          <FormInput
            key={name}
            name={name}
            as={options ? "select" : undefined}
            value={values[name]}
            onChange={(e) => setValues((v) => ({ ...v, [name]: e.target.value }))}
            {...f}
          >
            {options && (
              <>
                <option value="">Select...</option>
                {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </>
            )}
          </FormInput>
        ))}
        <div className="sm:col-span-2">
          <InlineError message={error} />
        </div>
        <div className="flex gap-3 sm:col-span-2">
          <ActionButton variant="outline" className="flex-1 py-3" onClick={onClose} disabled={busy}>Cancel</ActionButton>
          <ActionButton type="submit" icon={submitIcon} className="flex-1 py-3" disabled={busy}>
            {busy ? "Saving..." : submitLabel}
          </ActionButton>
        </div>
      </form>
    </Modal>
  );
}
