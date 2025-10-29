import { oc } from "@orpc/contract";
import { z } from "zod";

// Math operations contract
export const mathContract = {
  add: oc
    .input(
      z.object({
        a: z.number(),
        b: z.number(),
      }),
    )
    .output(
      z.object({
        result: z.number(),
      }),
    ),

  multiply: oc
    .input(
      z.object({
        a: z.number(),
        b: z.number(),
      }),
    )
    .output(
      z.object({
        result: z.number(),
      }),
    ),
};
