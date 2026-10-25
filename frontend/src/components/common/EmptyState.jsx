import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  message = "There is no data available to display.",
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Inbox size={24} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-1 max-w-md text-sm text-slate-500">
        {message}
      </p>
    </div>
  );
}