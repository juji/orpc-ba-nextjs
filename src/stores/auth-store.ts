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
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  getSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  loading: true,
  initialized: false,

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

  signUp: async (email: string, password: string, name?: string) => {
    try {
      await authClient.signUp.email({
        email,
        password,
        name: name || email.split("@")[0], // Use email prefix as default name
      });
      // Refresh session after sign up
      const session = await authClient.getSession();
      set({
        session: session.data,
      });
    } catch (error) {
      console.error("Sign up failed:", error);
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
      set({ session: session.data, loading: false, initialized: true });
    } catch (error) {
      console.error("Failed to get session:", error);
      set({ loading: false, initialized: true });
    }
  },
}));
