import { useState } from "react";
import { speak, studyAsset } from "../../../utils/study";

// Multiplication tables from..to. Tap a line to hear it.
export default function Tables({ from = 1, to = 20 }) {
  const numbers = Array.from({ length: to - from + 1 }, (_, i) => from + i);
  const [n, setN] = useState(from);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {numbers.map((x) => (
          <button
            key={x}
            type="button"
            onClick={() => setN(x)}
            aria-pressed={x === n}
            className={`h-12 min-w-12 rounded-xl px-3 font-display text-xl font-semibold transition-colors ${x === n ? "bg-saffron-500 text-navy-950" : "bg-paper-100 text-navy-900 hover:bg-saffron-100"}`}
          >
            {x}
          </button>
        ))}
      </div>

      <div
        className="overflow-hidden rounded-2xl bg-navy-900 bg-cover bg-center"
        style={{ backgroundImage: `url(${studyAsset("table-bg.jpg")})` }}
      >
        <div className="bg-navy-950/70 px-6 py-8 text-center text-paper-50 md:py-10">
          <h2 className="font-display text-3xl font-semibold">Table of {n}</h2>
          <ul className="mx-auto mt-6 max-w-sm space-y-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => speak(`${n} times ${i} is ${n * i}`)}
                  className="w-full rounded-xl px-4 py-2 font-display text-2xl transition-colors hover:bg-paper-50/15"
                >
                  {n} × {i} = <span className="font-semibold text-saffron-500">{n * i}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
