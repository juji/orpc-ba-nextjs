import { oc } from "@orpc/contract";
import { z } from "zod";

// Math operations contract

export const add = oc
  .route({ method: "POST", path: "/add" })
  .meta({
    description: "Adds two numbers together and returns the sum.",
    summary: "Add two numbers",
  })
  .input(
    z.object({
      a: z.number().describe("First number to add"),
      b: z.number().describe("Second number to add"),
    }),
  )
  .output(
    z.object({
      result: z.number().describe("The sum of the two numbers"),
    }),
  );

export const multiply = oc
  .route({ method: "POST", path: "/multiply" })
  .meta({
    description: "Multiplies two numbers and returns the product.",
    summary: "Multiply two numbers",
  })
  .input(
    z.object({
      a: z.number().describe("First number to multiply"),
      b: z.number().describe("Second number to multiply"),
    }),
  )
  .output(
    z.object({
      result: z.number().describe("The product of the two numbers"),
    }),
  );

export const contracts = { add, multiply };
