import { Navigate, Route, Routes } from "react-router-dom";
import { BASE_PATH } from "./config/navigation";
import ManagerSessionProvider from "./context/ManagerSessionProvider";
import { useManagerSession } from "./hooks/useManagerSession";
import ManagerLayout from "./components/layout/ManagerLayout";
import DashboardPage from "./pages/DashboardPage";
import StaffPage from "./pages/StaffPage";
import TeacherAssignmentsPage from "./pages/TeacherAssignmentsPage";
import SubjectsPage from "./pages/SubjectsPage";
import StaffHistoryPage from "./pages/StaffHistoryPage";
import PrincipalPage from "./pages/PrincipalPage";
import StudentsPage from "./pages/StudentsPage";
import FeesPage from "./pages/FeesPage";
import AdminsPage from "./pages/AdminsPage";
import AttendancePage from "./pages/AttendancePage";
import FeedbackPage from "./pages/FeedbackPage";
import ProfilePage from "./pages/ProfilePage";

// Principal ko sirf Subjects aur Teacher Assignments dikhte hain. Baaki sab Manager ke liye hai
// (backend bhi baaki routes par principal ko rok deta hai).
function PrincipalRoutes() {
  const home = `${BASE_PATH}/subjects`;
  return (
    <Routes>
      <Route element={<ManagerLayout />}>
        <Route path="subjects" element={<SubjectsPage />} />
        <Route path="teacher-assignments" element={<TeacherAssignmentsPage />} />
        <Route path="*" element={<Navigate to={home} replace />} />
      </Route>
    </Routes>
  );
}

function ManagerRoutes() {
  return (
    <Routes>
      <Route element={<ManagerLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="teaching-staff" element={<StaffPage key="teaching" type="teaching" />} />
        <Route path="subjects" element={<SubjectsPage />} />
        <Route path="teacher-assignments" element={<TeacherAssignmentsPage />} />
        <Route path="non-teaching-staff" element={<StaffPage key="non-teaching" type="non-teaching" />} />
        <Route path="staff-history" element={<StaffHistoryPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="admins" element={<AdminsPage />} />
        <Route path="principal" element={<PrincipalPage />} />
        <Route path="students" element={<StudentsPage key="current" />} />
        <Route path="passed-out-students" element={<StudentsPage key="passed-out" passedOut />} />
        <Route path="fees" element={<FeesPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to={BASE_PATH} replace />} />
      </Route>
    </Routes>
  );
}

function RoleRoutes() {
  const { role } = useManagerSession();
  return role === "principal" ? <PrincipalRoutes /> : <ManagerRoutes />;
}

// Entry point: App.jsx me sirf <Route path="manager/*" element={<ManagerDashboard />} /> lagta hai.
// Har route par `key` hai taaki page badalne par search/filter state reset ho jaye.
export default function ManagerDashboard() {
  return (
    <ManagerSessionProvider>
      <RoleRoutes />
    </ManagerSessionProvider>
  );
}
