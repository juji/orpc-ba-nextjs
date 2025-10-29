import { helloContract } from "./contracts/hello";
import { mathContract } from "./contracts/math";

// Combined ORPC contract
export const orpcContract = {
  ...helloContract,
  ...mathContract,
};
