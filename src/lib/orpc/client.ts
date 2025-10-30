"use client";

import { createORPCClient } from "@orpc/client";
import { SimpleCsrfProtectionLinkPlugin } from "@orpc/client/plugins";
import type { ContractRouterClient } from "@orpc/contract";
import type { JsonifiedClient } from "@orpc/openapi-client";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { orpcContract } from "./contracts";

const link = new OpenAPILink(orpcContract, {
  url: `${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/rpc`,
  plugins: [new SimpleCsrfProtectionLinkPlugin()],
  headers: async () => {
    if (typeof window !== "undefined") {
      return {};
    }

    // For server-side, we could import headers from next/headers
    // but for now, we'll keep it simple
    return {};
  },
});

// Create client with proper typing
export const orpcClient: JsonifiedClient<
  ContractRouterClient<typeof orpcContract>
> = createORPCClient(link);
