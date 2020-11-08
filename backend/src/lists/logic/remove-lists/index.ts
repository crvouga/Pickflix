import { ListId } from "../../models";
import { ListLogic } from "../build";

export async function removeLists(
  this: ListLogic,
  ids: { id: ListId }[]
): Promise<void> {
  const { Lists } = this.unitOfWork;
  await Lists.remove(ids);
}
