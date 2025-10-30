import { oc } from "@orpc/contract";
import { z } from "zod";

// Math operations contract

export const add = oc
  .route({
    method: "POST",
    path: "/add",
    description: "Adds two numbers together and returns the sum.",
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
  .route({
    method: "POST",
    path: "/multiply",
    description: "Multiplies two numbers and returns the product.",
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
