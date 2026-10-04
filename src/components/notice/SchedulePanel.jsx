import { useMemo, useState } from "react";
import { SCHEDULE, EVENT_TYPES } from "../../data/schedule";

// "Today" is read once when the page loads.
const NOW = new Date();
const pad = (n) => String(n).padStart(2, "0");
const TODAY = `${NOW.getFullYear()}-${pad(NOW.getMonth() + 1)}-${pad(NOW.getDate())}`;
const THIS_MONTH = TODAY.slice(0, 7);

const isMonthOnly = (e) => e.date.length === 7;
const isUpcoming = (e) => (isMonthOnly(e) ? e.date >= THIS_MONTH : e.date >= TODAY);
// Month-only (TBA) entries sort to the end of their month.
const sortKey = (e) => (isMonthOnly(e) ? `${e.date}-99` : e.date);

const monthLabel = (ym) => {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
};

function DateBadge({ event }) {
  if (isMonthOnly(event)) {
    const [y, m] = event.date.split("-").map(Number);
    const mon = new Date(y, m - 1, 1).toLocaleDateString("en-IN", { month: "short" });
    return (
      <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-navy-900/25 text-navy-900">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-900/55">{mon}</span>
        <span className="font-display text-lg font-semibold leading-none">TBA</span>
      </div>
    );
  }
  const d = new Date(`${event.date}T00:00:00`);
  return (
    <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-2xl bg-navy-900 text-paper-50 transition-colors duration-300 group-hover:bg-saffron-600">
      <span className="text-xs font-medium uppercase tracking-wide text-paper-50/70">
        {d.toLocaleDateString("en-IN", { month: "short" })}
      </span>
      <span className="font-display text-2xl font-semibold leading-none">{d.getDate()}</span>
      <span className="mt-0.5 text-[11px] text-paper-50/60">{d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
    </div>
  );
}

function SchedulePanel() {
  const [type, setType] = useState("all");

  const upcoming = useMemo(() => SCHEDULE.filter(isUpcoming).sort((a, b) => sortKey(a).localeCompare(sortKey(b))), []);
  const shown = type === "all" ? upcoming : upcoming.filter((e) => e.type === type);

  const months = useMemo(() => {
    const groups = new Map();
    shown.forEach((e) => {
      const key = e.date.slice(0, 7);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(e);
    });
    return [...groups.entries()];
  }, [shown]);

  const usedTypes = Object.keys(EVENT_TYPES).filter((k) => upcoming.some((e) => e.type === k));

  return (
    <div>
      <p className="max-w-2xl leading-relaxed text-ink-900/65">
        Holidays, functions, exams, classes and tours for the session. Dates marked <strong className="font-semibold text-navy-900">TBA</strong> will
        be confirmed on the notice board, so please check back regularly.
      </p>

      <div className="mt-7 flex flex-wrap gap-2.5" role="group" aria-label="Filter by event type">
        {["all", ...usedTypes].map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={type === k}
            onClick={() => setType(k)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
              type === k ? "bg-navy-900 text-paper-50 shadow-md" : "border border-navy-900/15 text-navy-900 hover:border-saffron-500 hover:bg-saffron-100"
            }`}
          >
            {k === "all" ? "All events" : EVENT_TYPES[k].label}
          </button>
        ))}
      </div>

      {/* key= replays the entrance whenever the filter changes */}
      <div key={type} className="mt-10 space-y-12">
        {months.length === 0 && (
          <p className="rounded-2xl border border-dashed border-navy-900/20 p-8 text-center text-ink-900/60">
            No upcoming events right now. New dates will appear here.
          </p>
        )}

        {months.map(([ym, events], g) => (
          <section key={ym} aria-label={monthLabel(ym)}>
            <div className="flex items-center gap-4">
              <h2 className="font-display text-2xl font-semibold text-navy-900">{monthLabel(ym)}</h2>
              <span aria-hidden="true" className="h-px flex-1 origin-left animate-draw-x bg-navy-900/15" />
            </div>

            <ul className="mt-5 space-y-4">
              {events.map((e, i) => (
                <li key={e.id} className="animate-hero-in" style={{ animationDelay: `${Math.min(g * 3 + i, 8) * 70}ms` }}>
                  <article className={`group flex items-start gap-5 rounded-2xl border border-navy-900/10 border-l-4 bg-paper-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${EVENT_TYPES[e.type].bar}`}>
                    <DateBadge event={e} />
                    <div className="min-w-0">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${EVENT_TYPES[e.type].chip}`}>
                        {EVENT_TYPES[e.type].label}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-navy-900 md:text-xl">{e.title}</h3>
                      {e.details && <p className="mt-1 leading-relaxed text-ink-900/65">{e.details}</p>}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export default SchedulePanel;
