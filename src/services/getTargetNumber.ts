import { MathOperators, OperatorMap } from "@/constants/operators";
import { Item } from "@/types/Item.type";

const operators = [
  MathOperators.Subtraction,
  MathOperators.Smoosh,
  MathOperators.Division,
  MathOperators.Multiplication,
  MathOperators.Addition,
];

const getTuple = (length: number): [number, number] => {
  const set = new Set<number>();
  while (set.size !== 2) {
    set.add(Math.floor(Math.random() * length));
  }
  return [...Array.from(set)] as [number, number];
};

export const getTargetNumber = (numberList: Item[]): number => {
  let values = numberList.map((item) => item.value);
  const originalValues = [...values];
  while (values.length !== 1) {
    const [firstNumber, secondNumber] = getTuple(values.length);
    const randomOperator = operators[Math.floor(Math.random() * 5)];
    const newValue = OperatorMap[randomOperator](
      values[firstNumber],
      values[secondNumber]
    );
    if (newValue !== Math.floor(newValue)) {
      continue;
    }
    values[firstNumber] = newValue;
    values = values.filter((_, index) => index !== secondNumber);
  }
  if (
    originalValues.includes(values[0]) ||
    values[0] > 1000 ||
    values[0] < -1000
  )
    return getTargetNumber(numberList);
  return values[0];
};
