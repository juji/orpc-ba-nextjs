import { implement } from "@orpc/server";
import { contracts } from "../contracts/error-handling";

// Create implementer for error handling contract
const os = implement(contracts);

// Error handling procedure implementation
export const errorHandling = os.errorHandling.handler(({ input }) => {
  const { shouldError = true } = input;

  if (shouldError) {
    throw new Error("This is an intentional error for demonstration purposes");
  }

  return {
    message: "No error occurred",
    success: true,
  };
});
