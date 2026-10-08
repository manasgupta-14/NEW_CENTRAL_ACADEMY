import { managerApi } from "../api/managerApi";
import { useManagerData } from "../hooks/useManagerData";
import PageHeader from "../components/common/PageHeader";
import DataState from "../components/common/DataState";
import OverviewStats from "../components/dashboard/OverviewStats";
import SchoolOverviewCard from "../components/dashboard/SchoolOverviewCard";
import FeeCollectionCard from "../components/dashboard/FeeCollectionCard";
import ClassWiseStudents from "../components/dashboard/ClassWiseStudents";
import RecentStaffHistory from "../components/dashboard/RecentStaffHistory";

export default function DashboardPage() {
  const { data, loading, error, reload } = useManagerData(managerApi.overview);
  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  return (
    <>
      <PageHeader title="Manager Dashboard" subtitle="Manage school staff, principals, students and financial overview." />
      <OverviewStats staff={data.staff} students={data.students} fees={data.fees} />

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <SchoolOverviewCard students={data.students} fees={data.fees} />
        <FeeCollectionCard fees={data.fees} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ClassWiseStudents classWise={data.students.classWise} />
        <RecentStaffHistory items={data.recentHistory} />
      </div>
    </>
  );
}
