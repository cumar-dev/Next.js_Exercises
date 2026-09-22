"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_APP_URL;

export interface TodoState {
  success: boolean;
  message: string;
}

export async function create(
  previousState: TodoState,
  formData: FormData,
): Promise<TodoState> {
  const title = formData.get("title") as string;
  const status = formData.get("status") as string;

  if (!title?.trim()) {
    return {
      success: false,
      message: "Todo title is required",
    };
  }

  if (!status) {
    return {
      success: false,
      message: "Please select a priority",
    };
  }

  const response = await fetch(`${API_URL}/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title.trim(),
      completed: false,
      status,
    }),
  });

  console.log("create response", response);
  if (!response.ok) {
    return {
      success: false,
      message: "Failed to create todo",
    };
  }

  revalidatePath("/");

  return {
    success: true,
    message: "Todo created successfully",
  };
}