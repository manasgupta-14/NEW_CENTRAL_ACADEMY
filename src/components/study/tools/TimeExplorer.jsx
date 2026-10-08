import { useEffect, useState } from "react";
import { speak } from "../../../utils/study";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const pad = (n) => String(n).padStart(2, "0");
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const dayOfYear = (d) => Math.round((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(d.getFullYear(), 0, 0)) / 86400000);

function isoWeek(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = Date.UTC(date.getUTCFullYear(), 0, 1);
  return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
}

function Hand({ deg, length, width, color }) {
  return <div className="absolute bottom-1/2 left-1/2 origin-bottom rounded-full" style={{ width, height: length, background: color, transform: `translateX(-50%) rotate(${deg}deg)` }} />;
}

function Fact({ title, big, lines = [] }) {
  return (
    <div className="rounded-xl border border-navy-900/10 bg-paper-50 p-4">
      <h3 className="text-sm font-semibold text-ink-900/60">{title}</h3>
      {big && <p className="mt-1 font-display text-2xl font-semibold text-navy-900">{big}</p>}
      {lines.map((l) => <p key={l} className="mt-1 text-sm text-ink-900/70">{l}</p>)}
    </div>
  );
}

// Live clock + calendar facts (day, week, month, year, leap year).
export default function TimeExplorer() {
  const [now, setNow] = useState(() => new Date());
  const [use24, setUse24] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
  const y = now.getFullYear();
  const dim = new Date(y, now.getMonth() + 1, 0).getDate();
  const doy = dayOfYear(now);
  const leapYearsSoFar = Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
  const digital = `${pad(use24 ? h : h % 12 || 12)}:${pad(m)}:${pad(s)}${use24 ? "" : h >= 12 ? " PM" : " AM"}`;
  const dateText = `${now.getDate()} ${MONTHS[now.getMonth()]} ${y}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <div className="h-fit rounded-2xl border border-navy-900/10 bg-paper-100 p-6 text-center">
        <p className="font-display text-4xl font-semibold tabular-nums text-navy-900">{digital}</p>
        <p className="mt-1 text-sm text-ink-900/60">Aapke device ka time</p>

        <div className="relative mx-auto mt-5 h-60 w-60 rounded-full border-8 border-navy-900/10 bg-white" role="img" aria-label={`Clock showing ${digital}`}>
          {Array.from({ length: 12 }, (_, i) => {
            const a = ((i + 1) * 30 * Math.PI) / 180;
            return (
              <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-navy-900" style={{ left: `${50 + 40 * Math.sin(a)}%`, top: `${50 - 40 * Math.cos(a)}%` }}>
                {i + 1}
              </span>
            );
          })}
          <Hand deg={((h % 12) + m / 60 + s / 3600) * 30} length="28%" width={6} color="#16233f" />
          <Hand deg={(m + s / 60) * 6} length="38%" width={4} color="#2a3c68" />
          <Hand deg={s * 6} length="42%" width={2} color="#d97a1a" />
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-900" />
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => setUse24(false)} aria-pressed={!use24} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${!use24 ? "bg-navy-900 text-paper-50" : "bg-paper-50 text-navy-900 hover:bg-saffron-100"}`}>12-hour</button>
          <button type="button" onClick={() => setUse24(true)} aria-pressed={use24} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${use24 ? "bg-navy-900 text-paper-50" : "bg-paper-50 text-navy-900 hover:bg-saffron-100"}`}>24-hour</button>
          <button type="button" onClick={() => speak(`Current time is ${h} hours ${m} minutes. Today is ${DAYS[now.getDay()]}, ${dateText}.`, { lang: "en-IN", rate: 0.9 })} className="rounded-full bg-saffron-500 px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-saffron-600">
            🔊 Speak
          </button>
        </div>
      </div>

      <div className="grid h-fit gap-4 sm:grid-cols-2">
        <Fact title="Today" big={DAYS[now.getDay()]} lines={[dateText]} />
        <Fact title="Week & counting" big={`Week ${isoWeek(now)}`} lines={[`Day ${doy} of the year`]} />
        <Fact title="Month" big={MONTHS[now.getMonth()]} lines={[`${dim} days`, `${dim - now.getDate()} days left`]} />
        <Fact title="Year" big={String(y)} lines={[isLeap(y) ? "Leap year" : "Not a leap year", `${(isLeap(y) ? 366 : 365) - doy} days left`]} />
        <Fact title="Time" lines={["1 day = 24 hours", "1 hour = 60 minutes", "1 minute = 60 seconds"]} />
        <Fact title="Weeks" lines={["1 week = 7 days", "1 month ≈ 4 weeks", "1 year = 52 weeks + 1 day"]} />
        <Fact title="Leap years so far" big={String(leapYearsSoFar)} lines={["Leap years from year 1 till now"]} />
      </div>
    </div>
  );
}
