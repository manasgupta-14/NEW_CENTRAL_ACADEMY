// Principal aur Teacher dashboard ke backend calls ki common buniyaad. prefix = "/principal" ya "/teacher".
// Token utils/api.js khud lagata hai. Attendance ke teen function har dashboard me same naam se milte hain,
// isliye shared attendance components (DailyAttendance, MonthlyAttendance) kisi bhi dashboard me chal jaate hain.
import { api } from "../../utils/api";

export function createDashboardApi(prefix) {
  const get = (path) => api(`${prefix}${path}`, { auth: true });
  const send = (method, path, body) => api(`${prefix}${path}`, { method, body, auth: true });
  const qs = (params) => {
    const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ""));
    return q.toString() ? `?${q}` : "";
  };

  return {
    get,
    send,
    qs,
    attendance: (group, date) => get(`/attendance/${group}${qs({ date })}`),
    markAttendance: (group, body) => send("POST", `/attendance/${group}`, body),
    // poore mahine ki din-ba-din attendance. month = "YYYY-MM", className sirf students ke liye
    attendanceMonth: (group, month, className) => get(`/attendance/${group}/month${qs({ month, className })}`),
  };
}

// Password badalna teeno roles ke liye ek hi route hai: POST /api/auth/change-password
export const changePassword = (oldPassword, newPassword) =>
  api("/auth/change-password", { method: "POST", body: { oldPassword, newPassword }, auth: true });
