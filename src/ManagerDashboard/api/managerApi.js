// Manager dashboard ke saare backend calls yahin hain (/api/manager/...). Token utils/api.js khud lagata hai.
import { api } from "../../utils/api";

const get = (path) => api(`/manager${path}`, { auth: true });
const send = (method, path, body) => api(`/manager${path}`, { method, body, auth: true });

export const managerApi = {
  overview: () => get("/overview"),

  staff: (type) => get(`/staff/${type}`),
  addStaff: (type, body) => send("POST", `/staff/${type}`, body),
  setStaffStatus: (type, id, body) => send("PATCH", `/staff/${type}/${id}/status`, body),
  staffHistory: () => get("/staff-history"),

  principals: () => get("/principals"),
  addPrincipal: (body) => send("POST", "/principals", body),
  deletePrincipal: (id) => send("DELETE", `/principals/${id}`),

  students: (status) => get(`/students?status=${status}`),
  addStudent: (body) => send("POST", "/students", body),
  recordPayment: (id, amount) => send("POST", `/students/${id}/payment`, { amount }),
  setStudentStatus: (id, status) => send("PATCH", `/students/${id}/status`, { status }),

  fees: () => get("/fees"),

  attendance: (group, date) => get(`/attendance/${group}?date=${date}`),
  markAttendance: (group, body) => send("POST", `/attendance/${group}`, body),
  // poore mahine ki din-ba-din attendance. month = "YYYY-MM", className sirf students ke liye
  attendanceMonth: (group, month, className) =>
    get(`/attendance/${group}/month?month=${month}${className ? `&className=${encodeURIComponent(className)}` : ""}`),

  // Manager ki apni profile (delete ka option jaan-boojhkar nahi hai)
  profile: () => get("/profile"),
  updateProfile: (body) => send("PATCH", "/profile", body),

  admins: () => get("/admins"),
  addAdmin: (body) => send("POST", "/admins", body),
  deleteAdmin: (id) => send("DELETE", `/admins/${id}`),
};
