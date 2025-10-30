import { eventIterator, oc } from "@orpc/contract";
import { z } from "zod";

// Event iterator contract

export const eventIteratorContract = oc
  .route({
    method: "GET",
    path: "/event-iterator",
    description:
      "Streams real-time events using Server-Sent Events (SSE). Sends periodic messages for a specified duration (1-60 seconds). Demonstrates event streaming capabilities with automatic reconnection support.",
  })
  .input(
    z.object({
      duration: z
        .string()
        .transform((val) => parseInt(val, 10))
        .refine((val) => val >= 1 && val <= 60, {
          message: "Duration must be between 1 and 60 seconds",
        })
        .optional()
        .describe(
          "Duration in seconds for the event stream (1-60, defaults to system default)",
        ),
    }),
  )
  .output(
    eventIterator(
      z
        .object({
          message: z.string().describe("Event message content"),
          timestamp: z.number().describe("Unix timestamp of the event"),
          count: z.number().describe("Sequential event counter"),
          isEnd: z
            .boolean()
            .optional()
            .describe("Whether this is the final event"),
        })
        .describe("Real-time event data"),
    ),
  );

export const contracts = { eventIterator: eventIteratorContract };

export { eventIteratorContract as eventIterator };
