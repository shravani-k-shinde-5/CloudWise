import {
  DollarSign,
  TrendingUp,
  PiggyBank,
  Server,
} from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import CostOverview from "../components/dashboard/CostOverview";
import ResourceHealth from "../components/dashboard/ResourceHealth";
import RecentAlerts from "../components/dashboard/RecentAlerts";
import RecommendationsPreview from "../components/dashboard/RecommendationsPreview";

import { dashboardStats } from "../data/mockData";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor your cloud spending and optimization opportunities.
          </p>
        </div>

        <div className="text-sm text-slate-500">
          Last updated:{" "}
          <span className="font-medium text-slate-700">
            Just now
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Current Monthly Cost"
          value={`₹${dashboardStats.currentCost.toLocaleString()}`}
          subtitle="12.4% higher than last month"
          icon={DollarSign}
          iconClass="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="30-Day Forecast"
          value={`₹${dashboardStats.forecastCost.toLocaleString()}`}
          subtitle="Based on current usage"
          icon={TrendingUp}
          iconClass="bg-purple-100 text-purple-600"
        />

        <StatCard
          title="Potential Savings"
          value={`₹${dashboardStats.potentialSavings.toLocaleString()}`}
          subtitle="From optimization recommendations"
          icon={PiggyBank}
          iconClass="bg-green-100 text-green-600"
        />

        <StatCard
          title="Monitored Resources"
          value={dashboardStats.resources}
          subtitle={`${dashboardStats.anomalies} anomalies detected`}
          icon={Server}
          iconClass="bg-amber-100 text-amber-600"
        />
      </div>

      {/* Cost Chart */}
      <CostOverview />

      {/* Resource + Alerts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ResourceHealth />
        <RecentAlerts />
      </div>

      {/* Recommendations */}
      <RecommendationsPreview />
    </div>
  );
}