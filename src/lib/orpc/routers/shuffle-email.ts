import { implement } from "@orpc/server";
import { contracts } from "../contracts/shuffle-email";

// Define context type for authenticated procedures
interface AuthContext {
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  session?: any;
}

// Create implementer for user contract with auth context
const os = implement(contracts).$context<AuthContext>();

// Shuffle email procedure implementation
export const shuffleEmail = os.shuffleEmail
  .use(async ({ context, next }) => {
    if (!context.user?.email) {
      throw new Error("User must be authenticated to shuffle email");
    }
    return next();
  })
  .handler(({ context }) => {
    const email = context.user!.email;
    const shuffled = email
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    return {
      originalEmail: email,
      shuffledEmail: shuffled,
    };
  });
