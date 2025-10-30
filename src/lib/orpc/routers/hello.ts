import { implement } from "@orpc/server";
import type { ResponseHeadersPluginContext } from "@orpc/server/plugins";
import { contracts } from "../contracts/hello";

// Define context type with response headers support
interface ORPCContext extends ResponseHeadersPluginContext {}

// Create implementer for hello contract with context
const os = implement(contracts).$context<ORPCContext>();

// Hello procedure implementation
export const hello = os.hello.handler(({ input, context }) => {
  const { name } = input;
  const message = name ? `Hello, ${name}!` : "Hello, World!";

  // Add caching headers for requests without a name (generic greeting)
  if (!name) {
    if (context.resHeaders) {
      context.resHeaders.set("Cache-Control", "public, max-age=300"); // Cache for 5 minutes
      context.resHeaders.set("CDN-Cache-Control", "max-age=3600"); // CDN cache for 1 hour
    }

    return {
      message,
      /* epoch timestamp */
      timestamp: new Date(0, 0, 0, 0, 0, 0, 0),
    };
  }

  return {
    message,
    timestamp: new Date(),
  };
});
