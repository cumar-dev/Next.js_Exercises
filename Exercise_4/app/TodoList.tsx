"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { searchTodos } from "./Actions/search";
import { toggle } from "./Actions/toggle";
import { Delete } from "./Actions/delete";
import BulkActions from "./BulkAction";

function getRelativeTime(date: string) {
  const now = new Date();
  const created = new Date(date);

  const seconds = Math.floor((now.getTime() - created.getTime()) / 1000);

  if (seconds < 60) {
    return "just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(months / 12);

  return `${years} year${years !== 1 ? "s" : ""} ago`;
}

export default function TodoList({ todos: initialTodos }: { todos: any[] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [query, setQuery] = useState("");

  const [priority, setPriority] = useState<"all" | "high" | "medium" | "low">(
    "all",
  );

  const [completed, setCompleted] = useState<"all" | "true" | "false">("all");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timeout = setTimeout(() => {
      startTransition(async () => {
        const results = await searchTodos({
          query,
          priority,
          completed,
        });

        setTodos(results);
        setSelectedIds([]);
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, priority, completed]);

  const handleSelect = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((todoId) => todoId !== id);
      }

      return [...prev, id];
    });
  };

  return (
    <div className="w-full rounded-xl bg-white px-4 py-4 shadow-md">
      <div className="mb-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Todo App
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your daily tasks and stay organized.
            </p>
          </div>

          <Link
            href="/createTodo"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-rose-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-rose-900 hover:shadow-md"
          >
            <span className="text-lg leading-none">+</span>
            <span className="hidden sm:inline">Add Todo</span>
            <span className="sm:hidden">Add</span>
          </Link>
        </div>
      </div>

      <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              🔍
            </span>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
            />
          </div>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as typeof priority)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none transition-all focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <select
            value={completed}
            onChange={(e) => setCompleted(e.target.value as typeof completed)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none transition-all focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
          >
            <option value="all">All Status</option>
            <option value="true">Completed</option>
            <option value="false">Incomplete</option>
          </select>
        </div>

        {isPending && (
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-rose-600" />
            Searching...
          </div>
        )}
      </div>

      <BulkActions
        todos={todos}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />

      <div className="space-y-3">
        {todos.map((todo: any) => {
          const isSelected = selectedIds.includes(todo._id);

          return (
            <div
              key={todo._id}
              className={`group flex items-center justify-between gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all duration-200 ${
                isSelected
                  ? "border-rose-300 bg-rose-50/40 shadow-md"
                  : "border-gray-200 hover:-translate-y-[1px] hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleSelect(todo._id)}
                  className="h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-rose-700"
                />

                <form
                  action={toggle.bind(
                    null,
                    todo._id,
                    todo.title,
                    todo.completed,
                    todo.status,
                  )}
                >
                  <button
                    type="submit"
                    title={
                      todo.completed ? "Mark as incomplete" : "Mark as complete"
                    }
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all ${
                      todo.completed
                        ? "bg-green-100 text-green-600 hover:bg-green-200"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    {todo.completed ? (
                      <span className="text-base font-bold">✓</span>
                    ) : (
                      <span className="h-4 w-4 rounded-full border-2 border-gray-300" />
                    )}
                  </button>
                </form>

                <div className="min-w-0">
                  <p
                    className={`truncate text-sm font-semibold sm:text-base ${
                      todo.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.title}
                  </p>

                  
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-gray-400">
                    <span>Created {getRelativeTime(todo.createdAt)}</span>

                    {todo.updatedAt && todo.updatedAt !== todo.createdAt && (
                      <>
                        <span>•</span>
                        <span>Updated {getRelativeTime(todo.updatedAt)}</span>
                      </>
                    )}
                  </div>

                  <span
                    className={`mt-1.5 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                      todo.status === "high"
                        ? "bg-red-50 text-red-600"
                        : todo.status === "medium"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-green-50 text-green-600"
                    }`}
                  >
                    {todo.status}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/edit/${todo._id}`}
                  title="Edit todo"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-sm transition-all hover:border-blue-200 hover:bg-blue-100"
                >
                  ✏️
                </Link>

                <form action={Delete.bind(null, todo._id)}>
                  <button
                    type="submit"
                    title="Delete todo"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-sm transition-all hover:border-red-200 hover:bg-red-100"
                  >
                    🗑️
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>

      {todos.length === 0 && (
        <div className="mt-5 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <div className="mb-3 text-4xl">📝</div>

          <h3 className="text-sm font-semibold text-gray-700">
            No todos found
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            No todos match your current search or filter.
          </p>

          <Link
            href="/createTodo"
            className="mt-5 inline-flex rounded-xl bg-rose-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-900"
          >
            Create your first todo
          </Link>
        </div>
      )}
    </div>
  );
}
