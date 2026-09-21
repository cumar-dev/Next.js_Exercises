import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function Delete(id: string) {
  const response = await fetch(`${API_URL}/api/todos${id}`, {
    method: "DELETE",
  });
    if(!response.ok) {
        throw new Error("Api is missing");
    }
    const data = await response.json();
    revalidatePath("/")
    return data.todo;
}
