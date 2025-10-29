import { oc } from "@orpc/contract";
import { z } from "zod";

// Hello world contract
export const helloContract = {
  hello: oc
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
    ),
};
