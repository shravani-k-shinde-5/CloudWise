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

import { costData } from "../../data/mockData";

export default function CostOverview() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Cost Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Actual spending compared with predicted cloud cost
          </p>
        </div>

        <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-blue-500">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last 6 months</option>
          <option>This year</option>
        </select>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={costData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="actualGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#2563eb"
                  stopOpacity={0.25}
                />

                <stop
                  offset="100%"
                  stopColor="#2563eb"
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
              tickFormatter={(value) => `₹${value}`}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
              formatter={(value) => [`₹${value}`, "Cost"]}
            />

            <Legend />

            <Area
              type="monotone"
              dataKey="actual"
              name="Actual Cost"
              stroke="#2563eb"
              strokeWidth={2.5}
              fill="url(#actualGradient)"
              connectNulls={false}
            />

            <Area
              type="monotone"
              dataKey="forecast"
              name="Forecast"
              stroke="#9333ea"
              strokeWidth={2.5}
              strokeDasharray="6 4"
              fill="transparent"
              connectNulls={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 flex items-center gap-6 border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs text-slate-500">Current trend</p>

          <p className="mt-1 text-sm font-semibold text-red-600">
            ↑ 12.4%
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Forecast increase</p>

          <p className="mt-1 text-sm font-semibold text-amber-600">
            ↑ 13.5%
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Forecast confidence
          </p>

          <p className="mt-1 text-sm font-semibold text-green-600">
            92%
          </p>
        </div>
      </div>
    </div>
  );
}