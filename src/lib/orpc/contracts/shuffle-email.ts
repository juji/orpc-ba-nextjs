import { oc } from "@orpc/contract";
import { z } from "zod";

// Shuffle email contract
export const shuffleEmail = oc
  .route({
    method: "POST",
    path: "/shuffle-email",
    successStatus: 200,
    description:
      "Shuffles the characters in the authenticated user's email address. **Requires user authentication.** This is a demonstration endpoint showing how to work with authenticated user data.",
  })
  .input(
    z.object({}).describe("No input required - uses authenticated user data"),
  )
  .output(
    z.object({
      originalEmail: z.string().describe("The original email address"),
      shuffledEmail: z.string().describe("The email with shuffled characters"),
    }),
  );

export const contracts = { shuffleEmail };
