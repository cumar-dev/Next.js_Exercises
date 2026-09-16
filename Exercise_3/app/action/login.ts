"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function login(formData: FormData) {
    const role = formData.get("role") as string;
    if(!role) {
        return
    }
    (await cookies()).set("role", role);
    (await cookies()).set("auth", "true");

    if(role === "user") {
        redirect("/profile");
    }
    if(role === "admin") {
        redirect("/Admin");
    }
}