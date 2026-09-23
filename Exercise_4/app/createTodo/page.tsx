"use client";

import Link from "next/link";
import { useActionState } from "react";
import { create, TodoState } from "../Actions/create";

const initialState: TodoState = {
  success: false,
  message: "",
};

const createTodo = () => {
  const [state, formAction, pending] = useActionState(create, initialState);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Todo</h1>
            <p className="text-sm text-gray-500 mt-1">
              Create a task and organize your daily work.
            </p>
          </div>

          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
          >
            ← Back
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
          <form action={formAction} className="p-6 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Todo Title
              </label>

              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter your todo..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Priority
              </label>

              <select
                id="status"
                name="status"
                defaultValue=""
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              >
                <option value="" disabled>
                  Select priority
                </option>

                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {state.message && (
              <div
                className={`rounded-lg px-4 py-3 text-sm font-medium ${
                  state.success
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {state.message}
              </div>
            )}

            <button
              disabled={pending}
              type="submit"
              className="w-full rounded-lg bg-rose-800 py-3 px-4 text-white font-semibold transition hover:bg-rose-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Creating..." : "Create Todo"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default createTodo;
