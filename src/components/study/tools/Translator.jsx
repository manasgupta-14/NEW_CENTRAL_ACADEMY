import { useRef, useState } from "react";
import { speak } from "../../../utils/study";

// Free public APIs: dictionaryapi.dev (English meaning) + MyMemory (Hindi translation).
async function toHindi(text) {
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|hi`);
    const data = await res.json();
    return data.responseStatus === 200 ? data.responseData.translatedText : null;
  } catch {
    return null;
  }
}

// Type an English word: hear it, read the meaning and see it in Hindi.
export default function Translator() {
  const [word, setWord] = useState("");
  const [state, setState] = useState({ status: "idle" });
  const latest = useRef(0); // ignores answers of older searches

  async function search(e) {
    e.preventDefault();
    const w = word.trim();
    if (!w) return;
    const id = ++latest.current;
    speak(w);
    setState({ status: "loading" });

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(w)}`);
      if (!res.ok) throw new Error("not found");
      const data = await res.json();
      const def = data[0].meanings[0].definitions[0];
      const base = { status: "ok", word: w, definition: def.definition, example: def.example || "" };
      if (id !== latest.current) return;
      setState(base);

      const [hindiWord, hindiMeaning, hindiExample] = await Promise.all([
        toHindi(w),
        toHindi(base.definition),
        base.example ? toHindi(base.example) : Promise.resolve(""),
      ]);
      if (id !== latest.current) return;
      setState({ ...base, hindiWord, hindiMeaning, hindiExample, translated: true });
    } catch {
      if (id === latest.current) setState({ status: "error" });
    }
  }

  const r = state;
  const hi = (v) => (r.translated ? v || "Not available" : "Loading…");

  return (
    <div className="mx-auto max-w-xl">
      <form onSubmit={search} className="flex gap-3">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Type an English word…"
          aria-label="English word"
          className="min-w-0 flex-1 rounded-xl border-2 border-navy-900/15 bg-paper-50 px-4 py-3 text-lg outline-none focus:border-saffron-500"
        />
        <button type="submit" className="rounded-xl bg-navy-900 px-6 py-3 font-semibold text-paper-50 transition-colors hover:bg-saffron-600">
          Search
        </button>
      </form>

      <div className="mt-6" aria-live="polite">
        {r.status === "loading" && <p className="text-center text-ink-900/60">Searching…</p>}
        {r.status === "error" && <p className="text-center text-ink-900/60">Meaning nahi mila. Spelling check karo ya internet dekho.</p>}
        {r.status === "ok" && (
          <div className="animate-pop rounded-2xl border border-navy-900/10 bg-paper-100 p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-3xl font-semibold capitalize text-navy-900">{r.word}</h2>
              <button type="button" onClick={() => speak(r.word)} className="rounded-full bg-saffron-500 px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-saffron-600">
                🔊 Pronounce
              </button>
            </div>
            <dl className="mt-5 space-y-4 text-ink-900/85">
              <div><dt className="text-sm font-semibold text-ink-900/55">Hindi</dt><dd className="text-2xl">{hi(r.hindiWord)}</dd></div>
              <div><dt className="text-sm font-semibold text-ink-900/55">Meaning</dt><dd>{r.definition}</dd><dd className="mt-1 text-lg">{hi(r.hindiMeaning)}</dd></div>
              {r.example && (
                <div><dt className="text-sm font-semibold text-ink-900/55">Example</dt><dd>“{r.example}”</dd><dd className="mt-1 text-lg">{hi(r.hindiExample)}</dd></div>
              )}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
