import { useState } from "react";
import { KeyRound } from "lucide-react";
import { changePassword } from "../../api/createDashboardApi";
import FormInput from "./FormInput";
import ActionButton from "./ActionButton";
import InlineError from "./InlineError";

// Principal aur Teacher apna login password yahin se badalte hain (POST /api/auth/change-password).
export default function ChangePasswordCard() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirm: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const set = (name) => (e) => setForm((f) => ({ ...f, [name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setDone(false);
    if (form.newPassword !== form.confirm) return setError("New password and confirm password do not match");
    setBusy(true);
    try {
      await changePassword(form.oldPassword, form.newPassword);
      setForm({ oldPassword: "", newPassword: "", confirm: "" });
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Change Password</h2>
      <p className="mt-1 text-sm text-slate-500">Use at least 8 characters. You will keep using the new password the next time you log in.</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <FormInput label="Current Password" type="password" value={form.oldPassword} onChange={set("oldPassword")} autoComplete="current-password" />
        <FormInput label="New Password" type="password" minLength={8} value={form.newPassword} onChange={set("newPassword")} autoComplete="new-password" />
        <FormInput label="Confirm New Password" type="password" minLength={8} value={form.confirm} onChange={set("confirm")} autoComplete="new-password" />
      </div>
      <div className="mt-4"><InlineError message={error} /></div>
      {done && <p role="status" className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">Your password has been changed.</p>}
      <ActionButton type="submit" icon={KeyRound} className="mt-5" disabled={busy}>{busy ? "Saving..." : "Change Password"}</ActionButton>
    </form>
  );
}
