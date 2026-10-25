import { useState } from "react";
import {
  Search,
  Eye,
  Server,
  Activity,
  DollarSign,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";

import { resources } from "../data/mockData";

export default function Resources() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredResources = resources.filter((resource) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      resource.name.toLowerCase().includes(searchText) ||
      resource.type.toLowerCase().includes(searchText) ||
      resource.id.toLowerCase().includes(searchText);

    const matchesStatus =
      status === "All" || resource.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Resources
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor and analyze your AWS infrastructure.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <SummaryCard
          icon={Server}
          title="Total Resources"
          value={resources.length}
          iconClass="bg-blue-100 text-blue-600"
        />

        <SummaryCard
          icon={Activity}
          title="Underutilized"
          value={
            resources.filter(
              (resource) => resource.status === "Underutilized"
            ).length
          }
          iconClass="bg-amber-100 text-amber-600"
        />

        <SummaryCard
          icon={DollarSign}
          title="Monthly Cost"
          value={`₹${resources
            .reduce((total, resource) => total + resource.monthlyCost, 0)
            .toLocaleString()}`}
          iconClass="bg-green-100 text-green-600"
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by resource name, ID or instance type..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Healthy">Healthy</option>
              <option value="Underutilized">
                Underutilized
              </option>
              <option value="Idle">Idle</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                AWS Resources
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Showing {filteredResources.length} of{" "}
                {resources.length} resources
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <TableHeader>Resource</TableHeader>
                <TableHeader>Instance Type</TableHeader>
                <TableHeader>CPU</TableHeader>
                <TableHeader>Memory</TableHeader>
                <TableHeader>Network</TableHeader>
                <TableHeader>Monthly Cost</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Action</TableHeader>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredResources.map((resource) => (
                <ResourceRow
                  key={resource.id}
                  resource={resource}
                />
              ))}
            </tbody>
          </table>
        </div>

        {filteredResources.length === 0 && (
          <div className="px-6 py-16 text-center">
            <Server
              size={35}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-semibold text-slate-800">
              No resources found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function SummaryCard({
  icon: Icon,
  title,
  value,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={20} />
        </div>

        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function TableHeader({ children }) {
  return (
    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}

function ResourceRow({ resource }) {
  return (
    <tr className="transition hover:bg-slate-50">
      {/* Resource */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
            <Server size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              {resource.name}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {resource.id}
            </p>
          </div>
        </div>
      </td>

      {/* Instance */}
      <td className="px-6 py-5">
        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
          {resource.type}
        </span>
      </td>

      {/* CPU */}
      <td className="px-6 py-5">
        <UsageValue value={resource.cpu} />
      </td>

      {/* Memory */}
      <td className="px-6 py-5">
        <UsageValue value={resource.memory} />
      </td>

      {/* Network */}
      <td className="px-6 py-5">
        <UsageValue value={resource.network} />
      </td>

      {/* Cost */}
      <td className="px-6 py-5">
        <p className="text-sm font-semibold text-slate-800">
          ₹{resource.monthlyCost.toLocaleString()}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          / month
        </p>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <StatusBadge status={resource.status} />
      </td>

      {/* Action */}
      <td className="px-6 py-5">
        <Link
          to={`/resources/${resource.id}`}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <Eye size={15} />
          Details
        </Link>
      </td>
    </tr>
  );
}

function UsageValue({ value }) {
  let color = "bg-green-500";

  if (value < 20) {
    color = "bg-red-500";
  } else if (value < 40) {
    color = "bg-amber-500";
  }

  return (
    <div className="w-24">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-slate-700">
          {value}%
        </span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Healthy: "bg-green-100 text-green-700",
    Underutilized: "bg-amber-100 text-amber-700",
    Idle: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-medium ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}