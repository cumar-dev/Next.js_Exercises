import { updateTodoFromForm } from "@/app/Actions/formData";
import { getById } from "@/app/Actions/getById";

import Link from "next/link";
import { redirect } from "next/navigation";

interface PropsEdit {
  params: Promise<{
    id: string;
  }>;
}

const editTodo = async ({ params }: PropsEdit) => {
  const { id } = await params;

  const todos = await getById(id);

  if (!todos) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">
          <div className="text-5xl mb-4">📋</div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Todo Not Found
          </h1>

          <p className="text-gray-500 mb-6">
            The todo you are trying to edit does not exist.
          </p>

          <Link
            href="/"
            className="inline-block bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition"
          >
            ← Go Back
          </Link>
        </div>
      </main>
    );
  }

  async function handleUpdate(formData: FormData) {
    "use server";

    await updateTodoFromForm(id, todos.completed, formData);

    redirect("/");
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition"
          >
            ← Back to Todo List
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-5">
            <h1 className="text-2xl font-bold text-gray-900">Edit Todo</h1>

            <p className="text-sm text-gray-500 mt-1">
              Update your task details below.
            </p>
          </div>

          <form action={handleUpdate} className="p-6 space-y-6">
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
                defaultValue={todos.title}
                placeholder="Enter your todo title"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                defaultValue={todos.status}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select priority
                </option>

                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
              <Link
                href="/"
                className="flex-1 text-center bg-gray-100 text-gray-700 px-5 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="flex-1 bg-rose-800 text-white px-5 py-3 rounded-lg font-medium hover:bg-rose-900 transition"
              >
                Update Todo
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default editTodo;
