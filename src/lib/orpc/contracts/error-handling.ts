import { oc } from "@orpc/contract";
import { z } from "zod";

// Error handling contract

export const errorHandling = oc
  .route({ method: "POST", path: "/error-handling" })
  .input(
    z.object({
      shouldError: z.boolean().optional(),
    }),
  )
  .output(
    z.object({
      message: z.string(),
      success: z.boolean(),
    }),
  );

export const contracts = { errorHandling };
