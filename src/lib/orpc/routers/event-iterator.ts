import { implement } from "@orpc/server";
import { contracts } from "../contracts/event-iterator";

// Create implementer for event iterator contract
const os = implement(contracts);

// Event iterator procedure implementation
export const eventIterator = os.eventIterator.handler(async function* ({
  input,
}) {
  const { duration = 30 } = input; // Default to 30 seconds
  const startTime = Date.now();
  let count = 0;

  try {
    while (true) {
      count++;

      // Check if we've exceeded the duration
      const elapsed = (Date.now() - startTime) / 1000;
      if (elapsed >= duration) {
        // Yield final event to mark the end of the stream
        yield {
          message: `Stream completed after ${count} events`,
          timestamp: Date.now(),
          count,
          isEnd: true,
        };
        return;
      }

      yield {
        message: `Event #${count} - Server time: ${new Date().toLocaleTimeString()}`,
        timestamp: Date.now(),
        count,
      };

      // Wait 1 second before next event
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } finally {
    console.log(`Event iterator completed after ${count} events`);
  }
});
