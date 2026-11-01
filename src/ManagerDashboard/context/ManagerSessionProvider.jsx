import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api, getToken, setToken } from "../../utils/api";
import { ManagerSessionContext } from "./ManagerSessionContext";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";

// Route guard: sirf logged-in "manager" ya "principal" andar aa sakta hai (principal ko sirf Subjects + Teacher Assignments dikhte hain).
// Token ya role galat ho to /login par bhej deta hai.
export default function ManagerSessionProvider({ children }) {
  const navigate = useNavigate();
  const [session, setSession] = useState(() => ({ status: getToken() ? "checking" : "denied", user: null, role: "", error: "" }));
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!getToken()) return;
    let cancelled = false;
    api("/auth/me", { auth: true })
      .then((res) => {
        if (cancelled) return;
        setSession(["manager", "principal"].includes(res.role) ? { status: "ok", user: res.user, role: res.role, error: "" } : { status: "denied", user: null, role: "", error: "" });
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.status === 401) setToken(null);
        setSession({ status: err.status === 401 ? "denied" : "error", user: null, role: "", error: err.message });
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const logout = useCallback(() => {
    setToken(null);
    navigate("/login", { replace: true });
  }, [navigate]);

  // Profile badalne ke baad sidebar / topbar me naya naam turant dikhe
  const updateUser = useCallback((patch) => setSession((s) => ({ ...s, user: { ...s.user, ...patch } })), []);

  // role: "manager" | "principal". Manager ka naam `name` me, principal ka `fullName` me hota hai.
  const value = useMemo(
    () => ({ user: session.user, role: session.role, displayName: session.user?.name || session.user?.fullName || "", logout, updateUser }),
    [session.user, session.role, logout, updateUser]
  );

  if (session.status === "denied") return <Navigate to="/login" replace />;
  if (session.status === "error") {
    return (
      <ErrorState
        fullScreen
        message={session.error}
        onRetry={() => {
          setSession((s) => ({ ...s, status: "checking" }));
          setAttempt((a) => a + 1);
        }}
      />
    );
  }
  if (session.status !== "ok") return <LoadingState fullScreen label="Checking your session..." />;
  return <ManagerSessionContext.Provider value={value}>{children}</ManagerSessionContext.Provider>;
}
