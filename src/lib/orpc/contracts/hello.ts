import { oc } from "@orpc/contract";
import { z } from "zod";

// Hello world contract

export const hello = oc
  .route({
    method: "GET",
    path: "/hello",
    description:
      "Returns a personalized greeting message with the current timestamp. If no name is provided, returns a generic 'Hello, World!' message.",
  })
  .input(
    z.object({
      name: z
        .string()
        .optional()
        .describe("Optional name to personalize the greeting"),
    }),
  )
  .output(
    z.object({
      message: z.string().describe("The greeting message"),
      timestamp: z.date().describe("The current server timestamp"),
    }),
  );

export const contracts = { hello };
