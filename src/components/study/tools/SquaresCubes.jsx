import { useState } from "react";


// Squares / cubes table for 1-30 + a quick calculator with roots.
export default function SquaresCubes() {
  const [value, setValue] = useState("144");
  const n = parseFloat(value);
  const valid = Number.isFinite(n) && n >= 0;
  const sqrt = valid ? Math.sqrt(n) : 0;
  const cbrt = valid ? Math.cbrt(n) : 0;
  const perfectSquare = valid && Number.isInteger(sqrt);
  const perfectCube = valid && Number.isInteger(Math.round(cbrt)) && Math.round(cbrt) ** 3 === n;
  const show = (x) => (Number.isInteger(x) ? x : Number(x.toFixed(4)));

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="h-fit rounded-2xl border border-navy-900/10 bg-paper-100 p-6">
        <label className="block text-sm font-medium text-ink-900/70">
          Koi number likho
          <input type="number" min="0" value={value} onChange={(e) => setValue(e.target.value)} className="mt-1 w-full rounded-xl border-2 border-navy-900/15 bg-paper-50 px-4 py-3 text-xl outline-none focus:border-saffron-500" />
        </label>
        {valid ? (
          <dl className="mt-6 space-y-3 text-lg" aria-live="polite">
            <div className="flex justify-between"><dt>Square (n²)</dt><dd className="font-semibold text-navy-900">{show(n * n)}</dd></div>
            <div className="flex justify-between"><dt>Cube (n³)</dt><dd className="font-semibold text-navy-900">{show(n ** 3)}</dd></div>
            <div className="flex justify-between"><dt>Square root (√n)</dt><dd className="font-semibold text-navy-900">{show(sqrt)}</dd></div>
            <div className="flex justify-between"><dt>Cube root (∛n)</dt><dd className="font-semibold text-navy-900">{show(cbrt)}</dd></div>
            <p className="pt-2 text-sm text-ink-900/65">
              {perfectSquare ? "✅ Perfect square" : "Perfect square nahi hai"} · {perfectCube ? "✅ Perfect cube" : "Perfect cube nahi hai"}
            </p>
          </dl>
        ) : (
          <p className="mt-6 text-ink-900/60">0 ya usse bada number likho.</p>
        )}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-navy-900/10 bg-paper-100">
        <table className="w-full text-center">
          <thead>
            <tr className="bg-navy-900 text-paper-50">
              <th className="px-4 py-3">n</th><th className="px-4 py-3">n²</th><th className="px-4 py-3">n³</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 30 }, (_, i) => i + 1).map((k) => (
              <tr key={k} className="border-t border-navy-900/10 odd:bg-paper-50/60">
                <td className="px-4 py-2 font-semibold text-navy-900">{k}</td>
                <td className="px-4 py-2">{k * k}</td>
                <td className="px-4 py-2">{k ** 3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
