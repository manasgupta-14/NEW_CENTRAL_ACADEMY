import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { SCHOOL } from "../../data/school";
import { ACCOUNTS, MANAGEMENT_ROLES } from "../../data/loginAccounts";
import Button from "../../components/common/Button";
import FormField from "../../components/forms/FormField";
import SuccessState from "../../components/forms/SuccessState";

const AUDIENCES = [
  { key: "student", label: "Student" },
  { key: "management", label: "Management" },
];

const dots = {
  backgroundImage: "radial-gradient(circle, rgba(236,142,44,0.2) 1.5px, transparent 1.5px)",
  backgroundSize: "26px 26px",
  WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 100% 0%, black, transparent)",
  maskImage: "radial-gradient(ellipse 80% 70% at 100% 0%, black, transparent)",
};

const linkBtn =
  "text-sm font-medium text-navy-900 underline-offset-4 transition-colors hover:text-saffron-600 hover:underline";

function Login() {
  const [audience, setAudience] = useState("student");
  const [mgmtRole, setMgmtRole] = useState("teacher");
  // "login" | "forgot" | "login-done" | "forgot-done"
  const [view, setView] = useState("login");
  const [who, setWho] = useState("");

  const accountKey = audience === "student" ? "student" : mgmtRole;
  const account = ACCOUNTS[accountKey];
  const isStudent = audience === "student";

  const switchAudience = (key) => {
    setAudience(key);
    setView("login");
  };
  const backToLogin = () => setView("login");

  // Reads the first value the person typed (ID, name or email) for the confirmation text.
  const submit = (next) => (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setWho(data.get("id") || data.get("fullName") || data.get("email") || "");
    setView(next);
  };

  const renderFields = (fields) =>
    fields.map((f) => <FormField key={f.name} required {...f} />);

  return (
    <section className="bg-paper-50">
      <div className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-5xl items-center px-4 py-12 sm:px-6 md:py-16">
        <div className="grid w-full animate-pop overflow-hidden rounded-3xl border border-navy-900/10 bg-paper-50 shadow-xl md:grid-cols-[0.85fr_1.15fr]">
          {/* Brand panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-navy-900 p-10 text-paper-50 md:flex">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={dots} />
            <Link to="/" className="relative flex items-center gap-3">
              <img src={logo} alt="" className="h-12 w-12 object-contain" />
              <span className="font-display text-lg font-semibold">{SCHOOL.name}</span>
            </Link>
            <div className="relative">
              <h1 className="font-display text-3xl font-semibold leading-tight">
                {isStudent ? "Student login" : "Management login"}
              </h1>
              <p className="mt-3 max-w-xs leading-relaxed text-paper-50/70">
                {isStudent
                  ? "View fee, attendance, results and study material in one place."
                  : "For teachers, the principal and school managers."}
              </p>
            </div>
            <p className="relative text-sm text-paper-50/60">Need help? Call {SCHOOL.phones[0].label}</p>
          </div>

          {/* Form panel */}
          <div className="p-6 sm:p-10">
            <Link to="/" className="mb-6 flex items-center gap-3 md:hidden">
              <img src={logo} alt="" className="h-10 w-10 object-contain" />
              <span className="font-display text-lg font-semibold text-navy-900">{SCHOOL.name}</span>
            </Link>

            {/* Student / Management switch */}
            {(view === "login" || view === "forgot") && (
              <div className="relative mb-7 grid grid-cols-2 rounded-full bg-paper-100 p-1" role="group" aria-label="Login as">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/2)] rounded-full bg-navy-900 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: `translateX(${AUDIENCES.findIndex((a) => a.key === audience) * 100}%)` }}
                />
                {AUDIENCES.map((a) => (
                  <button
                    key={a.key}
                    type="button"
                    aria-pressed={audience === a.key}
                    onClick={() => switchAudience(a.key)}
                    className={`relative z-10 rounded-full py-2 text-sm font-medium transition-colors duration-300 ${audience === a.key ? "text-paper-50" : "text-navy-900"}`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}

            {view === "login" && (
              <div key={`login-${accountKey}`} className="animate-pop">
                <h2 className="font-display text-2xl font-semibold text-navy-900 md:text-3xl">Welcome back</h2>
                <p className="mt-2 text-sm text-ink-900/60">
                  {isStudent ? "Sign in with your student ID and password." : "Choose your role and sign in."}
                </p>

                <form className="mt-6 grid gap-5" onSubmit={submit("login-done")}>
                  {!isStudent && (
                    <FormField label="Role" as="select" name="role" value={mgmtRole} onChange={(e) => setMgmtRole(e.target.value)}>
                      {MANAGEMENT_ROLES.map((r) => (
                        <option key={r} value={r}>{ACCOUNTS[r].label}</option>
                      ))}
                    </FormField>
                  )}
                  {renderFields(account.login.filter((f) => f.name !== "password"))}
                  <div>
                    {renderFields(account.login.filter((f) => f.name === "password"))}
                    <div className="mt-2 text-right">
                      <button type="button" onClick={() => setView("forgot")} className={linkBtn}>
                        Forgot password?
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Login</Button>
                </form>
              </div>
            )}

            {view === "forgot" && (
              <div key={`forgot-${accountKey}`} className="animate-pop">
                <h2 className="font-display text-2xl font-semibold text-navy-900 md:text-3xl">Reset your password</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-900/60">
                  {account.forgot.map((f) => f.label.toLowerCase()).join(" and ")
                    .replace(/^./, (c) => `Enter your ${c}`)}
                  .
                </p>

                <form className="mt-6 grid gap-5" onSubmit={submit("forgot-done")}>
                  {!isStudent && (
                    <FormField label="Role" as="select" name="role" value={mgmtRole} onChange={(e) => setMgmtRole(e.target.value)}>
                      {MANAGEMENT_ROLES.map((r) => (
                        <option key={r} value={r}>{ACCOUNTS[r].label}</option>
                      ))}
                    </FormField>
                  )}
                  {renderFields(account.forgot)}
                  <Button type="submit" className="w-full">Send reset request</Button>
                </form>
                <button type="button" onClick={backToLogin} className={`${linkBtn} mt-5 block w-full text-center`}>
                  Back to login
                </button>
              </div>
            )}

            {view === "login-done" && (
              <SuccessState
                title="Login is not open yet"
                action={<Button variant="outline" onClick={backToLogin}>Back</Button>}
              >
                Online accounts are being set up. Until then, please call the school office on {SCHOOL.phones[0].label}.
              </SuccessState>
            )}

            {view === "forgot-done" && (
              <SuccessState
                title="Request received"
                action={<Button variant="outline" onClick={backToLogin}>Back to login</Button>}
              >
                We&rsquo;ve noted the reset request for {who || "your account"}. The school office will contact you, or
                you can call {SCHOOL.phones[0].label}.
              </SuccessState>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
