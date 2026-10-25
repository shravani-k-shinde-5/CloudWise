import { Bell, Search, User, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { resources } from "../../data/mockData";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Search resources
  const filteredResources =
    search.trim() === ""
      ? []
      : resources.filter((resource) => {
          const query = search.toLowerCase();

          return (
            resource.name.toLowerCase().includes(query) ||
            resource.type.toLowerCase().includes(query) ||
            resource.id.toLowerCase().includes(query) ||
            resource.region.toLowerCase().includes(query) ||
            resource.status.toLowerCase().includes(query)
          );
        });

  // Open resource details
  const handleSelectResource = (id) => {
    setSearch("");
    setShowResults(false);

    navigate(`/resources/${id}`);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearch("");
    setShowResults(false);
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
        <div
          ref={searchRef}
          className="relative w-[180px] sm:w-72 lg:w-96"
        >
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder="Search resources..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />

          {/* Clear button */}
          {search && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}

          {/* Search Results */}
          {showResults && search.trim() !== "" && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
              {filteredResources.length > 0 ? (
                <div className="max-h-80 overflow-y-auto p-2">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Resources
                  </p>

                  {filteredResources.map((resource) => (
                    <button
                      key={resource.id}
                      onClick={() =>
                        handleSelectResource(resource.id)
                      }
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-slate-50"
                    >
                      {/* Icon */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Search size={17} />
                      </div>

                      {/* Resource information */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {resource.name}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {resource.type} • {resource.region}
                        </p>
                      </div>

                      {/* Status */}
                      <span
                        className={`hidden rounded-full px-2 py-1 text-xs font-medium sm:block ${
                          resource.status === "Healthy"
                            ? "bg-green-50 text-green-700"
                            : resource.status === "Underutilized"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {resource.status}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-6 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Search size={18} />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    No resources found
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Try searching by resource name, type, ID,
                    region, or status.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-5">
        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* User */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 sm:h-10 sm:w-10">
            <User size={19} />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              Admin User
            </p>

            <p className="text-xs text-slate-500">
              Cloud Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}