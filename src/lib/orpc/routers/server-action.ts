import { implement, ORPCError } from "@orpc/server";
import { contracts } from "../contracts/server-action";

// Create implementer for server action contract
const os = implement(contracts);

// Server action procedure implementation
export const createUser = os.createUser.handler(async ({ input }) => {
  // Simulate server processing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate potential error
  if (input.email === "admin@example.com") {
    throw new Error("A user with this email already exists");
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    email: input.email,
    createdAt: new Date().toISOString(),
  };
});

// Export as serverAction for consistency
export { createUser as serverAction };
