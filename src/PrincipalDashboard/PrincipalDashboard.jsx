import { Navigate, Route, Routes } from "react-router-dom";
import ManagerSessionProvider from "../ManagerDashboard/context/ManagerSessionProvider";
import DashboardLayout from "../ManagerDashboard/components/layout/DashboardLayout";
import SubjectsPage from "../ManagerDashboard/pages/SubjectsPage";
import TeacherAssignmentsPage from "../ManagerDashboard/pages/TeacherAssignmentsPage";
import { principalApi } from "./api/principalApi";
import { BASE_PATH, PRINCIPAL_PANEL } from "./config/navigation";
import DashboardPage from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage";
import StudentsPage from "./pages/StudentsPage";
import AdmissionsPage from "./pages/AdmissionsPage";
import FeesPage from "./pages/FeesPage";
import ResultsPage from "./pages/ResultsPage";
import StaffSalaryPage from "./pages/StaffSalaryPage";
import ProfilePage from "./pages/ProfilePage";

// Entry point: App.jsx me <Route path="principal/*" element={<PrincipalDashboard />} />.
// Sirf "principal" role andar aa sakta hai; baaki ko unke apne dashboard / login par bheja jaata hai.
export default function PrincipalDashboard() {
  return (
    <ManagerSessionProvider roles={["principal"]} api={principalApi}>
      <Routes>
        <Route element={<DashboardLayout panel={PRINCIPAL_PANEL} />}>
          <Route index element={<DashboardPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="fees" element={<FeesPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="staff" element={<StaffSalaryPage />} />
          <Route path="subjects" element={<SubjectsPage />} />
          <Route path="teacher-assignments" element={<TeacherAssignmentsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to={BASE_PATH} replace />} />
        </Route>
      </Routes>
    </ManagerSessionProvider>
  );
}
