"use server";
const API_URL = process.env.NEXT_PUBLIC_APP_URL;
export async function bulkDelete(ids: string[]) {
  const response = await fetch(
    `${API_URL}/api/todos/bulk`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete todos");
  }

  return response.json();
}

export async function bulkComplete(ids: string[], completed: boolean) {
  const response = await fetch(
    `${API_URL}/api/todos/bulk`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids,
        completed,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update todos");
  }

  return response.json();
}
