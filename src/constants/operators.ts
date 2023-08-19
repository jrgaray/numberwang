export enum MathOperators {
  Addition = "+",
  Subtraction = "-",
  Multiplication = "*",
  Division = "/",
  Smoosh = "&",
}

export const OperatorMap = {
  [MathOperators.Addition]: (a: number, b: number) => a + b,
  [MathOperators.Subtraction]: (a: number, b: number) => a - b,
  [MathOperators.Multiplication]: (a: number, b: number) => a * b,
  [MathOperators.Division]: (a: number, b: number) => a / b,
  [MathOperators.Smoosh]: (a: number, b: number) => parseInt(`${a}${b}`, 10),
};
