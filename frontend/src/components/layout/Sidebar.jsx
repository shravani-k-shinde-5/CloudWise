import {
  LayoutDashboard,
  Server,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Settings,
  Cloud,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Resources",
    path: "/resources",
    icon: Server,
  },
  {
    name: "Costs",
    path: "/costs",
    icon: DollarSign,
  },
  {
    name: "Forecast",
    path: "/forecast",
    icon: TrendingUp,
  },
  {
    name: "Anomalies",
    path: "/anomalies",
    icon: AlertTriangle,
  },
  {
    name: "Recommendations",
    path: "/recommendations",
    icon: Lightbulb,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 bg-slate-900 text-white transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <Cloud size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold">CloudWise</h1>
              <p className="text-xs text-slate-400">
                Cloud Cost Intelligence
              </p>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 p-4">
          <div className="rounded-xl bg-slate-800 p-4">
            <p className="text-xs text-slate-400">AWS Account</p>

            <p className="mt-1 text-sm font-semibold">Connected</p>

            <div className="mt-2 flex items-center gap-2 text-xs text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Live connection
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}