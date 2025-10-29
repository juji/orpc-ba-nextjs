import { helloContract } from "./hello";
import { mathContract } from "./math";

// Combined ORPC contract
export const orpcContract = {
  ...helloContract,
  ...mathContract,
};
