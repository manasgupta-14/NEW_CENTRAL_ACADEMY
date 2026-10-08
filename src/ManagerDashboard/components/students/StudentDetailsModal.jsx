import { useState } from "react";
import { BookOpen, CalendarDays, CheckCircle2, GraduationCap, IdCard, IndianRupee, Mail, Phone, RefreshCcw, ShieldCheck, TrendingUp, UserRound, Wallet } from "lucide-react";
import { managerApi } from "../../api/managerApi";
import Modal from "../common/Modal";
import Avatar from "../common/Avatar";
import ProfileItem from "../common/ProfileItem";
import ActionButton from "../common/ActionButton";
import InlineError from "../common/InlineError";
import StatusBadge from "../common/StatusBadge";
import { formatCurrency, formatDate, formatPercent, STATUS_LABELS } from "../../utils/format";

export default function StudentDetailsModal({ student, onClose, onChanged }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");

  const passedOut = student.status === "passed-out";

  const toggleStatus = async () => {
    setBusy(true);
    setError("");
    try {
      await managerApi.setStudentStatus(student.id, passedOut ? "current" : "passed-out");
      onChanged();
      onClose();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const pay = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await managerApi.recordPayment(student.id, Number(amount));
      setAmount("");
      onChanged(); // student ka naya data aane par modal khud update ho jaata hai
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal title="Student Details" subtitle="Complete student information" onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center gap-4">
          <Avatar name={student.name} size="lg" tone="purple" />
          <div className="flex-1">
            <h3 className="text-xl font-bold">{student.name}</h3>
            <p className="text-sm text-slate-500">
              {student.className}{student.rollNo ? ` • Roll No. ${student.rollNo}` : ""}
            </p>
          </div>
          <StatusBadge status={student.feeStatus} />
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <ProfileItem icon={UserRound} label="Father's Name" value={student.fatherName} />
          <ProfileItem icon={UserRound} label="Mother's Name" value={student.motherName} />
          <ProfileItem icon={Phone} label="Mobile Number" value={student.phone} />
          <ProfileItem icon={Mail} label="Email" value={student.email} />
          <ProfileItem icon={IdCard} label="Student ID" value={student.studentId} />
          <ProfileItem icon={BookOpen} label="Class" value={student.className} />
          <ProfileItem icon={CalendarDays} label="Date of Birth" value={formatDate(student.dob)} />
          <ProfileItem icon={UserRound} label="Gender" value={student.gender} />
          <ProfileItem icon={TrendingUp} label="Attendance" value={formatPercent(student.attendancePercent)} />
          <ProfileItem icon={GraduationCap} label={student.lastExam ? `Result (${student.lastExam})` : "Result"} value={formatPercent(student.resultPercent)} />
          <ProfileItem icon={ShieldCheck} label="Student Status" value={STATUS_LABELS[student.status]} />
          {passedOut && student.passedOutOn && <ProfileItem icon={GraduationCap} label="Passed Out On" value={formatDate(student.passedOutOn)} />}
        </div>

        <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h4 className="mb-4 text-sm font-bold text-slate-900">Fee Details</h4>
          <div className="grid gap-5 sm:grid-cols-3">
            <ProfileItem icon={IndianRupee} label="Total Fee" value={formatCurrency(student.totalFee)} />
            <ProfileItem icon={CheckCircle2} label="Paid Fee" value={formatCurrency(student.paidFee)} />
            <ProfileItem icon={Wallet} label="Pending Fee" value={formatCurrency(student.remainingFee)} />
          </div>

          {student.remainingFee > 0 && (
            <form onSubmit={pay} className="mt-5 flex gap-3">
              <input
                type="number"
                min="1"
                max={student.remainingFee}
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount received"
                aria-label="Amount received"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <ActionButton type="submit" disabled={busy} className="shrink-0">Record Payment</ActionButton>
            </form>
          )}
        </div>

        <div className="mt-6"><InlineError message={error} /></div>
        <div className="mt-6 flex justify-end">
          <ActionButton variant="soft" icon={RefreshCcw} onClick={toggleStatus} disabled={busy}>
            {busy ? "Saving..." : passedOut ? "Move back to Current" : "Mark as Passed Out"}
          </ActionButton>
        </div>
      </div>
    </Modal>
  );
}
