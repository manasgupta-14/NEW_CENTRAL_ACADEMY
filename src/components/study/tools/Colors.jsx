import { useState } from "react";
import { COLORS } from "../../../data/study/shapes";
import { speak } from "../../../utils/study";

// Colour cards. Tap to hear the name in English or Hindi.
export default function Colors() {
  const [lang, setLang] = useState("en");
  const [selected, setSelected] = useState(null);

  function choose(c) {
    setSelected(c);
    speak(lang === "en" ? c.en : c.hi, { lang: lang === "en" ? "en-US" : "hi-IN", rate: 0.8 });
  }

  return (
    <div>
      <div className="mb-6 flex gap-2" role="group" aria-label="Language">
        {[["en", "English"], ["hi", "हिन्दी"]].map(([id, label]) => (
          <button key={id} type="button" onClick={() => setLang(id)} aria-pressed={lang === id} className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${lang === id ? "bg-navy-900 text-paper-50" : "bg-paper-100 text-navy-900 hover:bg-saffron-100"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {COLORS.map((c) => (
          <button
            key={c.en}
            type="button"
            onClick={() => choose(c)}
            aria-pressed={selected === c}
            className={`overflow-hidden rounded-2xl border bg-paper-100 text-center transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg ${selected === c ? "border-saffron-500 ring-2 ring-saffron-500" : "border-navy-900/10"}`}
          >
            <span className="block h-28 border-b border-navy-900/10" style={{ backgroundColor: c.hex }} />
            <span className="block px-3 py-3">
              <span className="block font-display text-xl font-semibold text-navy-900">{lang === "en" ? c.en : c.hi}</span>
              <span className="block text-sm text-ink-900/60">{c.example}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
