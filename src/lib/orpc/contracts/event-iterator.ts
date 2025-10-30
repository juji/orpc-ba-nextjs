import { eventIterator, oc } from "@orpc/contract";
import { z } from "zod";

// Event iterator contract

export const eventIteratorContract = oc
  .route({ method: "GET", path: "/event-iterator" })
  .input(
    z.object({
      duration: z.number().min(1).max(60).optional(), // Duration in seconds, max 60
    }),
  )
  .output(
    eventIterator(
      z.object({
        message: z.string(),
        timestamp: z.number(),
        count: z.number(),
      }),
    ),
  );

export const contracts = { eventIterator: eventIteratorContract };

export { eventIteratorContract as eventIterator };
