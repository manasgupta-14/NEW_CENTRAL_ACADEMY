// Class 1 to 5 section.
export const CLASS_1_5_GROUP = {
  slug: "class-1-5",
  title: "Class 1 – 5",
  basePath: "/study-point/class-1-5",
};

export const CLASS_1_5_CLASSES = [
  {
    slug: "class-1",
    title: "Class 1",
    emoji: "1️⃣",
    note: "Matra, ginti, pahade aur simple jod-ghatav.",
    tools: [
      { id: "barah-khadi" },
      { id: "maatra-gyan" },
      { id: "counting", props: { max: 100 }, title: "Counting 1 to 100" },
      { id: "tables", props: { from: 1, to: 10 }, title: "Tables 1 – 10" },
      { id: "maths-practice", props: { ops: ["+", "-"], max: 20 }, blurb: "Jod aur ghatav (20 tak)." },
      { id: "time-explorer", title: "Days, Weeks & Months" },
      { id: "poems" },
      { id: "drawing" },
    ],
  },
  {
    slug: "class-2",
    title: "Class 2",
    emoji: "2️⃣",
    note: "Pahade, jod-ghatav aur English word meanings.",
    tools: [
      { id: "maatra-gyan" },
      { id: "tables", props: { from: 2, to: 10 }, title: "Tables 2 – 10" },
      { id: "maths-practice", props: { ops: ["+", "-"], max: 100 }, blurb: "Jod aur ghatav (100 tak)." },
      { id: "time-explorer", title: "Clock & Calendar" },
      { id: "translator" },
      { id: "shapes" },
      { id: "poems" },
    ],
  },
  {
    slug: "class-3",
    title: "Class 3",
    emoji: "3️⃣",
    note: "Pahade 20 tak, guna aur naap-tol.",
    tools: [
      { id: "tables", props: { from: 2, to: 20 }, title: "Tables 2 – 20" },
      { id: "maths-practice", props: { ops: ["+", "-", "×"], max: 12 }, blurb: "Jod, ghatav aur guna." },
      { id: "unit-converter" },
      { id: "time-explorer" },
      { id: "translator" },
    ],
  },
  {
    slug: "class-4",
    title: "Class 4",
    emoji: "4️⃣",
    note: "Guna, bhag aur unit conversion.",
    tools: [
      { id: "tables", props: { from: 2, to: 20 }, title: "Tables 2 – 20" },
      { id: "maths-practice", props: { ops: ["+", "-", "×", "÷"], max: 12 }, blurb: "Chaaron operations." },
      { id: "unit-converter" },
      { id: "time-explorer" },
      { id: "translator" },
    ],
  },
  {
    slug: "class-5",
    title: "Class 5",
    emoji: "5️⃣",
    note: "Bade sankhya ke sawal, conversions aur vocabulary.",
    tools: [
      { id: "tables", props: { from: 2, to: 20 }, title: "Tables 2 – 20" },
      { id: "maths-practice", props: { ops: ["+", "-", "×", "÷"], max: 20 }, title: "Maths Practice", blurb: "Chaaron operations, bade numbers." },
      { id: "unit-converter" },
      { id: "squares-cubes" },
      { id: "time-explorer" },
      { id: "translator" },
    ],
  },
];
