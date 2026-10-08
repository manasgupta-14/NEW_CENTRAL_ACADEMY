import { useState } from "react";
import { numberToWords, speak } from "../../../utils/study";

// Number grid 1..max. Tap a number to hear it (English or Hindi voice).
export default function Counting({ max = 100 }) {
  const [selected, setSelected] = useState(null);
  const [lang, setLang] = useState("en-US");

  function choose(n) {
    setSelected(n);
    speak(String(n), { lang, rate: 0.8, pitch: 1.1 });
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2" role="group" aria-label="Voice language">
          {[["en-US", "English"], ["hi-IN", "हिन्दी"]].map(([code, label]) => (
            <button key={code} type="button" onClick={() => setLang(code)} aria-pressed={lang === code} className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${lang === code ? "bg-navy-900 text-paper-50" : "bg-paper-100 text-navy-900 hover:bg-saffron-100"}`}>
              {label}
            </button>
          ))}
        </div>
        <p className="min-h-8 font-display text-2xl font-semibold text-navy-900">
          {selected ? `${selected} · ${numberToWords(selected)}` : "Koi number dabao"}
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-3">
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => choose(n)}
            aria-pressed={n === selected}
            className={`rounded-2xl py-4 font-display text-2xl font-semibold shadow-sm transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-md ${n === selected ? "bg-saffron-500 text-navy-950" : "bg-paper-100 text-navy-900 hover:bg-saffron-100"}`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
