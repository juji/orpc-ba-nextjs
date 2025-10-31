import { ORPCError } from "@orpc/server";

// Define context type for authenticated procedures
export interface AuthContext {
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  session?: unknown;
}

// Authentication middleware - ensures user is authenticated
export const authenticated = async ({ context, next }: any) => {
  if (!context.user?.email) {
    throw new ORPCError("UNAUTHORIZED", {
      message: "User must be authenticated to access this procedure",
    });
  }
  return next();
};
