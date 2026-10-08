import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { BASE_PATH } from "../../config/navigation";
import { useManagerSession } from "../../hooks/useManagerSession";
import Avatar from "../common/Avatar";

export default function Topbar({ onMenu }) {
  const { user } = useManagerSession();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} aria-label="Open menu" className="rounded-xl p-2 hover:bg-slate-100 lg:hidden">
          <Menu size={22} />
        </button>
        <div>
          <p className="text-xs text-slate-400">Welcome back</p>
          <p className="font-semibold text-slate-800">{user?.name || "Manager"}</p>
        </div>
      </div>

      <Link to={`${BASE_PATH}/profile`} title="My Profile" className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-slate-100">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-bold">{user?.name || "Manager"}</p>
          <p className="text-xs text-slate-500">Manager</p>
        </div>
        <Avatar name={user?.name} />
      </Link>
    </header>
  );
}
