import Auth from "@/components/auth";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Sidebar />

      <main className="flex-1 lg:ml-0">
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-3xl px-16 py-32">
            <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
              <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                Welcome to ORPC Test Application
              </h1>
              <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                A modern Next.js application with authentication powered by
                Better Auth and Drizzle ORM.
              </p>
            </div>
            <Auth />
          </div>
        </div>
      </main>
    </div>
  );
}
