import { LayoutDashboard, CalendarCheck, Users, FilePlus2, IndianRupee, GraduationCap, Briefcase, BookOpen, ClipboardList, UserRound } from "lucide-react";

export const BASE_PATH = "/principal";

// Principal ke sidebar ke pages. Layout / colours Manager dashboard wale hi hain (ManagerDashboard/components/layout).
export const PRINCIPAL_PANEL = {
  basePath: BASE_PATH,
  roleLabel: "Principal",
  label: "Principal Panel",
  title: "Principal Dashboard",
  profilePath: `${BASE_PATH}/profile`,
  nav: [
    { to: BASE_PATH, label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: `${BASE_PATH}/attendance`, label: "Attendance", icon: CalendarCheck },
    { to: `${BASE_PATH}/students`, label: "Students", icon: Users },
    { to: `${BASE_PATH}/admissions`, label: "Admissions", icon: FilePlus2 },
    { to: `${BASE_PATH}/fees`, label: "Fees", icon: IndianRupee },
    { to: `${BASE_PATH}/results`, label: "Results", icon: GraduationCap },
    { to: `${BASE_PATH}/staff`, label: "Staff & Salary", icon: Briefcase },
    { to: `${BASE_PATH}/subjects`, label: "Subjects", icon: BookOpen },
    { to: `${BASE_PATH}/teacher-assignments`, label: "Teacher Assignments", icon: ClipboardList },
    { to: `${BASE_PATH}/profile`, label: "My Profile", icon: UserRound },
  ],
};
