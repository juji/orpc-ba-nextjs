import { eventIterator, oc } from "@orpc/contract";
import { z } from "zod";

// Event iterator contract

export const eventIteratorContract = oc
  .route({ method: "GET", path: "/event-iterator" })
  .input(
    z.object({
      duration: z
        .string()
        .transform((val) => parseInt(val, 10))
        .refine((val) => val >= 1 && val <= 60, {
          message: "Duration must be between 1 and 60 seconds",
        })
        .optional(),
    }),
  )
  .output(
    eventIterator(
      z.object({
        message: z.string(),
        timestamp: z.number(),
        count: z.number(),
        isEnd: z.boolean().optional(),
      }),
    ),
  );

export const contracts = { eventIterator: eventIteratorContract };

export { eventIteratorContract as eventIterator };
