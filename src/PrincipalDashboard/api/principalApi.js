// Principal dashboard ke saare backend calls (/api/principal/...). Subjects aur Teacher Assignments ke calls
// Manager wale hi hain (ManagerDashboard/api/managerApi.js), kyunki wo routes Principal ko bhi allowed hain.
import { api } from "../../utils/api";
import { createDashboardApi } from "../../ManagerDashboard/api/createDashboardApi";

const base = createDashboardApi("/principal");

export const principalApi = {
  ...base,
  overview: (date) => base.get(`/overview${base.qs({ date })}`),
  students: (status) => base.get(`/students${base.qs({ status })}`),
  admitStudent: (body) => base.send("POST", "/students", body),
  fees: () => base.get("/fees"),
  results: () => base.get("/results"),
  staff: (type) => base.get(`/staff/${type}`),
  profile: () => base.get("/profile"),

  // Website se aayi admission applications (/api/admin/admissions): Manager aur Principal dono dekh sakte hain
  admissions: (status) => api(`/admin/admissions${base.qs({ status, limit: 200 })}`, { auth: true }),
  setAdmissionStatus: (id, status) => api(`/admin/admissions/${id}`, { method: "PATCH", body: { status }, auth: true }),
};
