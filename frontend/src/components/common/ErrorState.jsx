import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this data. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-red-100 bg-white px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
        <AlertCircle size={24} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-1 max-w-md text-sm text-slate-500">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      )}
    </div>
  );
}
