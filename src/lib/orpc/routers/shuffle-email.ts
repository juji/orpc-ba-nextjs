import { implement, ORPCError } from "@orpc/server";
import { contracts } from "../contracts/shuffle-email";
import { type AuthContext, authenticated } from "../middlewares/authenticated";

// Create implementer for user contract with auth context
const os = implement(contracts).$context<AuthContext>();

// Shuffle email procedure implementation
export const shuffleEmail = os.shuffleEmail
  .use(authenticated)
  .handler(({ context }) => {
    const email = context.user?.email;
    if (!email) {
      throw new ORPCError("INTERNAL_SERVER_ERROR", {
        message: "User email not found after authentication check",
      });
    }
    const shuffled = email
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    return {
      originalEmail: email,
      shuffledEmail: shuffled,
    };
  });
