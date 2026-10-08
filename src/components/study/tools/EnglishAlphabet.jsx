import { useState } from "react";
import { ENGLISH_LETTERS } from "../../../data/study/englishLetters";
import { playSound, studyAsset } from "../../../utils/study";

// A to Z: tap a letter to hear it and see its picture word.
export default function EnglishAlphabet() {
  const [index, setIndex] = useState(0);
  const item = ENGLISH_LETTERS[index];

  function choose(i) {
    setIndex(i);
    playSound(`english/audio/${ENGLISH_LETTERS[i].audio}`);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="order-last grid grid-cols-5 gap-3 sm:grid-cols-7 lg:order-first">
        {ENGLISH_LETTERS.map((l, i) => (
          <button
            key={l.letter}
            type="button"
            onClick={() => choose(i)}
            aria-pressed={i === index}
            className={`aspect-square rounded-xl font-display text-2xl font-semibold shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
              i === index ? "bg-saffron-500 text-navy-950" : "bg-navy-900 text-paper-50 hover:bg-navy-700"
            }`}
          >
            {l.letter}
          </button>
        ))}
      </div>

      <div className="h-fit rounded-2xl border border-navy-900/10 bg-paper-100 p-8 text-center lg:sticky lg:top-24">
        <p className="font-display text-7xl font-semibold text-navy-900">
          {item.letter}
          <span className="text-saffron-600">{item.letter.toLowerCase()}</span>
        </p>
        <p className="mt-2 text-xl font-medium text-ink-900">
          {item.letter} for {item.word}
        </p>
        <img
          key={item.letter}
          src={studyAsset(`english/img/${item.img}`)}
          alt={item.word}
          className="mx-auto mt-5 h-48 w-48 animate-pop object-contain"
        />
        <div className="mt-6 flex justify-center gap-3">
          <button type="button" onClick={() => choose((index + ENGLISH_LETTERS.length - 1) % ENGLISH_LETTERS.length)} className="rounded-full border-2 border-navy-900 px-5 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900 hover:text-paper-50">
            ← Back
          </button>
          <button type="button" onClick={() => choose(index)} className="rounded-full bg-saffron-500 px-5 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-saffron-600">
            🔊 Again
          </button>
          <button type="button" onClick={() => choose((index + 1) % ENGLISH_LETTERS.length)} className="rounded-full bg-navy-900 px-5 py-2 text-sm font-semibold text-paper-50 transition-colors hover:bg-saffron-600">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
