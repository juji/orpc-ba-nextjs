import { createAuthClient } from "better-auth/react";
import { create } from "zustand";

const authClient = createAuthClient();

interface User {
  name?: string;
  email?: string;
}

interface SessionData {
  user?: User;
}

interface AuthState {
  session: SessionData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  loading: true,

  signIn: async (email: string, password: string) => {
    try {
      await authClient.signIn.email({
        email,
        password,
      });
      // Refresh session after sign in
      const session = await authClient.getSession();
      set({
        session: session.data,
      });
    } catch (error) {
      console.error("Sign in failed:", error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      await authClient.signOut();
      set({ session: null });
    } catch (error) {
      console.error("Sign out failed:", error);
      throw error;
    }
  },

  getSession: async () => {
    try {
      const session = await authClient.getSession();
      set({ session: session.data, loading: false });
    } catch (error) {
      console.error("Failed to get session:", error);
      set({ loading: false });
    }
  },
}));
