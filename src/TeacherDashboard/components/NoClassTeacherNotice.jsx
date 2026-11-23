import InfoNotice from "../../ManagerDashboard/components/common/InfoNotice";

// Jis teacher ko abhi class teacher nahi banaya gaya, use attendance / fees nahi dikhte.
export default function NoClassTeacherNotice({ what }) {
  return (
    <InfoNotice tone="amber">
      {what} is available only to a class teacher. You have not been made a class teacher of any class yet. Please ask the Principal or Manager to assign you a class.
    </InfoNotice>
  );
}
