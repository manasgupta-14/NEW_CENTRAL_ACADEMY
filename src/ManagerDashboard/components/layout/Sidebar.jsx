import { Link, NavLink } from "react-router-dom";
import { ChevronRight, ExternalLink, LogOut, X } from "lucide-react";
import logo from "../../../assets/logo.png";
import { SCHOOL } from "../../../data/school";
import { NAV_ITEMS } from "../../config/navigation";
import { useManagerSession } from "../../hooks/useManagerSession";
import Avatar from "../common/Avatar";

const linkClass = ({ isActive }) =>
  `group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
    isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useManagerSession();

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5">
        <Link to="/" className="flex items-center gap-3" title="Back to website">
          <img src={logo} alt="" className="h-11 w-11 object-contain" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-tight text-slate-900">{SCHOOL.name}</p>
            <p className="text-xs text-slate-500">Manager Panel</p>
          </div>
        </Link>
        <button onClick={onClose} aria-label="Close menu" className="rounded-lg p-2 hover:bg-slate-100 lg:hidden">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Main Menu</p>
        <nav className="space-y-1" aria-label="Manager menu">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={onClose} className={linkClass}>
              {({ isActive }) => (
                <>
                  <Icon size={19} />
                  <span className="flex-1">{label}</span>
                  {isActive && <ChevronRight size={16} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <Link to="/" className="mt-6 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
          <ExternalLink size={19} />
          Visit website
        </Link>
      </div>

      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <Avatar name={user?.name} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{user?.name || "Manager"}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
          <button onClick={logout} aria-label="Logout" title="Logout" className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
