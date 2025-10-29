import { implement } from "@orpc/server";
import { orpcContract } from "./contract";

// Create implementer for the combined contract
const os = implement(orpcContract);

// Main ORPC router combining all procedures
export const orpcRouter = os.router({
  hello: os.hello.handler(({ input }) => {
    const { name } = input;
    const message = name ? `Hello, ${name}!` : "Hello, World!";
    return {
      message,
      timestamp: new Date(),
    };
  }),

  add: os.add.handler(({ input }) => {
    const { a, b } = input;
    return {
      result: a + b,
    };
  }),

  multiply: os.multiply.handler(({ input }) => {
    const { a, b } = input;
    return {
      result: a * b,
    };
  }),
});

// Export the contract as well
export { orpcContract };

// Export the client
export { orpcClient } from "./client";
