const API_URL = process.env.NEXT_PUBLIC_APP_URL;
export async function getAll() {
    const response = await fetch(`${API_URL}/api/todos`);
    if(!response.ok) {
        throw new Error("Api is missing");
    }
    const data = await response.json();
    return data.todo;
}