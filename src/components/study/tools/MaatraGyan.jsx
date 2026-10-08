import { useState } from "react";
import { MAATRA_SECTIONS } from "../../../data/study/maatra";
import { speak } from "../../../utils/study";

const title = (m) => (m === "अ" ? "बिना मात्रा वाले शब्द" : `${m} की मात्रा वाले शब्द`);

// मात्रा ज्ञान: tap a word to hear it.
export default function MaatraGyan() {
  const [filter, setFilter] = useState("all");
  const sections = filter === "all" ? MAATRA_SECTIONS : MAATRA_SECTIONS.filter((s) => s.matra === filter);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {["all", ...MAATRA_SECTIONS.map((s) => s.matra)].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setFilter(m)}
            aria-pressed={filter === m}
            className={`h-11 min-w-11 rounded-lg px-3 text-lg font-semibold transition-colors ${filter === m ? "bg-navy-900 text-paper-50" : "bg-paper-100 text-navy-900 hover:bg-saffron-100"}`}
          >
            {m === "all" ? "सभी" : m}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {sections.map((s) => (
          <section key={s.matra} className="rounded-2xl border border-navy-900/10 bg-paper-100 p-6">
            <h2 className="font-display text-xl font-semibold text-navy-900">{title(s.matra)}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {s.words.map((w) => (
                <button key={w} type="button" onClick={() => speak(w, { lang: "hi-IN", rate: 0.7 })} className="rounded-xl bg-paper-50 px-5 py-3 text-xl font-medium text-navy-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-saffron-500 hover:text-navy-950">
                  {w}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
