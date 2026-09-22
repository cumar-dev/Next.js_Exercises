import Link from "next/link";
import { getAll } from "./Actions/getAll";
import StatusFilter from "./StatusFilter";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status = "all" } = await searchParams;

  const allTodos = await getAll();
  const todos =
    status === "all"
      ? allTodos
      : allTodos.filter((todo: any) => todo.status === status);

  if (allTodos.length === 0) {
    return <h1>No todo list here please create you daily todos</h1>;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Todo App</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your daily tasks
              </p>
            </div>

            <StatusFilter />
          </div>

          <p className="text-xs text-gray-400 mb-5">Last updated: Today</p>

          <Link
            href="/createTodo"
            className="inline-flex items-center bg-rose-800 hover:bg-rose-900 text-white font-medium px-4 py-2.5 rounded-lg transition mb-6"
          >
            + Add New Todo
          </Link>

          <div className="space-y-3">
            {todos.map((todo: any) => (
              <div
                key={todo._id}
                className="flex items-center justify-between gap-4 border border-gray-200 rounded-xl p-4 bg-white hover:shadow-sm transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <form action="">
                    <button
                      type="submit"
                      className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                    >
                      {todo.completed ? "✅" : "⬜"}
                    </button>
                  </form>

                  <div className="min-w-0">
                    <p
                      className={`font-medium text-gray-800 truncate ${
                        todo.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {todo.title}
                    </p>

                    <span
                      className={`inline-block mt-1 text-xs font-medium px-2 py-1 rounded-full ${
                        todo.status === "high"
                          ? "bg-red-100 text-red-600"
                          : todo.status === "medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                      }`}
                    >
                      {todo.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/edit/${todo._id}`}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 transition"
                  >
                    ✏️
                  </Link>

                  <form action="">
                    <button
                      type="submit"
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 transition"
                    >
                      🗑️
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>

          {todos.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-400">No todos matching this filter.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
