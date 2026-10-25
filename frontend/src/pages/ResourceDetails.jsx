import {
  Server,
  Cpu,
  MemoryStick,
  Wifi,
  DollarSign,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import {
  resources,
  recommendations,
} from "../data/mockData";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const usageData = [
  { time: "00:00", cpu: 12, memory: 20, network: 8 },
  { time: "04:00", cpu: 15, memory: 22, network: 12 },
  { time: "08:00", cpu: 24, memory: 29, network: 20 },
  { time: "12:00", cpu: 18, memory: 25, network: 17 },
  { time: "16:00", cpu: 31, memory: 34, network: 25 },
  { time: "20:00", cpu: 21, memory: 28, network: 15 },
  { time: "23:00", cpu: 16, memory: 23, network: 10 },
];

export default function ResourceDetails() {
  const { id } = useParams();

  const resource = resources.find(
    (item) => item.id === id
  );

  if (!resource) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <h2 className="text-xl font-semibold text-slate-900">
          Resource not found
        </h2>

        <Link
          to="/resources"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to Resources
        </Link>
      </div>
    );
  }

  const recommendation = recommendations.find(
    (item) => item.resource === resource.name
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <Link
          to="/resources"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to Resources
        </Link>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
              <Server size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {resource.name}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {resource.id} • {resource.type} • {resource.region}
              </p>
            </div>
          </div>

          <StatusBadge status={resource.status} />
        </div>
      </div>

      {/* Resource summary */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={Cpu}
          title="CPU Utilization"
          value={`${resource.cpu}%`}
          iconClass="bg-blue-100 text-blue-600"
        />

        <MetricCard
          icon={MemoryStick}
          title="Memory Utilization"
          value={`${resource.memory}%`}
          iconClass="bg-purple-100 text-purple-600"
        />

        <MetricCard
          icon={Wifi}
          title="Network Usage"
          value={`${resource.network}%`}
          iconClass="bg-green-100 text-green-600"
        />

        <MetricCard
          icon={DollarSign}
          title="Monthly Cost"
          value={`₹${resource.monthlyCost.toLocaleString()}`}
          iconClass="bg-amber-100 text-amber-600"
        />
      </div>

      {/* Usage chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Resource Utilization
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Last 24 hours of resource usage
          </p>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={usageData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />

              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "#64748b",
                }}
              />

              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "#64748b",
                }}
                tickFormatter={(value) => `${value}%`}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.08)",
                }}
                formatter={(value) => `${value}%`}
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="cpu"
                name="CPU"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="memory"
                name="Memory"
                stroke="#9333ea"
                strokeWidth={2.5}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="network"
                name="Network"
                stroke="#16a34a"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* AI analysis */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <AlertTriangle size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                AI Resource Analysis
              </h2>

              <p className="text-sm text-slate-500">
                Automated utilization analysis
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            {resource.status === "Healthy" ? (
              <>
                <p className="font-medium text-green-700">
                  Resource utilization looks healthy.
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  CPU and memory utilization are within a
                  reasonable operating range. No immediate
                  optimization action has been detected.
                </p>
              </>
            ) : resource.status === "Underutilized" ? (
              <>
                <p className="font-medium text-amber-700">
                  Resource appears to be underutilized.
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Average resource utilization is relatively
                  low. The ML analysis suggests that a smaller
                  instance may handle the current workload.
                </p>
              </>
            ) : (
              <>
                <p className="font-medium text-red-700">
                  Idle resource detected.
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Resource utilization has remained very low.
                  Consider reviewing whether this resource is
                  still required.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Recommendation */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <Lightbulb size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Optimization Recommendation
              </h2>

              <p className="text-sm text-slate-500">
                AI-generated right-sizing suggestion
              </p>
            </div>
          </div>

          {recommendation ? (
            <div className="mt-6">
              <div className="grid grid-cols-2 gap-4">
                <InfoBox
                  label="Current"
                  value={recommendation.currentType}
                />

                <InfoBox
                  label="Recommended"
                  value={recommendation.recommendedType}
                />
              </div>

              <div className="mt-4 rounded-xl bg-green-50 p-4">
                <p className="text-xs text-green-700">
                  Estimated monthly savings
                </p>

                <p className="mt-1 text-2xl font-bold text-green-700">
                  ₹
                  {recommendation.monthlySavings.toLocaleString()}
                </p>

                <p className="mt-2 text-sm text-green-700">
                  {recommendation.confidence}% confidence
                </p>
              </div>

              <p className="mt-4 text-sm text-slate-600">
                Reason: Average CPU utilization is below
                the recommended utilization range.
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-600">
                No optimization recommendation is currently
                available for this resource.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function MetricCard({
  icon: Icon,
  title,
  value,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={20} />
        </div>

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-900">
        {value}
      </p>
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
      className={`rounded-full px-3 py-1.5 text-xs font-medium ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}