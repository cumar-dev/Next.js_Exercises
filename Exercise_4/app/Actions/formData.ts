"use server";

import { update } from "./update";

export async function updateTodoFromForm(
  id: string,
  completed: boolean,
  formData: FormData,
) {
  const title = formData.get("title") as string;
  const newStatus = formData.get("status") as string;

  if (!title || !newStatus || typeof completed !== "boolean") {
    throw new Error("Please fill all fields");
  }

  await update(id, title, completed, newStatus);
}
