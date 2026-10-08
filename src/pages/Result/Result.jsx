import PortalLookup from "../../components/forms/PortalLookup";
import { ICONS } from "../../data/icons";
import { CLASS_OPTIONS } from "../../data/values";

function ResultData({ data }) {
  if (data.results.length === 0) return <p className="text-sm text-ink-900/60">No results have been published yet.</p>;
  return (
    <div className="grid gap-5">
      {data.results.map((r) => (
        <div key={r.id} className="rounded-2xl border border-navy-900/10 bg-paper-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display font-semibold text-navy-900">{r.exam}</h3>
            <span className="text-sm font-medium text-saffron-600">{r.total}/{r.outOf} &middot; {r.percent}%</span>
          </div>
          <ul className="mt-3 grid gap-1.5 text-sm">
            {r.subjects.map((s) => (
              <li key={s.subject} className="flex justify-between text-ink-900/75"><span>{s.subject}</span><span>{s.marks}/{s.outOf}</span></li>
            ))}
          </ul>
          {r.remark && <p className="mt-3 text-sm text-ink-900/60">{r.remark}</p>}
        </div>
      ))}
    </div>
  );
}

function Result() {
  return (
    <PortalLookup
      title="Results"
      icon={ICONS.award}
      intro="Find exam results using the admission number and date of birth."
      submitLabel="Show result"
      help="Result sheets are also handed out at the school after every exam. Call the office if you need a copy."
      endpoint="result"
      renderData={(data) => <ResultData data={data} />}
      fields={[
        { label: "Admission number", name: "admissionNo", placeholder: "e.g. NCA-1024" },
        { label: "Class", name: "className", as: "select", options: CLASS_OPTIONS },
        { label: "Date of birth", name: "dob", type: "date" },
      ]}
    />
  );
}

export default Result;
