import { oc } from "@orpc/contract";
import { z } from "zod";

// Form validation contract

export const formValidation = oc
  .route({
    method: "POST",
    path: "/form-validation",
    description:
      "Validates form data with specific constraints. Demonstrates Zod schema validation with custom error messages. The name field must be between 2-5 characters.",
  })
  .input(
    z.object({
      name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(5, "Name must be less than 5 characters")
        .describe("Name field with length validation (2-5 characters)"),
    }),
  )
  .output(
    z.object({
      message: z.string().describe("Validation result message"),
      success: z.boolean().describe("Whether validation passed"),
      validatedData: z
        .object({
          name: z.string().describe("The validated name"),
        })
        .describe("The validated form data"),
    }),
  );

export const contracts = { formValidation };
