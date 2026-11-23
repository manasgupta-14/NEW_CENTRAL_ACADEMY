import { MANAGER_PANEL } from "../../config/navigation";
import DashboardLayout from "./DashboardLayout";

export default function ManagerLayout() {
  return <DashboardLayout panel={MANAGER_PANEL} />;
}
