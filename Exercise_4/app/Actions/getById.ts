"use server";

const API_URL = process.env.NEXT_PUBLIC_APP_URL;
export async function getById(id: string) {
  const response = await fetch(`${API_URL}/api/todos/${id}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Api is missing");
  }
  console.log("get todo by id", response.status);
  const data = await response.json();

  return data.todo;
}
