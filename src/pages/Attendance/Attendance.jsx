import PortalLookup from "../../components/forms/PortalLookup";
import { ICONS } from "../../data/icons";
import { CLASS_OPTIONS } from "../../data/values";

function AttendanceData({ data }) {
  return (
    <div className="grid gap-4">
      <div className="rounded-2xl bg-paper-50 p-4 text-center">
        <div className="font-display text-3xl font-semibold text-navy-900">{data.percent}%</div>
        <div className="text-xs text-ink-900/55">attendance over {data.days} school days</div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        {[["Present", data.present], ["Absent", data.absent], ["Leave", data.leave]].map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-paper-50 p-3">
            <div className="font-display text-lg font-semibold text-navy-900">{v}</div>
            <div className="text-xs text-ink-900/55">{k}</div>
          </div>
        ))}
      </div>
      {data.days === 0 && <p className="text-sm text-ink-900/60">No attendance has been marked yet.</p>}
    </div>
  );
}

function Attendance() {
  return (
    <PortalLookup
      title="Attendance"
      icon={ICONS.calendar}
      intro="See how regularly your child has been attending school."
      submitLabel="View attendance"
      help="If you notice a mistake in your child's attendance, tell the class teacher or call the school office."
      endpoint="attendance"
      renderData={(data) => <AttendanceData data={data} />}
      fields={[
        { label: "Admission number", name: "admissionNo", placeholder: "e.g. NCA-1024" },
        { label: "Class", name: "className", as: "select", options: CLASS_OPTIONS },
        { label: "Date of birth", name: "dob", type: "date" },
      ]}
    />
  );
}

export default Attendance;
