import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useManagerSession } from "../../hooks/useManagerSession";
import Avatar from "../common/Avatar";

// panel = { roleLabel, profilePath }. profilePath ho to naam par click se My Profile khulta hai.
export default function Topbar({ panel, onMenu }) {
  const { displayName } = useManagerSession();
  const fallback = panel.roleLabel;

  const who = (
    <>
      <div className="hidden text-right sm:block">
        <p className="text-sm font-bold">{displayName || fallback}</p>
        <p className="text-xs text-slate-500">{panel.roleLabel}</p>
      </div>
      <Avatar name={displayName} />
    </>
  );

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} aria-label="Open menu" className="rounded-xl p-2 hover:bg-slate-100 lg:hidden">
          <Menu size={22} />
        </button>
        <div>
          <p className="text-xs text-slate-400">Welcome back</p>
          <p className="font-semibold text-slate-800">{displayName || fallback}</p>
        </div>
      </div>

      {panel.profilePath ? (
        <Link to={panel.profilePath} title="My Profile" className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-slate-100">
          {who}
        </Link>
      ) : (
        <div className="flex items-center gap-3 p-1.5">{who}</div>
      )}
    </header>
  );
}
