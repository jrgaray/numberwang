import { Item } from "@/types/Item.type";

export const getLowNumber = () => 1 + Math.round(Math.random() * 9);
export const getLowItem = (index: number): Item => ({
  value: getLowNumber(),
  selected: false,
  index,
});
