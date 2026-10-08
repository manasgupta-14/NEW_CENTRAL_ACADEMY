import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../utils/api";
import Button from "../../components/common/Button";
import FormField from "../../components/forms/FormField";
import SuccessState from "../../components/forms/SuccessState";

// Manager ko email me jo link aata hai (/reset-password?token=...) wo yahin khulta hai.
// Flow: link check -> naya password + confirm password -> success -> Login page par bhej do.
function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const navigate = useNavigate();
  // checking | ready | invalid | done
  const [status, setStatus] = useState(token ? "checking" : "invalid");
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    api("/auth/reset-password/verify", { method: "POST", body: { token } })
      .then(() => !cancelled && setStatus("ready"))
      .catch(() => !cancelled && setStatus("invalid"));
    return () => {
      cancelled = true;
    };
  }, [token]);

  // Password badalne ke baad thodi der confirmation dikhake Login page khol do
  useEffect(() => {
    if (status !== "done") return;
    const t = setTimeout(() => navigate("/login", { replace: true, state: { passwordReset: true } }), 2500);
    return () => clearTimeout(t);
  }, [status, navigate]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await api("/auth/reset-password", { method: "POST", body: { token, ...form } });
      setStatus("done");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="bg-paper-50">
      <div className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-md items-center px-4 py-12 sm:px-6">
        <div className="w-full animate-pop rounded-3xl border border-navy-900/10 bg-paper-50 p-6 shadow-xl sm:p-10">
          {status === "checking" && <p className="py-10 text-center text-ink-900/60" aria-live="polite">Checking your reset link...</p>}

          {status === "invalid" && (
            <SuccessState
              title="Link expired"
              action={<Link to="/login" className="inline-block rounded-full bg-navy-900 px-6 py-2.5 text-sm font-medium text-paper-50">Back to login</Link>}
            >
              This reset link is invalid or has expired. Go to Login, choose Management, and tap &ldquo;Forgot password?&rdquo; to get a new link.
            </SuccessState>
          )}

          {status === "ready" && (
            <>
              <h1 className="font-display text-2xl font-semibold text-navy-900 md:text-3xl">Set a new password</h1>
              <p className="mt-2 text-sm text-ink-900/60">Choose a password with at least 8 characters.</p>
              <form className="mt-6 grid gap-5" onSubmit={submit}>
                <FormField label="New password" type="password" name="password" required minLength={8} autoComplete="new-password" value={form.password} onChange={onChange} />
                <FormField label="Confirm new password" type="password" name="confirmPassword" required minLength={8} autoComplete="new-password" value={form.confirmPassword} onChange={onChange} />
                {error && <p role="alert" className="text-sm text-maroon-700">{error}</p>}
                <Button type="submit" disabled={busy} className="w-full disabled:opacity-60">{busy ? "Please wait..." : "Reset password"}</Button>
              </form>
            </>
          )}

          {status === "done" && (
            <SuccessState title="Password changed">
              Your password has been reset. Taking you to the login page...
            </SuccessState>
          )}
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
