import { implement } from "@orpc/server";
import { orpcContract } from "./contract";
import { helloRouter } from "./routers/hello";
import { mathRouter } from "./routers/math";

// Create implementer for the combined contract
const os = implement(orpcContract);

// Main ORPC router combining all procedure routers
export const orpcRouter = os.router({
  ...helloRouter,
  ...mathRouter,
});
