import { Item } from "@/types/Item.type";

export const getHighNumber = () => (1 + Math.round(Math.random() * 3)) * 25;

export const getHighItem = (index: number): Item => ({
  value: getHighNumber(),
  selected: false,
  index,
});
