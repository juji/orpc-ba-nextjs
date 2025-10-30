import { oc } from "@orpc/contract";
import { z } from "zod";

// Form validation contract

export const formValidation = oc
  .route({ method: "POST", path: "/form-validation" })
  .input(
    z.object({
      name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(5, "Name must be less than 5 characters"),
    }),
  )
  .output(
    z.object({
      message: z.string(),
      success: z.boolean(),
      validatedData: z.object({
        name: z.string(),
      }),
    }),
  );

export const contracts = { formValidation };
