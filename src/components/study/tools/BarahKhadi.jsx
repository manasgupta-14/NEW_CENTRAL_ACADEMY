import { useState } from "react";
import { playSound, speak } from "../../../utils/study";

// Swar (with recorded audio), vyanjan, and the 12 forms (barah khadi) of every consonant.
const SWAR = [
  ["अ", "a", "a"], ["आ", "aa", "aa"], ["इ", "i", "i"], ["ई", "ee", "ee"], ["उ", "u", "u"], ["ऊ", "oo", "oo"],
  ["ए", "e", "e"], ["ऐ", "ai", "ai"], ["ओ", "o", "o"], ["औ", "au", "au"], ["अं", "am", "am"], ["अः", "ah", "ah"],
];
const MATRAS = [
  ["", "a"], ["ा", "aa"], ["ि", "i"], ["ी", "ee"], ["ु", "u"], ["ू", "oo"],
  ["े", "e"], ["ै", "ai"], ["ो", "o"], ["ौ", "au"], ["ं", "am"], ["ः", "ah"],
];
const VYANJAN = [
  ["क", "k"], ["ख", "kh"], ["ग", "g"], ["घ", "gh"], ["च", "ch"], ["छ", "chh"], ["ज", "j"], ["झ", "jh"],
  ["ट", "T"], ["ठ", "Th"], ["ड", "D"], ["ढ", "Dh"], ["ण", "N"], ["त", "t"], ["थ", "th"], ["द", "d"],
  ["ध", "dh"], ["न", "n"], ["प", "p"], ["फ", "ph"], ["ब", "b"], ["भ", "bh"], ["म", "m"], ["य", "y"],
  ["र", "r"], ["ल", "l"], ["व", "v"], ["श", "sh"], ["ष", "shh"], ["स", "s"], ["ह", "h"], ["क्ष", "ksh"], ["ज्ञ", "gy"],
];
const TABS = [
  { id: "swar", label: "स्वर" },
  { id: "vyanjan", label: "व्यंजन" },
  { id: "khadi", label: "बारहखड़ी" },
];

const say = (text) => speak(text, { lang: "hi-IN", rate: 0.7 });

export default function BarahKhadi() {
  const [tab, setTab] = useState("swar");
  const [consonant, setConsonant] = useState(VYANJAN[0]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-6 py-2 text-lg font-semibold transition-colors ${tab === t.id ? "bg-navy-900 text-paper-50" : "bg-paper-100 text-navy-900 hover:bg-saffron-100"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "swar" && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {SWAR.map(([l, roman, file]) => (
            <button key={l} type="button" onClick={() => playSound(`hindi/swar/${file}.mp3`)} className="rounded-2xl bg-navy-900 py-5 text-paper-50 shadow-sm transition-all hover:-translate-y-1 hover:bg-saffron-600 hover:shadow-md">
              <span className="block text-4xl font-semibold">{l}</span>
              <span className="mt-1 block text-sm text-paper-50/70">{roman}</span>
            </button>
          ))}
        </div>
      )}

      {tab === "vyanjan" && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-8">
          {VYANJAN.map(([l, roman]) => (
            <button key={l} type="button" onClick={() => say(l)} className="rounded-2xl bg-navy-900 py-4 text-paper-50 shadow-sm transition-all hover:-translate-y-1 hover:bg-saffron-600 hover:shadow-md">
              <span className="block text-3xl font-semibold">{l}</span>
              <span className="mt-1 block text-xs text-paper-50/70">{roman}</span>
            </button>
          ))}
        </div>
      )}

      {tab === "khadi" && (
        <div>
          <p className="mb-3 text-sm text-ink-900/65">पहले अक्षर चुनो, फिर उसकी बारह मात्राएँ सुनो।</p>
          <div className="mb-8 flex flex-wrap gap-2">
            {VYANJAN.map((c) => (
              <button
                key={c[0]}
                type="button"
                onClick={() => setConsonant(c)}
                aria-pressed={c === consonant}
                className={`h-12 min-w-12 rounded-lg px-3 text-xl font-semibold transition-colors ${c === consonant ? "bg-saffron-500 text-navy-950" : "bg-paper-100 text-navy-900 hover:bg-saffron-100"}`}
              >
                {c[0]}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {MATRAS.map(([m, vowel]) => {
              const form = consonant[0] + m;
              return (
                <button key={vowel} type="button" onClick={() => say(form)} className="rounded-2xl border border-navy-900/10 bg-paper-100 py-5 transition-all hover:-translate-y-1 hover:bg-saffron-100 hover:shadow-md">
                  <span className="block text-4xl font-semibold text-navy-900">{form}</span>
                  <span className="mt-1 block text-sm text-ink-900/60">{consonant[1] + (vowel === "a" ? "a" : vowel)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
