import TodoList from "./TodoList";
import Todo from "@/app/Model/Todo.model";
import { connectDB } from "@/app/lib/Todo.lib";

export default async function Home() {
  await connectDB();

  const todos = await Todo.find().sort({ createdAt: -1 }).lean();

  const formattedTodos = todos.map((todo) => ({
    _id: todo._id.toString(),
    title: todo.title,
    completed: todo.completed,
    status: todo.status,
    createdAt: todo.createdAt.toISOString(), 
    updatedAt: todo.updatedAt.toISOString(),
  }));

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <TodoList todos={formattedTodos} />
      </div>
    </main>
  );
}
