import { CLASS_LIST } from "../config/forms";

// Students ko class ke hisaab se baant deta hai. Playway se Class 8 tak sab class hamesha aati hain (khaali ho to bhi),
// purane data me koi alag class naam ho to wo bhi end me dikhti hai.
export function groupByClass(students) {
  const extra = [...new Set(students.map((s) => s.className))].filter((c) => !CLASS_LIST.includes(c)).sort();
  return [...CLASS_LIST, ...extra].map((name) => ({ name, students: students.filter((s) => s.className === name) }));
}
