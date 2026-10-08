import { useRef, useState } from "react";

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function makeQuestion(ops, max) {
  const op = ops[rand(0, ops.length - 1)];
  const smallMax = Math.min(max, 12);
  if (op === "+") { const a = rand(1, max), b = rand(1, max); return { a, b, op, answer: a + b }; }
  if (op === "-") { const x = rand(1, max), y = rand(1, max); return { a: Math.max(x, y), b: Math.min(x, y), op, answer: Math.abs(x - y) }; }
  if (op === "×") { const a = rand(2, max), b = rand(2, smallMax); return { a, b, op, answer: a * b }; }
  const b = rand(2, smallMax), q = rand(1, max); // ÷ : always divides exactly
  return { a: b * q, b, op, answer: q };
}

// Random questions with instant checking. `ops` and `max` come from the class config.
export default function MathsPractice({ ops = ["+", "-"], max = 20 }) {
  const [q, setQ] = useState(() => makeQuestion(ops, max));
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null); // { ok, text }
  const [score, setScore] = useState({ right: 0, total: 0, streak: 0 });
  const field = useRef(null);

  function next(fb) {
    setQ(makeQuestion(ops, max));
    setInput("");
    setFeedback(fb);
    field.current?.focus();
  }

  function submit(e) {
    e.preventDefault();
    if (input.trim() === "") return;
    const ok = Number(input) === q.answer;
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1, streak: ok ? s.streak + 1 : 0 }));
    next(ok ? { ok, text: "✅ Sahi jawab!" } : { ok, text: `❌ Sahi jawab tha ${q.answer}` });
  }

  return (
    <div className="mx-auto max-w-md text-center">
      <div className="flex justify-center gap-6 text-sm text-ink-900/65">
        <span>Score: <strong className="text-navy-900">{score.right} / {score.total}</strong></span>
        <span>Streak: <strong className="text-navy-900">{score.streak} 🔥</strong></span>
      </div>

      <form onSubmit={submit} className="mt-6 rounded-2xl border border-navy-900/10 bg-paper-100 p-8">
        <p className="font-display text-5xl font-semibold text-navy-900">
          {q.a} {q.op} {q.b} = ?
        </p>
        <input
          ref={field}
          type="number"
          inputMode="numeric"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Your answer"
          autoFocus
          className="mt-6 w-full rounded-xl border-2 border-navy-900/15 bg-paper-50 px-4 py-3 text-center text-2xl outline-none focus:border-saffron-500"
        />
        <div className="mt-5 flex justify-center gap-3">
          <button type="submit" className="rounded-full bg-navy-900 px-7 py-2.5 font-semibold text-paper-50 transition-colors hover:bg-saffron-600">Check</button>
          <button type="button" onClick={() => next(null)} className="rounded-full border-2 border-navy-900 px-7 py-2.5 font-semibold text-navy-900 transition-colors hover:bg-navy-900 hover:text-paper-50">Skip</button>
        </div>
        <p className={`mt-5 min-h-7 font-semibold ${feedback?.ok ? "text-green-700" : "text-maroon-700"}`} aria-live="polite">{feedback?.text}</p>
      </form>
    </div>
  );
}
