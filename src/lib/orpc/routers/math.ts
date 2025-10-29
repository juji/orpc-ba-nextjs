import { implement } from "@orpc/server";
import { mathContract } from "../contracts/math";

// Create implementer for math contract
const os = implement(mathContract);

// Math procedure implementations
export const addProcedure = os.add.handler(({ input }) => {
  const { a, b } = input;
  return {
    result: a + b,
  };
});

export const multiplyProcedure = os.multiply.handler(({ input }) => {
  const { a, b } = input;
  return {
    result: a * b,
  };
});

// Math router
export const mathRouter = {
  add: addProcedure,
  multiply: multiplyProcedure,
};
