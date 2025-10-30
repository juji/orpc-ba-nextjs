import { oc } from "@orpc/contract";
import { z } from "zod";

// Error handling contract

export const errorHandling = oc
  .route({ method: "POST", path: "/error-handling" })
  .meta({
    description:
      "Demonstrates error handling capabilities. Set shouldError to true to trigger an error response, or leave it false/undefined for a successful response.",
    summary: "Test error handling",
  })
  .input(
    z.object({
      shouldError: z
        .boolean()
        .optional()
        .describe("Whether to intentionally trigger an error"),
    }),
  )
  .output(
    z.object({
      message: z.string().describe("Response message"),
      success: z.boolean().describe("Whether the operation was successful"),
    }),
  );

export const contracts = { errorHandling };
