import { oc } from "@orpc/contract";
import { z } from "zod";

// Hello world contract

export const hello = oc
  .route({ method: "GET" })
  .input(
    z.object({
      name: z.string().optional(),
    }),
  )
  .output(
    z.object({
      message: z.string(),
      timestamp: z.date(),
    }),
  );

export const contracts = { hello };
