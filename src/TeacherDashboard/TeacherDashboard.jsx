import { Navigate, Route, Routes } from "react-router-dom";
import ManagerSessionProvider from "../ManagerDashboard/context/ManagerSessionProvider";
import DashboardLayout from "../ManagerDashboard/components/layout/DashboardLayout";
import { teacherApi } from "./api/teacherApi";
import { BASE_PATH, TEACHER_PANEL } from "./config/navigation";
import DashboardPage from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage";
import StudentsPage from "./pages/StudentsPage";
import ResultsPage from "./pages/ResultsPage";
import FeesPage from "./pages/FeesPage";
import ProfilePage from "./pages/ProfilePage";

// Entry point: App.jsx me <Route path="teacher/*" element={<TeacherDashboard />} />.
// Sirf "teacher" role andar aa sakta hai. Teacher sirf apni class / apne subject ka data dekhta hai (server bhi yahi rokta hai).
export default function TeacherDashboard() {
  return (
    <ManagerSessionProvider roles={["teacher"]} api={teacherApi}>
      <Routes>
        <Route element={<DashboardLayout panel={TEACHER_PANEL} />}>
          <Route index element={<DashboardPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="fees" element={<FeesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to={BASE_PATH} replace />} />
        </Route>
      </Routes>
    </ManagerSessionProvider>
  );
}
