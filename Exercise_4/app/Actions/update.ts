"use server";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_APP_URL;
export async function update(id: string, title: string, completed: boolean, status: string) {
const response = await fetch(`${API_URL}/api/todos/${id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title: title,
        completed: completed,
        status: status
    })
})
  if(!response.ok) {
        throw new Error("Api is missing");
    }
    const data = await response.json();
    revalidatePath("/");
    return data.todo;
}