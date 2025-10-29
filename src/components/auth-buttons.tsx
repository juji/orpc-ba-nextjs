'use client';

import { createAuthClient } from 'better-auth/react';
import { useState, useEffect } from 'react';

const authClient = createAuthClient();

export default function AuthButtons() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await authClient.getSession();
        setSession(session.data);
      } catch (error) {
        console.error('Failed to get session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  const handleSignIn = async () => {
    try {
      await authClient.signIn.email({
        email: 'test@example.com',
        password: 'password123',
      });
      // Refresh session after sign in
      const session = await authClient.getSession();
      setSession(session.data);
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setSession(null);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
        <div className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 dark:border-white/[.145]">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
      {session ? (
        <div className="flex flex-col gap-4 sm:flex-row items-center">
          <div className="text-zinc-600 dark:text-zinc-400">
            Welcome, {session.user?.name || session.user?.email}!
          </div>
          <button
            onClick={handleSignOut}
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
        >
          Sign In
        </button>
      )}
    </div>
  );
}