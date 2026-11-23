import { LayoutDashboard, CalendarCheck, Users, GraduationCap, IndianRupee, UserRound } from "lucide-react";

export const BASE_PATH = "/teacher";

// Teacher ke sidebar ke pages. Layout / colours Manager dashboard wale hi hain (ManagerDashboard/components/layout).
export const TEACHER_PANEL = {
  basePath: BASE_PATH,
  roleLabel: "Teacher",
  label: "Teacher Panel",
  title: "Teacher Dashboard",
  profilePath: `${BASE_PATH}/profile`,
  nav: [
    { to: BASE_PATH, label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: `${BASE_PATH}/attendance`, label: "Attendance", icon: CalendarCheck },
    { to: `${BASE_PATH}/students`, label: "Students", icon: Users },
    { to: `${BASE_PATH}/results`, label: "Results", icon: GraduationCap },
    { to: `${BASE_PATH}/fees`, label: "Fees", icon: IndianRupee },
    { to: `${BASE_PATH}/profile`, label: "My Profile", icon: UserRound },
  ],
};
