import { ArrowRight, Lightbulb } from "lucide-react";
import { recommendations } from "../../data/mockData";
import { Link } from "react-router-dom";

export default function RecommendationsPreview() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Optimization Opportunities
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Potential monthly savings
          </p>
        </div>

        <Link
          to="/recommendations"
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="space-y-3">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <Lightbulb size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {item.resource}
                </p>

                <p className="text-xs text-slate-500">
                  {item.currentType} → {item.recommendedType}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-bold text-green-600">
                ₹{item.monthlySavings.toLocaleString()}
              </p>

              <p className="text-xs text-slate-400">/ month</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}