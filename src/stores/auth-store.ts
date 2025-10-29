import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

// Export Better Auth's built-in session hook
export const useSession = authClient.useSession;
