"use server";
const API_URL = process.env.NEXT_PUBLIC_APP_URL;
export async function getAll() {
    const response = await fetch(`${API_URL}/api/todos`, {
        method: "GET"
    });
    console.log("get all", response);
    if(!response.ok) {
        throw new Error("Api is missing");
    }
    const data = await response.json();
    return data.todo;
}