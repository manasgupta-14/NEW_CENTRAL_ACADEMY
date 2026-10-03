import { useState } from "react";
import { NOTICES } from "../../data/notices";
import PageHero from "../../components/common/PageHero";

const FILTERS = ["All", ...new Set(NOTICES.map((n) => n.tag))];

function Notice() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? NOTICES : NOTICES.filter((n) => n.tag === filter);

  return (
    <>
      <PageHero title="Notice board" crumb="Notice" intro="School announcements for parents and students." />

      <section className="bg-paper-50">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
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
      </section>
    </>
  );
}

export default Notice;
