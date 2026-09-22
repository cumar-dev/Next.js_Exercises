"use server";

import { connectDB } from "../lib/Todo.lib";
import Todo from "../Model/Todo.model";

export interface SearchTodosParams {
  query?: string;
  completed?: "all" | "true" | "false";
}

export async function searchTodos({
  query = "",
  completed = "all",
}: SearchTodosParams) {
  await connectDB();

  const filter: Record<string, any> = {};

  if (query.trim()) {
    filter.title = { $regex: query.trim(), $options: "i" };
  }

  if (completed === "true") {
    filter.completed = true;
  } else if (completed === "false") {
    filter.completed = false;
  }

  const todos = await Todo.find(filter).sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify(todos));
}
