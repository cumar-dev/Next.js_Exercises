import Link from "next/link";
import { getAll } from "./Actions/getAll";


export default async function Home() {
  const todos = await getAll();

  return (
    <main className="max-w-2xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center gap-0 mb-6">
        <h1 className="text-2xl font-bold">Todo List</h1>

        <Link
          href="/createTodo"
          className="text-blue-500 text-sm"
        >
          Add Todo
        </Link>
      </div>

      <div className="space-y-3">
        {todos.map((todo: any) => (
          <div
            key={todo._id}
            className="flex justify-between items-center border p-4 rounded"
          >
            <div>
              <h2
                className={
                  todo.completed
                    ? "line-through text-gray-500"
                    : "font-medium"
                }
              >
                {todo.title}
              </h2>

              <p className="text-sm text-gray-500">
                Priority: {todo.status}
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/edit/${todo._id}`}
                className="px-3 py-1 bg-yellow-400 rounded"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}