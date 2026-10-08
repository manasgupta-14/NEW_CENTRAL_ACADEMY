// Add Staff / Add Principal forms ke fields. Form badalna ho to bas yahan edit karo.
const NAME = { name: "name", label: "Full Name", placeholder: "Enter full name" };
const QUALIFICATION = { name: "qualification", label: "Qualification", placeholder: "e.g. M.Sc Mathematics" };
const PHONE = { name: "phone", label: "Phone", type: "tel", placeholder: "10-digit mobile number", pattern: "[0-9]{10}", title: "10-digit number" };
const JOINING = { name: "joiningDate", label: "Joining Date", type: "date" };
const SALARY = { name: "salary", label: "Monthly Salary", type: "number", min: 0, placeholder: "e.g. 40000" };
const PASSWORD = { name: "password", label: "Login Password", type: "password", minLength: 8, placeholder: "Minimum 8 characters", autoComplete: "new-password" };

export const STAFF_FORM = {
  teaching: [
    NAME,
    { name: "teacherId", label: "Teacher ID", placeholder: "e.g. NCA-T01" },
    { name: "subject", label: "Subject", placeholder: "e.g. Mathematics" },
    QUALIFICATION,
    PHONE,
    { name: "email", label: "Email", type: "email", placeholder: "teacher@example.com" },
    JOINING,
    SALARY,
    PASSWORD,
  ],
  "non-teaching": [
    NAME,
    { name: "role", label: "Role", placeholder: "e.g. Accountant, Driver" },
    QUALIFICATION,
    PHONE,
    { name: "email", label: "Email (optional)", type: "email", placeholder: "name@example.com", optional: true },
    JOINING,
    SALARY,
  ],
};

export const CLASS_LIST = ["Playway", "Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8"];

// Naya admission form. `options` wale field dropdown ban jaate hain.
export const STUDENT_FORM = [
  { ...NAME, name: "name", label: "Student Name", placeholder: "Enter student name" },
  { name: "studentId", label: "Admission No. / Student ID", placeholder: "e.g. NCA-1024" },
  { name: "className", label: "Class", options: CLASS_LIST.map((c) => ({ value: c, label: c })) },
  { name: "rollNo", label: "Roll No.", placeholder: "Optional", optional: true },
  { name: "dob", label: "Date of Birth", type: "date" },
  { name: "gender", label: "Gender", optional: true, options: ["Male", "Female", "Other"].map((g) => ({ value: g, label: g })) },
  { name: "fatherName", label: "Father's Name", placeholder: "Enter father's name" },
  { name: "motherName", label: "Mother's Name", placeholder: "Enter mother's name" },
  { ...PHONE, label: "Parent's Mobile Number" },
  { name: "email", label: "Email (optional)", type: "email", placeholder: "parent@example.com", optional: true },
  { name: "totalFee", label: "Total Fee (optional)", type: "number", min: 0, placeholder: "e.g. 24000", optional: true },
  { ...PASSWORD, label: "Student Login Password" },
];

export const ADMIN_FORM = [
  { ...NAME, name: "name" },
  { name: "email", label: "Email", type: "email", placeholder: "admin@example.com" },
  PASSWORD,
];

// Manager apni profile me yahi badal sakta hai
export const PROFILE_FORM = [
  { ...NAME, name: "name" },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { ...PHONE, label: "Phone (optional)", optional: true },
];

export const PRINCIPAL_FORM = [
  { ...NAME, name: "fullName" },
  QUALIFICATION,
  PHONE,
  { name: "email", label: "Email", type: "email", placeholder: "principal@example.com" },
  JOINING,
  SALARY,
  PASSWORD,
];

export const STAFF_LABEL = {
  teaching: { title: "Teaching Staff", noun: "teaching staff", position: "Subject" },
  "non-teaching": { title: "Non-Teaching Staff", noun: "non-teaching staff", position: "Role" },
};
