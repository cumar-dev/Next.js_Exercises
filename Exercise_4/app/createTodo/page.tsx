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
    <>
      <main className="max-w-2xl mx-auto mt-10 p-6">
        <div className="bg-white shadow-md rounded-xl p-4">
          <div className="flex justify-between items-center gap-4 pb-2">
            <h1 className="text-2xl">Add new todo</h1>
            <Link className="text-blue-400" href={"/"}>
              ← Back
            </Link>
          </div>
          <p className="text-gray-500 text-sm pb-2">
            Here you can add your task Daily as to be well perform
          </p>
          <form action={formAction}>
            <label htmlFor="title" className="block mb-2 font-medium">
              Todo Title
            </label>
            <input
              className="border-2 border-gray-400 px-4 py-2 w-full rounded"
              type="text"
              name="title"
              placeholder="title"
            />
            <label htmlFor="status" className="block mb-2 font-medium mt-1">
              Priority
            </label>
            <select
              id="status"
              name="status"
              className="w-full border rounded px-4 py-2"
              defaultValue=""
            >
              <option value="" disabled>
                Select priority
              </option>

              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {state.message && (
              <p className={state.success ? "text-green-600" : "text-red-600"}>
                {state.message}
              </p>
            )}
            <button
            disabled={pending}
              className="bg-rose-800 rounded py-2 px-4 text-white text-center text-[16px] w-full mt-2"
              type="submit"
            >
               {pending ? "Creating..." : "Create Todo"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default createTodo;
