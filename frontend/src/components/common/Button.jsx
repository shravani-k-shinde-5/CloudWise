import { LoaderCircle } from "lucide-react";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-200",

  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-200",

  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-200",

  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-200",
};

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  icon: Icon,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50 ${
        variants[variant]
      } ${className}`}
    >
      {loading && (
        <LoaderCircle
          size={16}
          className="animate-spin"
        />
      )}

      {!loading && Icon && <Icon size={16} />}

      {children}
    </button>
  );
}