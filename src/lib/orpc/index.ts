import { implement } from "@orpc/server";
import { orpcContract } from "./contracts";
import { orpcRouters } from "./routers";

// Create implementer for the combined contract
const os = implement(orpcContract);

// Main ORPC router combining all procedure routers
export const orpcRouter = os.router(orpcRouters);
