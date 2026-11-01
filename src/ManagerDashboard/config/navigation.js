import { LayoutDashboard, GraduationCap, BriefcaseBusiness, History, ShieldCheck, Users, IndianRupee, UserCog, CalendarCheck, UserRound, MessageSquareText, ClipboardList, BookOpen } from "lucide-react";

export const BASE_PATH = "/manager";

// Principal bhi isi panel me aata hai, lekin use sirf `principalToo: true` wale pages dikhte hain (Subjects aur Teacher Assignments).
export const NAV_ITEMS = [
  { to: BASE_PATH, label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: `${BASE_PATH}/teaching-staff`, label: "Teaching Staff", icon: GraduationCap },
  { to: `${BASE_PATH}/subjects`, label: "Subjects", icon: BookOpen, principalToo: true },
  { to: `${BASE_PATH}/teacher-assignments`, label: "Teacher Assignments", icon: ClipboardList, principalToo: true },
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
