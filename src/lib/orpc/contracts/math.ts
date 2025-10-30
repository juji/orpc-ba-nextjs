import { oc } from "@orpc/contract";
import { z } from "zod";

// Math operations contract

export const add = oc
  .route({ method: "POST", path: "/add" })
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
  );

export const multiply = oc
  .route({ method: "POST", path: "/multiply" })
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
  );

export const contracts = { add, multiply };
