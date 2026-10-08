import { useState } from "react";

// factor = how many base units (metre / gram / litre) one of this unit equals
const CATEGORIES = {
  length: {
    label: "Length",
    units: { millimetre: 0.001, centimetre: 0.01, decimetre: 0.1, metre: 1, decametre: 10, hectometre: 100, kilometre: 1000, inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.344 },
  },
  weight: {
    label: "Weight & Mass",
    units: { milligram: 0.001, centigram: 0.01, decigram: 0.1, gram: 1, decagram: 10, hectogram: 100, kilogram: 1000, quintal: 100000, tonne: 1000000 },
  },
  volume: {
    label: "Liquid / Volume",
    units: { millilitre: 0.001, centilitre: 0.01, decilitre: 0.1, litre: 1, decalitre: 10, hectolitre: 100, kilolitre: 1000 },
  },
};

const fmt = (n) => n.toLocaleString("en-IN", { maximumSignificantDigits: 10 });

// Length / weight / volume converter.
export default function UnitConverter() {
  const [cat, setCat] = useState("length");
  const units = Object.keys(CATEGORIES[cat].units);
  const [from, setFrom] = useState("metre");
  const [to, setTo] = useState("centimetre");
  const [value, setValue] = useState("1");

  function switchCat(c) {
    const u = Object.keys(CATEGORIES[c].units);
    setCat(c);
    setFrom(u[3]);
    setTo(u[0]);
  }

  const table = CATEGORIES[cat].units;
  const num = parseFloat(value);
  const result = Number.isFinite(num) ? (num * table[from]) / table[to] : null;

  const select = "w-full rounded-xl border-2 border-navy-900/15 bg-paper-50 px-3 py-3 outline-none focus:border-saffron-500";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        {Object.entries(CATEGORIES).map(([id, c]) => (
          <button key={id} type="button" role="tab" aria-selected={cat === id} onClick={() => switchCat(id)} className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${cat === id ? "bg-navy-900 text-paper-50" : "bg-paper-100 text-navy-900 hover:bg-saffron-100"}`}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-navy-900/10 bg-paper-100 p-6 md:p-8">
        <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <label className="block text-sm font-medium text-ink-900/70">
            Value
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className={`${select} mt-1 text-lg`} />
          </label>
          <span className="hidden pb-3 text-2xl text-ink-900/40 sm:block" aria-hidden="true">→</span>
          <span className="hidden sm:block" />
          <label className="block text-sm font-medium text-ink-900/70">
            From
            <select value={from} onChange={(e) => setFrom(e.target.value)} className={`${select} mt-1`}>
              {units.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </label>
          <button type="button" onClick={() => { setFrom(to); setTo(from); }} aria-label="Swap units" className="mb-0.5 rounded-full bg-navy-900 px-4 py-3 text-paper-50 transition-colors hover:bg-saffron-600">⇄</button>
          <label className="block text-sm font-medium text-ink-900/70">
            To
            <select value={to} onChange={(e) => setTo(e.target.value)} className={`${select} mt-1`}>
              {units.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </label>
        </div>

        <p className="mt-8 rounded-xl bg-navy-900 px-5 py-5 text-center font-display text-2xl text-paper-50" aria-live="polite">
          {result === null ? "Number likho" : <>{fmt(num)} {from} = <span className="font-semibold text-saffron-500">{fmt(result)}</span> {to}</>}
        </p>
      </div>
    </div>
  );
}
