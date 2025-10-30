import { oc } from "@orpc/contract";
import { z } from "zod";

// Server action contract (shape only - no handler)

export const serverAction = oc
  .route({ method: "POST", path: "/server-action" })
  .input(
    z.object({
      email: z.string().email("Invalid email address"),
    }),
  )
  .output(
    z.object({
      id: z.string(),
      email: z.string().email(),
      createdAt: z.string(),
    }),
  );

export const contracts = { serverAction };
