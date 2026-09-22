import { NextResponse } from "next/server";
import { update } from "./update";

export async function formData(
  id: string,
  completed: boolean,
  status: string,
  formData: FormData,
) {
  const title = formData.get("title") as string;
  const newStatus = formData.get("status") as string;
  if (!title || !newStatus || !completed) {
    return NextResponse.json(
      {
        message: "still fields not get",
      },
      {
        status: 400,
      },
    );
  }
  await update(id, title, completed, newStatus);
}
