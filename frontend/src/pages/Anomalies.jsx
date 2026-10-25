import {
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Server,
  Clock,
  DollarSign,
  Search,
} from "lucide-react";

import { useState } from "react";

const anomalies = [
  {
    id: 1,
    resource: "EC2 Development",
    resourceId: "i-003",
    type: "Idle Resource",
    severity: "HIGH",
    cpu: 3,
    duration: "14 days",
    estimatedWaste: 3200,
    description:
      "CPU utilization has remained below 10% for an extended period.",
  },
  {
    id: 2,
    resource: "EC2 Analytics",
    resourceId: "i-002",
    type: "Underutilization",
    severity: "MEDIUM",
    cpu: 18,
    duration: "9 days",
    estimatedWaste: 7200,
    description:
      "Instance capacity appears significantly higher than current workload requirements.",
  },
  {
    id: 3,
    resource: "EC2 API Server",
    resourceId: "i-004",
    type: "Cost Increase",
    severity: "MEDIUM",
    cpu: 58,
    duration: "3 days",
    estimatedWaste: 850,
    description:
      "Resource cost has increased compared with its historical usage pattern.",
  },
  {
    id: 4,
    resource: "EC2 Production",
    resourceId: "i-001",
    type: "Usage Spike",
    severity: "LOW",
    cpu: 72,
    duration: "6 hours",
    estimatedWaste: 0,
    description:
      "CPU utilization temporarily increased above its normal operating range.",
  },
];

export default function Anomalies() {
  const [severity, setSeverity] = useState("All");
  const [search, setSearch] = useState("");

  const filteredAnomalies = anomalies.filter((item) => {
    const matchesSeverity =
      severity === "All" || item.severity === severity;

    const matchesSearch =
      item.resource.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase());

    return matchesSeverity && matchesSearch;
  });

  const highCount = anomalies.filter(
    (item) => item.severity === "HIGH"
  ).length;

  const mediumCount = anomalies.filter(
    (item) => item.severity === "MEDIUM"
  ).length;

  const estimatedWaste = anomalies.reduce(
    (total, item) => total + item.estimatedWaste,
    0
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Anomalies & Alerts
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          AI-detected unusual usage patterns and potential
          cloud cost issues.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          icon={AlertTriangle}
          title="Total Anomalies"
          value={anomalies.length}
          subtitle="Detected by CloudWise"
          iconClass="bg-red-100 text-red-600"
        />

        <SummaryCard
          icon={AlertCircle}
          title="High Severity"
          value={highCount}
          subtitle="Requires attention"
          iconClass="bg-red-100 text-red-600"
        />

        <SummaryCard
          icon={Clock}
          title="Medium Severity"
          value={mediumCount}
          subtitle="Should be reviewed"
          iconClass="bg-amber-100 text-amber-600"
        />

        <SummaryCard
          icon={DollarSign}
          title="Estimated Waste"
          value={`₹${estimatedWaste.toLocaleString()}`}
          subtitle="Potential monthly impact"
          iconClass="bg-purple-100 text-purple-600"
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="flex flex-col gap-4 md:flex-row">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources or anomaly type..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Severity */}
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="All">All Severity</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* Anomaly cards */}
      <div className="space-y-4">

        {filteredAnomalies.map((anomaly) => (
          <AnomalyCard
            key={anomaly.id}
            anomaly={anomaly}
          />
        ))}

        {filteredAnomalies.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
            <CheckCircle2
              size={40}
              className="mx-auto text-green-500"
            />

            <h3 className="mt-4 font-semibold text-slate-900">
              No anomalies found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or severity filter.
            </p>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

        <div className="flex gap-4">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <AlertTriangle size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-blue-900">
              How anomaly detection works
            </h3>

            <p className="mt-2 max-w-4xl text-sm leading-6 text-blue-800">
              CloudWise analyzes historical resource behavior
              and utilization patterns to identify unusual
              activity. The system can combine utilization
              thresholds with machine-learning techniques such
              as Isolation Forest to detect resources that
              behave differently from their normal patterns.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function SummaryCard({
  icon: Icon,
  title,
  value,
  subtitle,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>

      </div>
    </div>
  );
}

function AnomalyCard({ anomaly }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <div className="flex gap-4">

          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
              anomaly.severity === "HIGH"
                ? "bg-red-100 text-red-600"
                : anomaly.severity === "MEDIUM"
                ? "bg-amber-100 text-amber-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            <AlertTriangle size={22} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">

              <h2 className="font-semibold text-slate-900">
                {anomaly.type}
              </h2>

              <SeverityBadge
                severity={anomaly.severity}
              />

            </div>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {anomaly.resource}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {anomaly.resourceId}
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              {anomaly.description}
            </p>
          </div>

        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">

          <div>
            <p className="text-xs text-slate-400">
              CPU Usage
            </p>

            <p className="mt-1 text-lg font-semibold text-slate-800">
              {anomaly.cpu}%
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Duration
            </p>

            <p className="mt-1 text-lg font-semibold text-slate-800">
              {anomaly.duration}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-xs text-slate-400">
              Estimated Waste
            </p>

            <p className="mt-1 text-lg font-semibold text-red-600">
              {anomaly.estimatedWaste > 0
                ? `₹${anomaly.estimatedWaste.toLocaleString()}`
                : "No additional cost"}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const styles = {
    HIGH: "bg-red-100 text-red-700",
    MEDIUM: "bg-amber-100 text-amber-700",
    LOW: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        styles[severity]
      }`}
    >
      {severity}
    </span>
  );
}