import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

// Sidebar + Topbar + page. School ka Navbar/Footer yahan nahi aata (route Layout ke bahar hai).
// Manager, Principal aur Teacher dashboard teeno yahi layout use karte hain; farq sirf `panel` config ka hai.
export default function DashboardLayout({ panel }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const previous = document.title;
    document.title = `${panel.title} | New Central Academy`;
    return () => {
      document.title = previous;
    };
  }, [panel.title]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden" />}
      <Sidebar panel={panel} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-[270px]">
        <Topbar panel={panel} onMenu={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
