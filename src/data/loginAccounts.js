// Which fields each account type sees on the Login and Forgot-password forms.
// To change a form, edit the arrays below. No page code needs to change.
const PASSWORD = { name: "password", label: "Password", type: "password", autoComplete: "current-password" };
const EMAIL = { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@example.com" };

export const ACCOUNTS = {
  student: {
    label: "Student",
    login: [
      { name: "id", label: "Student ID", autoComplete: "username", placeholder: "e.g. NCA-1024" },
      PASSWORD,
    ],
    forgot: [{ name: "id", label: "Student ID", placeholder: "e.g. NCA-1024" }, EMAIL],
  },
  teacher: {
    label: "Teacher",
    login: [
      { name: "id", label: "Teacher ID", autoComplete: "username" },
      EMAIL,
      PASSWORD,
    ],
    forgot: [EMAIL, { name: "id", label: "Teacher ID" }],
  },
  principal: {
    label: "Principal",
    login: [{ name: "fullName", label: "Name", autoComplete: "name" }, EMAIL, PASSWORD],
    forgot: [EMAIL, { name: "fullName", label: "Name", autoComplete: "name" }],
  },
  manager: {
    label: "Manager",
    login: [EMAIL, PASSWORD],
    forgot: [], // Manager ko email nahi daalni: link database wale email par apne aap jaata hai
  },
};

export const MANAGEMENT_ROLES = ["teacher", "principal", "manager"];
