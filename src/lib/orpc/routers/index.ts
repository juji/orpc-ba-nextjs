import { helloRouter } from "./hello";
import { mathRouter } from "./math";

// Combined ORPC routers
export const orpcRouters = {
  ...helloRouter,
  ...mathRouter,
};
