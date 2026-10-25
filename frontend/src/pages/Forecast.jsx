import {
  Brain,
  TrendingUp,
  CalendarDays,
  Target,
  Info,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { costData } from "../data/mockData";

const forecastData = [
  { date: "Oct 01", actual: 1640, forecast: 1640 },
  { date: "Oct 05", actual: null, forecast: 1710 },
  { date: "Oct 10", actual: null, forecast: 1790 },
  { date: "Oct 15", actual: null, forecast: 1880 },
  { date: "Oct 20", actual: null, forecast: 1970 },
  { date: "Oct 25", actual: null, forecast: 2070 },
  { date: "Oct 30", actual: null, forecast: 2180 },
];

export default function Forecast() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <Brain size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Cost Forecast
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              AI-powered prediction of your future cloud spending.
            </p>
          </div>
        </div>
      </div>

      {/* Forecast metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={CalendarDays}
          title="7-Day Forecast"
          value="₹12,480"
          subtitle="Expected spending"
          iconClass="bg-blue-100 text-blue-600"
        />

        <MetricCard
          icon={TrendingUp}
          title="30-Day Forecast"
          value="₹48,320"
          subtitle="Expected monthly spending"
          iconClass="bg-purple-100 text-purple-600"
        />

        <MetricCard
          icon={Target}
          title="Forecast Confidence"
          value="92%"
          subtitle="Model confidence"
          iconClass="bg-green-100 text-green-600"
        />

        <MetricCard
          icon={TrendingUp}
          title="Expected Increase"
          value="+13.5%"
          subtitle="Compared with current month"
          iconClass="bg-amber-100 text-amber-600"
        />
      </div>

      {/* Main forecast chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              30-Day Cost Prediction
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Historical spending and predicted future cost
            </p>
          </div>

          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-blue-500">
            <option>Next 30 days</option>
            <option>Next 60 days</option>
            <option>Next 90 days</option>
          </select>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={forecastData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="forecastGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#9333ea"
                    stopOpacity={0.2}
                  />

                  <stop
                    offset="100%"
                    stopColor="#9333ea"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "#64748b",
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "#64748b",
                }}
                tickFormatter={(value) =>
                  `₹${value}`
                }
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.08)",
                }}
                formatter={(value) => [
                  `₹${Number(value).toLocaleString()}`,
                  "Cost",
                ]}
              />

              <Legend />

              <Area
                type="monotone"
                dataKey="actual"
                name="Historical Cost"
                stroke="#2563eb"
                strokeWidth={2.5}
                fill="transparent"
                connectNulls={false}
              />

              <Area
                type="monotone"
                dataKey="forecast"
                name="AI Forecast"
                stroke="#9333ea"
                strokeWidth={2.5}
                strokeDasharray="6 4"
                fill="url(#forecastGradient)"
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model information */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Model details */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <Brain size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Forecast Model
              </h2>

              <p className="text-sm text-slate-500">
                Current ML prediction configuration
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">

            <InfoRow
              label="Model"
              value="XGBoost Regression"
            />

            <InfoRow
              label="Training Data"
              value="90 days"
            />

            <InfoRow
              label="Prediction Window"
              value="30 days"
            />

            <InfoRow
              label="Last Trained"
              value="Today, 02:15 PM"
            />

            <InfoRow
              label="Confidence"
              value="92%"
            />

          </div>
        </div>

        {/* Forecast explanation */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Info size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-blue-900">
                How CloudWise Predicts Cost
              </h2>

              <p className="mt-3 text-sm leading-6 text-blue-800">
                CloudWise analyzes historical cloud spending,
                resource utilization, usage trends and
                recurring patterns to estimate future costs.
              </p>

              <p className="mt-3 text-sm leading-6 text-blue-800">
                The forecast is updated when new cloud usage
                and billing data becomes available.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Forecast insight */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">

        <div className="flex items-start gap-4">
          <TrendingUp
            size={21}
            className="mt-0.5 shrink-0 text-amber-600"
          />

          <div>
            <h3 className="font-semibold text-amber-900">
              Forecast Insight
            </h3>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              Based on current usage patterns, monthly cloud
              spending is projected to increase. Review the
              Recommendations section to identify resources
              where optimization may reduce future costs.
            </p>
          </div>
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

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}