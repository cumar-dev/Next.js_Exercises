import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function create(title: string, status: string) {
const response = await fetch(`${API_URL}/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title: title,
        completed: false,
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