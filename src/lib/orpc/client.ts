import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";

const link = new RPCLink({
  url: `${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/rpc`,
  headers: async () => {
    if (typeof window !== "undefined") {
      return {};
    }

    // For server-side, we could import headers from next/headers
    // but for now, we'll keep it simple
    return {};
  },
});

// Create client without explicit typing for now
export const orpcClient = createORPCClient(link);

// Type assertion for the client to access procedures
export const typedClient = orpcClient as any;
