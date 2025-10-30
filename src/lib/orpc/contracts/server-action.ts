import { os } from "@orpc/server";
import { z } from "zod";

// Server action contract

export const createUser = os
  .route({ method: "POST", path: "/server-action" })
  .input(
    z.object({
      email: z.email("Invalid email address"),
    }),
  )
  .handler(async ({ input }) => {
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
  })
  .actionable();

export const contracts = { createUser };

export { createUser as serverAction };
