import {
  DollarSign,
  TrendingUp,
  CalendarDays,
  Server,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const serviceCosts = [
  { service: "EC2", cost: 24500 },
  { service: "RDS", cost: 8200 },
  { service: "S3", cost: 4300 },
  { service: "Lambda", cost: 2100 },
  { service: "CloudWatch", cost: 1480 },
  { service: "Other", cost: 2000 },
];

const monthlyCosts = [
  { month: "May", cost: 32100 },
  { month: "Jun", cost: 34800 },
  { month: "Jul", cost: 36500 },
  { month: "Aug", cost: 38900 },
  { month: "Sep", cost: 42580 },
];

export default function Costs() {
  const totalCost = serviceCosts.reduce(
    (total, item) => total + item.cost,
    0
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Cost Analytics
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Understand where your cloud spending is going.
          </p>
        </div>

        <select className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500">
          <option>September 2026</option>
          <option>August 2026</option>
          <option>July 2026</option>
        </select>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={DollarSign}
          title="Current Month"
          value="₹42,580"
          subtitle="+12.4% from last month"
          iconClass="bg-blue-100 text-blue-600"
        />

        <MetricCard
          icon={TrendingUp}
          title="Average Daily Cost"
          value="₹1,419"
          subtitle="Based on current month"
          iconClass="bg-purple-100 text-purple-600"
        />

        <MetricCard
          icon={CalendarDays}
          title="Projected Month End"
          value="₹48,320"
          subtitle="13.5% projected increase"
          iconClass="bg-amber-100 text-amber-600"
        />

        <MetricCard
          icon={Server}
          title="Highest Cost Service"
          value="EC2"
          subtitle="₹24,500 this month"
          iconClass="bg-green-100 text-green-600"
        />
      </div>

      {/* Monthly trend */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Monthly Cost Trend
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Cloud spending over the last five months
          </p>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyCosts}
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
                dataKey="month"
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
                  `₹${value / 1000}k`
                }
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString()}`,
                  "Cost",
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.08)",
                }}
              />

              <Bar
                dataKey="cost"
                name="Monthly Cost"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service costs */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Cost by AWS Service
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Breakdown of your current monthly spending
            </p>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={serviceCosts}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 20,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "#64748b",
                  }}
                  tickFormatter={(value) =>
                    `₹${value / 1000}k`
                  }
                />

                <YAxis
                  type="category"
                  dataKey="service"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "#475569",
                  }}
                />

                <Tooltip
                  formatter={(value) => [
                    `₹${Number(value).toLocaleString()}`,
                    "Cost",
                  ]}
                />

                <Bar
                  dataKey="cost"
                  name="Cost"
                  fill="#7c3aed"
                  radius={[0, 6, 6, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown table */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Service Cost Breakdown
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current month spending by service
            </p>
          </div>

          <div className="space-y-5">
            {serviceCosts.map((item) => {
              const percentage =
                (item.cost / totalCost) * 100;

              return (
                <div key={item.service}>
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {item.service}
                      </p>

                      <p className="text-xs text-slate-400">
                        {percentage.toFixed(1)}% of total
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-slate-800">
                      ₹{item.cost.toLocaleString()}
                    </p>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Total
              </span>

              <span className="text-lg font-bold text-slate-900">
                ₹{totalCost.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cost insight */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <TrendingUp size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-blue-900">
              Cost Insight
            </h3>

            <p className="mt-1 max-w-3xl text-sm leading-6 text-blue-800">
              EC2 currently represents the largest portion of
              your cloud spending. CloudWise can analyze EC2
              utilization and identify resources that may be
              candidates for right-sizing or optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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