const styles = {
  healthy: "bg-green-50 text-green-700 ring-green-200",
  success: "bg-green-50 text-green-700 ring-green-200",

  warning: "bg-amber-50 text-amber-700 ring-amber-200",
  underutilized: "bg-amber-50 text-amber-700 ring-amber-200",

  critical: "bg-red-50 text-red-700 ring-red-200",
  danger: "bg-red-50 text-red-700 ring-red-200",
  idle: "bg-red-50 text-red-700 ring-red-200",

  info: "bg-blue-50 text-blue-700 ring-blue-200",

  neutral: "bg-slate-100 text-slate-600 ring-slate-200",
};

export default function Badge({ children, status = "neutral" }) {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, "");

  const className =
    styles[normalizedStatus] || styles.neutral;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
}