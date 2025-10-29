import { implement } from "@orpc/server";
import { helloContract } from "../contracts/hello";

// Create implementer for hello contract
const os = implement(helloContract);

// Hello procedure implementation
export const helloProcedure = os.hello.handler(({ input }) => {
  const { name } = input;
  const message = name ? `Hello, ${name}!` : "Hello, World!";
  return {
    message,
    timestamp: new Date(),
  };
});

// Hello router
export const helloRouter = os.router({
  hello: helloProcedure,
});
