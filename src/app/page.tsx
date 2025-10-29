import Auth from "@/components/auth";
// import ORPCTest from "@/components/orpc-test";
import ShuffleEmail from "@/components/shuffle-email";
// import Register from "@/components/register";

export const metadata = {
  title: "ORPC test app",
  description:
    "A modern Next.js application with authentication powered by Better Auth and Drizzle ORM.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-5xl px-4 py-8 lg:px-16 lg:py-32">
        <div className="flex flex-col gap-6 items-start text-left mb-10">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to ORPC Test Application
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            A modern Next.js application with authentication powered by Better
            Auth and Drizzle ORM.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center mb-10">
          <Auth />
          {/* <Register /> */}
        </div>
        <div className="flex justify-center mb-10">
          <ShuffleEmail />
        </div>
        {/* <ORPCTest /> */}
      </div>
    </div>
  );
}
