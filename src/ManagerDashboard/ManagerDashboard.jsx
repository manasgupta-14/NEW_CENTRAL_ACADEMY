import { Navigate, Route, Routes } from "react-router-dom";
import { BASE_PATH } from "./config/navigation";
import ManagerSessionProvider from "./context/ManagerSessionProvider";
import ManagerLayout from "./components/layout/ManagerLayout";
import DashboardPage from "./pages/DashboardPage";
import StaffPage from "./pages/StaffPage";
import StaffHistoryPage from "./pages/StaffHistoryPage";
import PrincipalPage from "./pages/PrincipalPage";
import StudentsPage from "./pages/StudentsPage";
import FeesPage from "./pages/FeesPage";
import AdminsPage from "./pages/AdminsPage";
import AttendancePage from "./pages/AttendancePage";
import FeedbackPage from "./pages/FeedbackPage";
import ProfilePage from "./pages/ProfilePage";

// Entry point: App.jsx me sirf <Route path="manager/*" element={<ManagerDashboard />} /> lagta hai.
// Har route par `key` hai taaki page badalne par search/filter state reset ho jaye.
export default function ManagerDashboard() {
  return (
    <ManagerSessionProvider>
      <Routes>
        <Route element={<ManagerLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="teaching-staff" element={<StaffPage key="teaching" type="teaching" />} />
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
    </ManagerSessionProvider>
  );
}
