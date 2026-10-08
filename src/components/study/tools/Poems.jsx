import { useEffect, useRef, useState } from "react";
import { POEMS } from "../../../data/study/poems";
import { speak, stopSounds } from "../../../utils/study";

// Rhymes read line by line, with the current line highlighted and an emoji popping up.
export default function Poems() {
  const [poemId, setPoemId] = useState(POEMS[0].id);
  const [lang, setLang] = useState("en");
  const [active, setActive] = useState(-1);
  const run = useRef(0); // bumped on every play / stop so an old reading can't keep going
  const poem = POEMS.find((p) => p.id === poemId);

  function stop() {
    run.current += 1;
    stopSounds();
    setActive(-1);
  }

  useEffect(() => () => {
    run.current += 1;
    stopSounds();
  }, []);

  function readFrom(i, id, lg) {
    const lines = POEMS.find((p) => p.id === id).lines;
    if (i >= lines.length) return setActive(-1);
    setActive(i);
    const myRun = run.current;
    speak(lines[i][lg], { lang: lg === "en" ? "en-US" : "hi-IN", rate: 0.8, onEnd: () => run.current === myRun && readFrom(i + 1, id, lg) });
  }

  function play() {
    stop();
    readFrom(0, poemId, lang);
  }

  const emoji = active >= 0 ? poem.lines[active].emoji : "🎶";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <div className="flex flex-wrap gap-2">
          {POEMS.map((p) => (
            <button key={p.id} type="button" onClick={() => { stop(); setPoemId(p.id); }} aria-pressed={p.id === poemId} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${p.id === poemId ? "bg-navy-900 text-paper-50" : "bg-paper-100 text-navy-900 hover:bg-saffron-100"}`}>
              {p.title.en}
            </button>
          ))}
        </div>
        <div className="mt-4 flex gap-2" role="group" aria-label="Language">
          {[["en", "English"], ["hi", "हिन्दी"]].map(([id, label]) => (
            <button key={id} type="button" onClick={() => { stop(); setLang(id); }} aria-pressed={lang === id} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${lang === id ? "bg-saffron-500 text-navy-950" : "bg-paper-100 text-navy-900 hover:bg-saffron-100"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="mt-8 flex h-56 items-center justify-center rounded-2xl bg-gradient-to-t from-sky-200 to-sky-50">
          <span key={`${poemId}-${active}`} className="animate-pop text-8xl" aria-hidden="true">{emoji}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-900/10 bg-paper-100 p-6 md:p-8">
        <h2 className="font-display text-2xl font-semibold text-navy-900">{poem.title[lang]}</h2>
        <ol className="mt-5 space-y-2">
          {poem.lines.map((l, i) => (
            <li key={l.en} className={`rounded-lg px-4 py-2 text-xl leading-relaxed transition-colors duration-300 ${i === active ? "bg-yellow-200 font-semibold text-navy-950" : "text-ink-900/80"}`}>
              {l[lang]}
            </li>
          ))}
        </ol>
        <div className="mt-6 flex gap-3">
          <button type="button" onClick={play} className="rounded-full bg-saffron-500 px-6 py-2.5 font-semibold text-navy-950 transition-colors hover:bg-saffron-600">
            ▶ Play
          </button>
          <button type="button" onClick={stop} className="rounded-full border-2 border-navy-900 px-6 py-2.5 font-semibold text-navy-900 transition-colors hover:bg-navy-900 hover:text-paper-50">
            ■ Stop
          </button>
        </div>
      </div>
    </div>
  );
}
