import { AlertTriangle, AlertCircle } from "lucide-react";
import { alerts } from "../../data/mockData";

export default function RecentAlerts() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Alerts
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Issues detected by CloudWise
        </p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex gap-3 rounded-xl border border-slate-100 p-3"
          >
            <div
              className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                alert.severity === "critical"
                  ? "bg-red-100 text-red-600"
                  : "bg-amber-100 text-amber-600"
              }`}
            >
              {alert.severity === "critical" ? (
                <AlertCircle size={18} />
              ) : (
                <AlertTriangle size={18} />
              )}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800">
                {alert.title}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {alert.description}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                {alert.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}