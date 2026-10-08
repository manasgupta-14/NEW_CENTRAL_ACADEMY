import PortalLookup from "../../components/forms/PortalLookup";
import { ICONS } from "../../data/icons";
import { CLASS_OPTIONS } from "../../data/values";

const rs = (n) => `\u20B9${Number(n).toLocaleString("en-IN")}`;
const day = (d) => (d ? new Date(d).toLocaleDateString("en-IN") : "-");

function FeeData({ data }) {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-3 gap-3 text-center">
        {[["Total", data.total], ["Paid", data.paid], ["Due", data.due]].map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-paper-50 p-3">
            <div className="text-xs text-ink-900/55">{k}</div>
            <div className={`font-display text-lg font-semibold ${k === "Due" && v > 0 ? "text-maroon-700" : "text-navy-900"}`}>{rs(v)}</div>
          </div>
        ))}
      </div>
      {data.entries.length === 0 && <p className="text-sm text-ink-900/60">No fee entries added yet.</p>}
      <ul className="grid gap-2">
        {data.entries.map((f) => (
          <li key={f._id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-navy-900/10 bg-paper-50 px-4 py-3 text-sm">
            <span className="font-medium text-navy-900">{f.title}</span>
            <span className="text-ink-900/70">{rs(f.paid)} / {rs(f.amount)}{f.paid >= f.amount ? ` \u00B7 Paid ${day(f.paidOn)}` : f.dueDate ? ` \u00B7 Due ${day(f.dueDate)}` : ""}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Fee() {
  return (
    <PortalLookup
      title="Fee details"
      icon={ICONS.wallet}
      intro="Check your child's fee status using the admission number."
      submitLabel="Check fee"
      help="For fee structure, dues or receipts, please contact the school office during working hours."
      endpoint="fee"
      renderData={(data) => <FeeData data={data} />}
      fields={[
        { label: "Admission number", name: "admissionNo", placeholder: "e.g. NCA-1024" },
        { label: "Class", name: "className", as: "select", options: CLASS_OPTIONS },
        { label: "Date of birth", name: "dob", type: "date" },
      ]}
    />
  );
}

export default Fee;
