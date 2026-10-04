// SCHOOL SCHEDULE: shown on Notice > School Schedule.
//
// HOW TO EDIT
//  - `date`: "YYYY-MM-DD" for an exact day, or "YYYY-MM" when the day is not fixed yet.
//    Month-only entries show "TBA" until you change them to a full date.
//  - `type`: holiday | function | exam | class | tour | program
//  - Past events disappear from the page automatically.
//
// IMPORTANT: these are SAMPLE entries so the page is not empty. Only the fixed
// national days (Children's Day, Christmas, Republic Day) have real dates, and even
// those assume the school marks them. Replace everything else with the school's real calendar.

export const EVENT_TYPES = {
  holiday: { label: "Holiday", chip: "bg-maroon-700/10 text-maroon-700", bar: "border-l-maroon-600" },
  function: { label: "Function", chip: "bg-saffron-100 text-saffron-600", bar: "border-l-saffron-500" },
  exam: { label: "Exam", chip: "bg-navy-900/10 text-navy-900", bar: "border-l-navy-700" },
  class: { label: "Class", chip: "bg-sky-100 text-sky-800", bar: "border-l-sky-500" },
  tour: { label: "Tour", chip: "bg-emerald-100 text-emerald-800", bar: "border-l-emerald-500" },
  program: { label: "Program", chip: "bg-violet-100 text-violet-800", bar: "border-l-violet-500" },
};

export const SCHEDULE = [
  { id: "dussehra", date: "2026-10", type: "holiday", title: "Dussehra holiday", details: "School closed for the festival. Exact days will be announced on the notice board." },
  { id: "diwali", date: "2026-11", type: "holiday", title: "Diwali break", details: "Festival break. Date and reopening day to be confirmed." },
  { id: "childrens-day", date: "2026-11-14", type: "function", title: "Children\u2019s Day celebration", details: "Games, songs and fun activities for all classes." },
  { id: "half-yearly", date: "2026-12", type: "exam", title: "Half-yearly examinations", details: "Time table for every class will be shared before the exams begin." },
  { id: "christmas", date: "2026-12-25", type: "holiday", title: "Christmas", details: "School closed." },
  { id: "classes-resume", date: "2027-01", type: "class", title: "Winter break ends, classes resume", details: "Regular timings begin again. Check the notice board for the exact day." },
  { id: "republic-day", date: "2027-01-26", type: "function", title: "Republic Day", details: "Flag hoisting and a short cultural program at the school." },
  { id: "sports-day", date: "2027-02", type: "program", title: "Annual Sports Day", details: "Races and team games for all classes. Parents are welcome." },
  { id: "tour", date: "2027-02", type: "tour", title: "Educational tour", details: "A one-day visit for selected classes. Permission slips will be sent home." },
  { id: "ptm", date: "2027-03", type: "program", title: "Parent\u2013teacher meeting", details: "Meet the class teacher and discuss your child\u2019s progress." },
  { id: "annual-exams", date: "2027-03", type: "exam", title: "Annual examinations", details: "Final exams for the session. Time table to be announced." },
];
