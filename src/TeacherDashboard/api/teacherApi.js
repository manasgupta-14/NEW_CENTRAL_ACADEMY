// Teacher dashboard ke saare backend calls (/api/teacher/...). Server har call par check karta hai ki teacher
// sirf apni class / apne subject ka data hi dekh ya badal raha hai.
import { createDashboardApi } from "../../ManagerDashboard/api/createDashboardApi";

const base = createDashboardApi("/teacher");
const cls = (className) => encodeURIComponent(className);

export const teacherApi = {
  ...base,
  overview: (date) => base.get(`/overview${base.qs({ date })}`),
  classes: () => base.get("/classes"),
  classStudents: (className) => base.get(`/classes/${cls(className)}/students`),
  fees: () => base.get("/fees"),
  results: (className) => base.get(`/results/${cls(className)}`),
  saveMarks: (className, body) => base.send("PUT", `/results/${cls(className)}`, body),
  removeMarks: (className, exam, subject) => base.send("DELETE", `/results/${cls(className)}${base.qs({ exam, subject })}`),
  profile: (month) => base.get(`/profile${base.qs({ month })}`),
};
