import Auth from "@/components/auth";
import { ThemeSwitcherWithProvider } from "@/components/theme-switcher-with-provider";

// const _authClient = createAuthClient();

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="absolute top-4 right-4">
          <ThemeSwitcherWithProvider />
        </div>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to ORPC Test Application
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            A modern Next.js application with authentication powered by Better
            Auth and Drizzle ORM.
          </p>
        </div>
        <Auth />
      </main>
    </div>
  );
}
