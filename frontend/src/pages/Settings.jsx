import { useState } from "react";
import {
  Cloud,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  Database,
  User,
  Bell,
  Save,
} from "lucide-react";

export default function Settings() {
  const [region, setRegion] = useState("ap-south-1");
  const [syncFrequency, setSyncFrequency] = useState("Every 1 hour");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your CloudWise account and AWS connection.
        </p>
      </div>

      {/* AWS Connection */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">

          <div className="flex gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Cloud size={23} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                AWS Connection
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Connection between CloudWise and your AWS account.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
            <CheckCircle2 size={15} />
            Connected
          </div>

        </div>

        {/* Connection details */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

          <InfoCard
            label="AWS Account"
            value="123456789012"
          />

          <InfoCard
            label="Region"
            value={region}
          />

          <InfoCard
            label="Last Synced"
            value="2 minutes ago"
          />

        </div>

        {/* Sync */}
        <div className="mt-6 flex flex-col justify-between gap-4 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center">

          <div className="flex items-center gap-3">
            <RefreshCw size={19} className="text-slate-500" />

            <div>
              <p className="text-sm font-medium text-slate-800">
                AWS Data Synchronization
              </p>

              <p className="mt-1 text-xs text-slate-500">
                CloudWise periodically fetches usage and billing data.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            Sync Now
          </button>

        </div>

      </section>

      {/* Cloud configuration */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Database size={21} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Cloud Configuration
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Configure how CloudWise collects cloud usage data.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Region */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              AWS Region
            </label>

            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="ap-south-1">
                Asia Pacific (Mumbai) — ap-south-1
              </option>

              <option value="us-east-1">
                US East (N. Virginia) — us-east-1
              </option>

              <option value="us-west-2">
                US West (Oregon) — us-west-2
              </option>

              <option value="eu-west-1">
                Europe (Ireland) — eu-west-1
              </option>
            </select>
          </div>

          {/* Sync frequency */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Data Sync Frequency
            </label>

            <select
              value={syncFrequency}
              onChange={(e) => setSyncFrequency(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>Every 15 minutes</option>
              <option>Every 30 minutes</option>
              <option>Every 1 hour</option>
              <option>Every 6 hours</option>
              <option>Once per day</option>
            </select>
          </div>

        </div>

      </section>

      {/* Notifications */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <Bell size={21} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Notifications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose which CloudWise alerts you want to receive.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">

          <ToggleRow
            title="Email Alerts"
            description="Receive notifications when important anomalies are detected."
            enabled={emailAlerts}
            onChange={() => setEmailAlerts(!emailAlerts)}
          />

          <ToggleRow
            title="Cost Anomaly Alerts"
            description="Notify me when cloud spending changes unexpectedly."
            enabled={true}
            onChange={() => {}}
          />

          <ToggleRow
            title="Optimization Recommendations"
            description="Notify me when CloudWise finds a new saving opportunity."
            enabled={true}
            onChange={() => {}}
          />

        </div>

      </section>

      {/* Security */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Security
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              CloudWise connection and account security information.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-green-50 p-4">

          <div className="flex gap-3">
            <ShieldCheck
              size={19}
              className="mt-0.5 shrink-0 text-green-600"
            />

            <div>
              <p className="text-sm font-semibold text-green-800">
                AWS connection is active
              </p>

              <p className="mt-1 text-sm leading-6 text-green-700">
                CloudWise uses authenticated AWS access to retrieve
                resource utilization and billing information.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* Account */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <User size={21} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Account
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your CloudWise account information.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">

          <InfoCard
            label="Name"
            value="Admin User"
          />

          <InfoCard
            label="Email"
            value="admin@cloudwise.com"
          />

        </div>

      </section>

      {/* Save */}
      <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">

        <div>
          {saved && (
            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <CheckCircle2 size={17} />
              Settings saved successfully.
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Save size={17} />
          Save Changes
        </button>

      </div>

    </div>
  );
}

/* ---------------- Components ---------------- */

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4">

      <div>
        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled
            ? "bg-blue-600"
            : "bg-slate-300"
        }`}
        aria-label={`Toggle ${title}`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>

    </div>
  );
}