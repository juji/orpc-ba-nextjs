import { oc } from "@orpc/contract";
import { z } from "zod";

// Server action contract (shape only - no handler)

export const serverAction = oc
  .route({
    method: "POST",
    path: "/server-action",
    description:
      "Demonstrates server-side data processing and validation. Creates a user record with the provided email address. Shows how to handle form submissions and data persistence.",
  })
  .input(
    z.object({
      email: z
        .email("Invalid email address")
        .describe("Valid email address for user creation"),
    }),
  )
  .output(
    z.object({
      id: z.string().describe("Unique identifier for the created record"),
      email: z.email().describe("The validated email address"),
      createdAt: z.string().describe("ISO timestamp of record creation"),
    }),
  );

export const contracts = { serverAction };
