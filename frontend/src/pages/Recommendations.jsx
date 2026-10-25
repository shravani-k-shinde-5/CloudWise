import {
  Lightbulb,
  Server,
  TrendingDown,
  ShieldCheck,
  ArrowRight,
  DollarSign,
  Brain,
} from "lucide-react";

import { recommendations } from "../data/mockData";

export default function Recommendations() {
  const totalSavings = recommendations.reduce(
    (total, item) => total + item.monthlySavings,
    0
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <Lightbulb size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Recommendations
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                AI-powered recommendations to optimize your cloud infrastructure.
              </p>
            </div>
          </div>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
          {recommendations.length} recommendations
        </span>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <MetricCard
          icon={DollarSign}
          title="Potential Savings"
          value={`₹${totalSavings.toLocaleString()}`}
          subtitle="Estimated monthly savings"
          iconClass="bg-green-100 text-green-600"
        />

        <MetricCard
          icon={Server}
          title="Resources to Optimize"
          value={recommendations.length}
          subtitle="Identified by CloudWise"
          iconClass="bg-blue-100 text-blue-600"
        />

        <MetricCard
          icon={TrendingDown}
          title="Cost Reduction"
          value="19.7%"
          subtitle="Potential monthly reduction"
          iconClass="bg-purple-100 text-purple-600"
        />

        <MetricCard
          icon={ShieldCheck}
          title="Avg. Confidence"
          value="92.5%"
          subtitle="AI recommendation confidence"
          iconClass="bg-amber-100 text-amber-600"
        />

      </div>

      {/* Recommendation cards */}
      <div className="space-y-5">

        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}

      </div>

      {/* How it works */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <Brain size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              How CloudWise Generates Recommendations
            </h2>

            <p className="text-sm text-slate-500">
              The recommendation engine combines usage analysis,
              pricing information and resource behavior.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

          <Step
            number="01"
            title="Analyze Usage"
            description="CloudWise analyzes CPU, memory, network and historical utilization."
          />

          <Step
            number="02"
            title="Compare Options"
            description="The system compares the current instance with suitable alternatives."
          />

          <Step
            number="03"
            title="Estimate Savings"
            description="Potential monthly savings are calculated using current pricing data."
          />

        </div>
      </div>

      {/* Important note */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">

        <div className="flex gap-3">
          <ShieldCheck
            size={20}
            className="mt-0.5 shrink-0 text-amber-600"
          />

          <div>
            <h3 className="font-semibold text-amber-900">
              Recommendation only
            </h3>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              These recommendations are suggestions based on
              observed resource usage. CloudWise should verify
              workload requirements before applying any
              infrastructure change.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ---------------- Recommendation Card ---------------- */

function RecommendationCard({ recommendation }) {
  const savingsPercentage =
    ((recommendation.currentCost -
      recommendation.estimatedCost) /
      recommendation.currentCost) *
    100;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      {/* Top */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">

        <div className="flex gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
            <Lightbulb size={22} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">

              <h2 className="text-lg font-semibold text-slate-900">
                Right-size {recommendation.resource}
              </h2>

              <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                {recommendation.confidence}% confidence
              </span>

            </div>

            <p className="mt-1 text-sm text-slate-500">
              Resource optimization recommendation
            </p>
          </div>

        </div>

        <div className="rounded-xl bg-green-50 px-4 py-3 text-right">
          <p className="text-xs text-green-700">
            Potential monthly savings
          </p>

          <p className="mt-1 text-xl font-bold text-green-700">
            ₹{recommendation.monthlySavings.toLocaleString()}
          </p>
        </div>

      </div>

      {/* Comparison */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

        <InstanceBox
          label="Current Instance"
          type={recommendation.currentType}
          cost={recommendation.currentCost}
        />

        <div className="hidden items-center justify-center md:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <ArrowRight size={18} />
          </div>
        </div>

        <InstanceBox
          label="Recommended Instance"
          type={recommendation.recommendedType}
          cost={recommendation.estimatedCost}
          recommended
        />

      </div>

      {/* Details */}
      <div className="mt-6 border-t border-slate-100 pt-5">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Why this recommendation?
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Average CPU utilization is below 20%, indicating
              that the current instance may have more capacity
              than required.
            </p>
          </div>

          <div className="shrink-0 rounded-lg bg-slate-50 px-4 py-3">
            <p className="text-xs text-slate-500">
              Estimated reduction
            </p>

            <p className="mt-1 text-sm font-bold text-slate-800">
              {savingsPercentage.toFixed(1)}%
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

/* ---------------- Components ---------------- */

function InstanceBox({
  label,
  type,
  cost,
  recommended = false,
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        recommended
          ? "border-green-200 bg-green-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <p
        className={`text-xs font-medium ${
          recommended
            ? "text-green-700"
            : "text-slate-500"
        }`}
      >
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-slate-900">
        {type}
      </p>

      <p className="mt-2 text-sm text-slate-600">
        ₹{cost.toLocaleString()} / month
      </p>
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

function Step({ number, title, description }) {
  return (
    <div className="rounded-xl border border-slate-200 p-5">

      <span className="text-xs font-bold text-blue-600">
        {number}
      </span>

      <h3 className="mt-3 font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

    </div>
  );
}