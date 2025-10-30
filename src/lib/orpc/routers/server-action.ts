import { implement } from "@orpc/server";
import { contracts } from "../contracts/server-action";

// Create implementer for server action contract
const os = implement(contracts);

// Server action logic
async function subscribeToNewsletter(email: string) {
  // Simulate server processing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate potential error
  if (email === "admin@example.com") {
    throw new Error("A user with this email already exists");
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    email,
    createdAt: new Date().toISOString(),
  };
}

// Server action procedure implementation
export const serverAction = os.serverAction.handler(async ({ input }) => {
  return await subscribeToNewsletter(input.email);
});

// Actionable version for client-side use
export const serverActionActionable = serverAction.actionable();

// Export the logic function for direct use in server actions
export { subscribeToNewsletter };
