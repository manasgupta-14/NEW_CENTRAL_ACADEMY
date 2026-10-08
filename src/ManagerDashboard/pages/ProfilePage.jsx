import { useState } from "react";
import { CalendarDays, CheckCircle2, Mail, Pencil, Phone, Save, ShieldCheck, UserRound } from "lucide-react";
import { managerApi } from "../api/managerApi";
import { useManagerData } from "../hooks/useManagerData";
import { useManagerSession } from "../hooks/useManagerSession";
import { PROFILE_FORM } from "../config/forms";
import { formatDate } from "../utils/format";
import PageHeader from "../components/common/PageHeader";
import DataState from "../components/common/DataState";
import ActionButton from "../components/common/ActionButton";
import Avatar from "../components/common/Avatar";
import ProfileItem from "../components/common/ProfileItem";
import EntityFormModal from "../components/common/EntityFormModal";

// Manager apni personal detail yahan dekh aur badal sakta hai. Account delete karne ka option yahan nahi hai.
export default function ProfilePage() {
  const { data, loading, error, reload } = useManagerData(managerApi.profile);
  const { updateUser } = useManagerSession();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!data) return <DataState loading={loading} error={error} onRetry={reload} />;

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="View and update your personal details."
        action={
          <ActionButton
            icon={Pencil}
            onClick={() => {
              setSaved(false);
              setEditing(true);
            }}
          >
            Edit Details
          </ActionButton>
        }
      />

      {saved && (
        <p role="status" className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          <CheckCircle2 size={18} /> Your details have been updated.
        </p>
      )}

      <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar name={data.name} size="lg" />
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold text-slate-900">{data.name}</h2>
            <p className="text-sm text-slate-500">{data.role}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <ProfileItem icon={UserRound} label="Full Name" value={data.name} />
          <ProfileItem icon={Mail} label="Email" value={data.email} />
          <ProfileItem icon={Phone} label="Phone" value={data.phone} />
          <ProfileItem icon={ShieldCheck} label="Role" value={data.role} />
          <ProfileItem icon={CalendarDays} label="Account Created" value={formatDate(data.createdAt)} />
        </div>

        <p className="mt-6 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
          Your own account cannot be deleted from here. Use your email to log in, so make sure it stays correct.
        </p>
      </div>

      {editing && (
        <EntityFormModal
          title="Edit My Details"
          subtitle="Update your name, email and phone number."
          fields={PROFILE_FORM}
          initialValues={{ name: data.name, email: data.email, phone: data.phone }}
          submitLabel="Save Changes"
          submitIcon={Save}
          onClose={() => setEditing(false)}
          onSubmit={async (values) => {
            const updated = await managerApi.updateProfile(values);
            updateUser({ name: updated.name, email: updated.email, phone: updated.phone });
            setEditing(false);
            setSaved(true);
            reload();
          }}
        />
      )}
    </>
  );
}
