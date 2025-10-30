import { oc } from "@orpc/contract";
import { z } from "zod";

// Server action contract (shape only - no handler)

export const serverAction = oc
  .route({
    method: "POST",
    path: "/server-action",
    description:
      "Demonstrates server-side data processing and validation. Shows how to handle form submissions on a no-script page.",
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
      id: z.string().describe("Fake id for the record"),
      email: z.email().describe("The validated email address"),
      createdAt: z.string().describe("ISO timestamp of the request"),
    }),
  );

export const contracts = { serverAction };
