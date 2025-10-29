import { implement } from "@orpc/server";
import { contracts } from "../contracts/math";

// Create implementer for math contract
const os = implement(contracts);

// Math procedure implementations
export const add = os.add.handler(({ input }) => {
  const { a, b } = input;
  return {
    result: a + b,
  };
});

export const multiply = os.multiply.handler(({ input }) => {
  const { a, b } = input;
  return {
    result: a * b,
  };
});
