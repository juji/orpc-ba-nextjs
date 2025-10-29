import { oc } from "@orpc/contract";
import { z } from "zod";

// Shuffle email contract
export const shuffleEmail = oc
  .input(z.object({})) // No input needed, uses authenticated user
  .output(
    z.object({
      originalEmail: z.string(),
      shuffledEmail: z.string(),
    }),
  );

export const contracts = { shuffleEmail };
