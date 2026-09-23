"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  status: string;
}

interface BulkActionsProps {
  todos: Todo[];
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function BulkActions({
  todos,
  selectedIds,
  setSelectedIds,
}: BulkActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const allSelected = todos.length > 0 && selectedIds.length === todos.length;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(todos.map((todo) => todo._id));
    }
  };

  const handleBulkComplete = async (completed: boolean) => {
    if (selectedIds.length === 0) return;

    try {
      setLoading(true);

      const response = await fetch("/api/todos/bulk", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedIds,
          completed,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update todos");
      }

      setSelectedIds([]);
      router.refresh();
    } catch (error) {
      console.error("Bulk update error:", error);
      alert("Failed to update selected todos");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} todo(s)?`,
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const response = await fetch("/api/todos/bulk", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedIds,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete todos");
      }

      setSelectedIds([]);
      router.refresh();
    } catch (error) {
      console.error("Bulk delete error:", error);
      alert("Failed to delete selected todos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <label
          className={`flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
            allSelected
              ? "bg-rose-50 text-rose-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAll}
            disabled={loading || todos.length === 0}
            className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-rose-700"
          />

          <span>Select All</span>
        </label>

        {selectedIds.length > 0 && (
          <>
            <div className="hidden h-6 w-px bg-gray-200 sm:block" />

            <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500">
              {selectedIds.length} selected
            </span>

            <button
              type="button"
              onClick={() => handleBulkComplete(true)}
              disabled={loading}
              className="rounded-xl bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ✓ Complete
            </button>

            <button
              type="button"
              onClick={() => handleBulkComplete(false)}
              disabled={loading}
              className="rounded-xl bg-yellow-50 px-3 py-2 text-xs font-semibold text-yellow-700 transition hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ○ Incomplete
            </button>

            <button
              type="button"
              onClick={handleBulkDelete}
              disabled={loading}
              className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              🗑 Delete
            </button>

            <button
              type="button"
              onClick={() => setSelectedIds([])}
              disabled={loading}
              className="ml-auto rounded-xl px-3 py-2 text-xs font-medium text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              Clear
            </button>
          </>
        )}

        {loading && (
          <span className="ml-auto flex items-center gap-2 text-xs text-gray-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-rose-600" />
            Processing...
          </span>
        )}
      </div>
    </div>
  );
}
