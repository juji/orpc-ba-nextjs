import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  serverAction,
  subscribeToNewsletter,
} from "@/lib/orpc/routers/server-action";
import { ServerActionForm } from "./server-action-form";

// Create a server action that can be called directly from forms
async function subscribeAction(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  let redirectUrl: string;

  try {
    // Call the newsletter subscription logic directly
    const result = await subscribeToNewsletter(email);
    redirectUrl = `/server-action?success=true&email=${encodeURIComponent(email)}`;
  } catch (error) {
    // On error, prepare redirect with error message
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    redirectUrl = `/server-action?error=${encodeURIComponent(errorMessage)}&email=${encodeURIComponent(email)}`;
  }

  // Redirect outside the try-catch to avoid catching the redirect error
  redirect(redirectUrl);
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ServerActionPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const success = params.success === "true";
  const error =
    typeof params.error === "string" ? decodeURIComponent(params.error) : null;
  const email = typeof params.email === "string" ? params.email : "";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-5xl px-4 py-8 lg:px-16 lg:py-32">
        <div className="flex flex-col gap-6 items-start text-left mb-10">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Server Action
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Integrate oRPC procedures with React Server Actions. Submit forms
            directly to server functions with type-safe error handling.
          </p>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This implementation demonstrates progressive enhancement: with
            JavaScript enabled, forms provide enhanced UX with client-side
            validation, loading states, and immediate feedback without page
            reloads. When JavaScript is disabled, forms gracefully degrade to
            traditional server-side submissions with full page redirects,
            ensuring accessibility and functionality across all devices and
            network conditions.
          </p>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Try disabling JavaScript in your browser's developer tools to see
            how the form gracefully degrades to traditional server-side form
            submission with full page redirects, while maintaining all
            functionality and proper error handling.
          </p>
        </div>

        <div className="space-y-6">
          <ServerActionForm
            action={subscribeAction}
            initialEmail={email}
            success={success}
            error={error}
          />

          {success && (
            <Card className="max-w-4xl">
              <CardHeader>
                <CardTitle>Successfully Subscribed</CardTitle>
                <CardDescription>
                  The server action completed successfully and returned data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <pre className="text-sm text-green-800 dark:text-green-200">
                    {JSON.stringify({ email, success: true }, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
