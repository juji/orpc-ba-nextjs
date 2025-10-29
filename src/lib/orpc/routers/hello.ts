import { implement } from "@orpc/server";
import { contracts } from "../contracts/hello";

// Create implementer for hello contract
const os = implement(contracts);

// Hello procedure implementation
export const hello = os.hello.handler(({ input }) => {
  const { name } = input;
  const message = name ? `Hello, ${name}!` : "Hello, World!";
  return {
    message,
    timestamp: new Date(),
  };
});
