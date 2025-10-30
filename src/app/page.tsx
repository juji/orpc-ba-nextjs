import Auth from "@/components/auth";
import ShuffleEmail from "@/components/shuffle-email";

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
        </div>
        <div className="flex justify-center mb-10">
          <ShuffleEmail />
        </div>

        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            What is ORPC?
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg leading-relaxed">
              <strong>
                <a
                  href="https://orpc.unnoq.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  ORPC (Open RPC)
                </a>
              </strong>{" "}
              is a modern, type-safe RPC (Remote Procedure Call) framework
              designed for full-stack TypeScript applications. It provides
              end-to-end type safety, automatic API documentation, and seamless
              integration between frontend and backend.
            </p>

            <div className="grid md:grid-cols-1 gap-6 mt-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  🚀 Key Features
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      <strong>Type Safety:</strong> End-to-end TypeScript types
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      <strong>Auto Documentation:</strong> OpenAPI/Scalar
                      integration
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      <strong>Validation:</strong> Zod schema validation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      <strong>React Integration:</strong> Hooks and server
                      actions
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong className="text-gray-900 dark:text-gray-100">
                  Explore the Features:
                </strong>{" "}
                Try the interactive examples above, visit the{" "}
                <a
                  href="/basic"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  Basic Operations
                </a>{" "}
                page, or check out the{" "}
                <a
                  href="/rpc"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  API Documentation
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
