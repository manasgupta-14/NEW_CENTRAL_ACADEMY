import { useState } from "react";
import { HINDI_LETTERS } from "../../../data/study/hindiLetters";
import { playSound, speak, studyAsset } from "../../../utils/study";

const TABS = [
  { id: "swar", label: "स्वर" },
  { id: "vyanjan", label: "व्यंजन" },
];

// अक्षर ज्ञान. `groups` limits which letters are shown (Playway uses only ["swar"]).
export default function AksharGyan({ groups = ["swar", "vyanjan"] }) {
  const tabs = TABS.filter((t) => groups.includes(t.id));
  const [tab, setTab] = useState(tabs[0].id);
  const letters = HINDI_LETTERS.filter((l) => l.group === tab);
  const [selected, setSelected] = useState(letters[0]);
  const item = letters.includes(selected) ? selected : letters[0];

  function choose(l) {
    setSelected(l);
    if (l.audio) playSound(`hindi/audio/${l.audio}`);
    else if (l.word) speak(l.word, { lang: "hi-IN", rate: 0.75 });
  }

  function switchTab(id) {
    setTab(id);
    setSelected(HINDI_LETTERS.find((l) => l.group === id));
  }

  return (
    <div>
      {tabs.length > 1 && (
        <div className="mb-6 flex gap-3" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => switchTab(t.id)}
              className={`rounded-full px-6 py-2 text-lg font-semibold transition-colors ${tab === t.id ? "bg-navy-900 text-paper-50" : "bg-paper-100 text-navy-900 hover:bg-saffron-100"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="order-last grid grid-cols-4 gap-3 sm:grid-cols-6 lg:order-first">
          {letters.map((l) => (
            <button
              key={l.letter}
              type="button"
              onClick={() => choose(l)}
              aria-pressed={l === item}
              className={`aspect-square rounded-xl text-3xl font-semibold shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                l === item ? "bg-saffron-500 text-navy-950" : "bg-navy-900 text-paper-50 hover:bg-navy-700"
              }`}
            >
              {l.letter}
            </button>
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-navy-900/10 bg-paper-100 p-8 text-center lg:sticky lg:top-24">
          <p className="text-8xl font-semibold leading-tight text-navy-900">{item.letter}</p>
          <p className="mt-2 text-2xl font-medium text-ink-900">
            {item.word ? `${item.letter} से ${item.word}` : "इस अक्षर का चित्र शब्द नहीं है"}
          </p>
          {item.img && (
            <img key={item.letter} src={studyAsset(`hindi/img/${item.img}`)} alt={item.word} className="mx-auto mt-5 h-48 w-48 animate-pop object-contain" />
          )}
          <button type="button" onClick={() => choose(item)} className="mt-6 rounded-full bg-saffron-500 px-6 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-saffron-600">
            🔊 फिर से सुनो
          </button>
        </div>
      </div>
    </div>
  );
}
