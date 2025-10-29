import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

// Custom session hook with caching to prevent unnecessary API calls
let cachedSession: any = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useSession = () => {
  const session = authClient.useSession();

  // If we have a cached session and it's still valid, use it
  if (cachedSession && Date.now() - cacheTime < CACHE_DURATION) {
    return {
      ...session,
      data: cachedSession,
    };
  }

  // Update cache when session data changes
  if (session.data !== cachedSession) {
    cachedSession = session.data;
    cacheTime = Date.now();
  }

  return session;
};
