import { update } from "./update";

export async function toggle(
  id: string,
  title: string,
  completed: boolean,
  status: string,
) {
  return update(id, title, !completed, status);
}
