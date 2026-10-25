import { Server, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { resourceHealth } from "../../data/mockData";

export default function ResourceHealth() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Resource Health
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current resource utilization
          </p>
        </div>

        <Link
          to="/resources"
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="space-y-5">
        {resourceHealth.map((resource) => (
          <div
            key={resource.name}
            className="rounded-xl border border-slate-100 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Server size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {resource.name}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {resource.type}
                  </p>
                </div>
              </div>

              <StatusBadge status={resource.status} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-5">
              <UsageBar
                label="CPU"
                value={resource.cpu}
                type="cpu"
              />

              <UsageBar
                label="Memory"
                value={resource.memory}
                type="memory"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Healthy: "bg-green-100 text-green-700",
    Underutilized: "bg-amber-100 text-amber-700",
    Idle: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function UsageBar({ label, value, type }) {
  const barColor =
    type === "cpu" ? "bg-blue-500" : "bg-purple-500";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">
          {label}
        </span>

        <span className="text-xs font-semibold text-slate-700">
          {value}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}