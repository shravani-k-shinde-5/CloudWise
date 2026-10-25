import { LoaderCircle } from "lucide-react";

export default function LoadingState({ message = "Loading..." }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white">
      <LoaderCircle className="animate-spin text-blue-600" size={32} />

      <p className="mt-3 text-sm font-medium text-slate-600">
        {message}
      </p>
    </div>
  );
}