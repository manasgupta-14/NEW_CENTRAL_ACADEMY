import { useState } from "react";
import ShapeArt from "../ShapeArt";
import { SHAPES } from "../../../data/study/shapes";
import { speak } from "../../../utils/study";

const CATEGORIES = [
  { id: "2d", label: "2D Shapes" },
  { id: "special", label: "Special" },
  { id: "3d", label: "3D Shapes" },
];

const randomItem = (list) => list[Math.floor(Math.random() * list.length)];

// Shapes with names (English / Hindi), search and a "find the shape" quiz.
// `categories` limits what a class sees (Playway: only ["2d"]).
export default function Shapes({ categories = ["2d", "special", "3d"] }) {
  const [cat, setCat] = useState("all");
  const [lang, setLang] = useState("en");
  const [query, setQuery] = useState("");
  const [quiz, setQuiz] = useState(null); // { target, score, tries, message }

  const allowed = SHAPES.filter((s) => categories.includes(s.cat));
  const q = query.trim().toLowerCase();
  const visible = allowed.filter(
    (s) => (cat === "all" || s.cat === cat) && (!q || s.en.toLowerCase().includes(q) || s.hi.includes(q) || s.example.toLowerCase().includes(q))
  );
  const name = (s) => (lang === "en" ? s.en : s.hi);
  const say = (s) => speak(name(s), { lang: lang === "en" ? "en-US" : "hi-IN", rate: 0.85 });

  function startQuiz() {
    const target = randomItem(visible.length ? visible : allowed);
    setQuiz({ target, score: 0, tries: 0, message: "" });
    say(target);
  }

  function onCard(s) {
    if (!quiz) return say(s);
    if (s.id === quiz.target.id) {
      const next = randomItem(visible.length ? visible : allowed);
      setQuiz({ target: next, score: quiz.score + 1, tries: quiz.tries + 1, message: "✅ Sahi jawab!" });
      say(next);
    } else {
      setQuiz({ ...quiz, tries: quiz.tries + 1, message: "❌ Dobara try karo" });
      say(quiz.target);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2" role="tablist">
          {[{ id: "all", label: "All" }, ...CATEGORIES.filter((c) => categories.includes(c.id))].map((c) => (
            <button key={c.id} type="button" role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${cat === c.id ? "bg-navy-900 text-paper-50" : "bg-paper-100 text-navy-900 hover:bg-saffron-100"}`}>
              {c.label}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search shape…"
          aria-label="Search shape"
          className="min-w-0 flex-1 rounded-full border border-navy-900/15 bg-paper-50 px-4 py-2 text-sm outline-none focus:border-saffron-500 sm:max-w-xs"
        />
        <div className="flex gap-2" role="group" aria-label="Language">
          {[["en", "English"], ["hi", "हिन्दी"]].map(([id, label]) => (
            <button key={id} type="button" onClick={() => setLang(id)} aria-pressed={lang === id} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${lang === id ? "bg-saffron-500 text-navy-950" : "bg-paper-100 text-navy-900 hover:bg-saffron-100"}`}>
              {label}
            </button>
          ))}
        </div>
        <button type="button" onClick={quiz ? () => setQuiz(null) : startQuiz} className="rounded-full bg-navy-900 px-5 py-2 text-sm font-semibold text-paper-50 transition-colors hover:bg-saffron-600">
          {quiz ? "Quiz band karo" : "🎯 Quiz"}
        </button>
      </div>

      {quiz && (
        <div className="mb-6 rounded-2xl bg-navy-900 p-5 text-center text-paper-50" role="status">
          <p className="font-display text-2xl font-semibold">Find the {name(quiz.target)}</p>
          <p className="mt-1 text-sm text-paper-50/70">
            Score: {quiz.score} / {quiz.tries} {quiz.message && <span className="ml-2 font-semibold text-saffron-500">{quiz.message}</span>}
          </p>
        </div>
      )}

      {visible.length === 0 ? (
        <p className="py-12 text-center text-ink-900/60">Koi shape nahi mila.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((s) => (
            <button key={s.id} type="button" onClick={() => onCard(s)} className="flex flex-col items-center gap-2 rounded-2xl border border-navy-900/10 bg-paper-100 p-5 text-center transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg">
              <ShapeArt shape={s} />
              {/* during the quiz the name is hidden so the child must recognise the shape */}
              <span className="font-display text-lg font-semibold text-navy-900">{quiz ? "?" : name(s)}</span>
              {!quiz && <span className="text-xs text-ink-900/55">{s.example}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
