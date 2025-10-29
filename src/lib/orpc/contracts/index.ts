import { hello } from "./hello";
import { add, multiply } from "./math";
import { shuffleEmail } from "./shuffle-email";

// Combined ORPC contract
export const orpcContract = {
  hello,
  add,
  multiply,
  "shuffle-email": shuffleEmail,
};
