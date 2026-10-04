import { useState } from "react";
import { NOTICES } from "../../data/notices";
import PageHero from "../../components/common/PageHero";
import SchedulePanel from "../../components/notice/SchedulePanel";

const TABS = [
  { key: "notices", label: "Notices" },
  { key: "schedule", label: "School Schedule" },
];
const FILTERS = ["All", ...new Set(NOTICES.map((n) => n.tag))];

function Notice() {
  const [tab, setTab] = useState("notices");
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? NOTICES : NOTICES.filter((n) => n.tag === filter);

  return (
    <>
      <PageHero
        title="Notice board"
        crumb="Notice"
        intro="Announcements and the school calendar for parents and students."
      />

      <section className="bg-paper-50">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          {/* Notices / School Schedule switch with a sliding pill */}
          <div className="relative mx-auto mb-10 grid max-w-md grid-cols-2 rounded-full bg-paper-100 p-1" role="group" aria-label="Choose section">
            <span
              aria-hidden="true"
              className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/2)] rounded-full bg-navy-900 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(${TABS.findIndex((t) => t.key === tab) * 100}%)` }}
            />
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                aria-pressed={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`relative z-10 rounded-full py-2.5 text-sm font-medium transition-colors duration-300 ${tab === t.key ? "text-paper-50" : "text-navy-900"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "schedule" ? (
            <div key="schedule" className="animate-pop">
              <SchedulePanel />
            </div>
          ) : (
            <div key="notices" className="animate-pop">
              <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter notices">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={filter === f}
                    onClick={() => setFilter(f)}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                      filter === f ? "bg-navy-900 text-paper-50 shadow-md" : "border border-navy-900/15 text-navy-900 hover:border-saffron-500 hover:bg-saffron-100"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* key= replays the entrance whenever the filter changes */}
              <ul key={filter} className="mt-10 space-y-5">
                {shown.map((n, i) => (
                  <li key={n.id} className="animate-hero-in" style={{ animationDelay: `${i * 90}ms` }}>
                    <article className="rounded-2xl border border-navy-900/10 bg-paper-100 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-saffron-500/60 hover:shadow-lg">
                      <span className="rounded-full bg-saffron-100 px-3 py-1 text-xs font-medium text-saffron-600">{n.tag}</span>
                      <h2 className="mt-4 font-display text-xl font-semibold text-navy-900">{n.title}</h2>
                      <p className="mt-2 leading-relaxed text-ink-900/70">{n.body}</p>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Notice;
