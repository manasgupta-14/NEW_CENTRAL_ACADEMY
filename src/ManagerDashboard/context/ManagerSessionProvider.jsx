import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api as request, getToken, setToken } from "../../utils/api";
import { ManagerSessionContext } from "./ManagerSessionContext";
import { ROLE_HOME } from "../config/roles";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";

// Route guard. `roles` me jo role allowed hai wahi andar aa sakta hai (Manager: ["manager"], Principal: ["principal"], Teacher: ["teacher"]).
// Token ya role galat ho to /login par bhej deta hai.
// `api` us dashboard ka apna backend client hai (managerApi / principalApi / teacherApi); shared components use context se lete hain.
export default function ManagerSessionProvider({ children, roles = ["manager"], api }) {
  const navigate = useNavigate();
  const [session, setSession] = useState(() => ({ status: getToken() ? "checking" : "denied", user: null, role: "", error: "" }));
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!getToken()) return;
    let cancelled = false;
    request("/auth/me", { auth: true })
      .then((res) => {
        if (cancelled) return;
        if (roles.includes(res.role)) setSession({ status: "ok", user: res.user, role: res.role, error: "" });
        else if (ROLE_HOME[res.role]) setSession({ status: "redirect", user: null, role: res.role, error: "" });
        else setSession({ status: "denied", user: null, role: "", error: "" });
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.status === 401) setToken(null);
        setSession({ status: err.status === 401 ? "denied" : "error", user: null, role: "", error: err.message });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- roles ek fixed list hai jo dashboard ke saath badalti nahi
  }, [attempt]);

  const logout = useCallback(() => {
    setToken(null);
    navigate("/login", { replace: true });
  }, [navigate]);

  // Profile badalne ke baad sidebar / topbar me naya naam turant dikhe
  const updateUser = useCallback((patch) => setSession((s) => ({ ...s, user: { ...s.user, ...patch } })), []);

  // role: "manager" | "principal" | "teacher". Manager / teacher ka naam `name` me, principal ka `fullName` me hota hai.
  const value = useMemo(
    () => ({ user: session.user, role: session.role, api, displayName: session.user?.name || session.user?.fullName || "", logout, updateUser }),
    [session.user, session.role, api, logout, updateUser]
  );

  if (session.status === "denied") return <Navigate to="/login" replace />;
  if (session.status === "redirect") return <Navigate to={ROLE_HOME[session.role]} replace />;
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
