import { LayoutDashboard, GraduationCap, BriefcaseBusiness, History, ShieldCheck, Users, IndianRupee, UserCog, CalendarCheck, UserRound, MessageSquareText } from "lucide-react";

export const BASE_PATH = "/manager";

export const NAV_ITEMS = [
  { to: BASE_PATH, label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: `${BASE_PATH}/teaching-staff`, label: "Teaching Staff", icon: GraduationCap },
  { to: `${BASE_PATH}/non-teaching-staff`, label: "Non-Teaching Staff", icon: BriefcaseBusiness },
  { to: `${BASE_PATH}/staff-history`, label: "Staff History", icon: History },
  { to: `${BASE_PATH}/admins`, label: "Admins", icon: UserCog },
  { to: `${BASE_PATH}/principal`, label: "Principal", icon: ShieldCheck },
  { to: `${BASE_PATH}/students`, label: "Students", icon: Users },
  { to: `${BASE_PATH}/passed-out-students`, label: "Passed Out Students", icon: GraduationCap },
  { to: `${BASE_PATH}/attendance`, label: "Attendance", icon: CalendarCheck },
  { to: `${BASE_PATH}/fees`, label: "Fees", icon: IndianRupee },
  { to: `${BASE_PATH}/feedback`, label: "Feedback", icon: MessageSquareText },
  { to: `${BASE_PATH}/profile`, label: "My Profile", icon: UserRound },
];
