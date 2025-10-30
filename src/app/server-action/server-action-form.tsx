"use client";

import { useServerAction } from "@orpc/react/hooks";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { serverActionActionable as serverAction } from "@/lib/orpc/routers/server-action";

interface ServerActionFormProps {
  action: (formData: FormData) => Promise<void>;
  initialEmail: string;
  success: boolean;
  error: string | null;
}

export function ServerActionForm({
  action,
  initialEmail,
  success,
  error,
}: ServerActionFormProps) {
  const [formData, setFormData] = useState({
    email: initialEmail || "admin@example.com",
  });
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [clientSuccess, setClientSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{ email: string } | null>(
    null,
  );

  const {
    execute,
    data,
    error: clientError,
    status,
  } = useServerAction(serverAction);

  // Detect if JavaScript is enabled and set enhanced mode
  useEffect(() => {
    setIsEnhanced(true);
  }, []);

  // Update form data when initialEmail changes (from URL params)
  useEffect(() => {
    setFormData({ email: initialEmail || "admin@example.com" });
  }, [initialEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    if (isEnhanced) {
      // Use client-side enhancement - prevent default form submission
      e.preventDefault();
      setClientSuccess(false); // Reset previous success state
      setSuccessData(null);

      const result = await execute({ email: formData.email });

      if (result[0]) {
        // Error occurred
        console.error("Server action error:", result[0]);
      } else {
        // Success
        console.log("Server action success:", result[1]);
        setClientSuccess(true);
        setSuccessData({ email: formData.email });
        setFormData({ email: "" });
      }
    }
    // When not enhanced, let the form submit normally to the action prop
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (clientSuccess) {
      setClientSuccess(false);
      setSuccessData(null);
    }
  };

  const displayError = error || clientError?.message;

  return (
    <>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Subscribe to Newsletter</CardTitle>
          <CardDescription>
            Submit an email using oRPC Server Actions. Try using
            "admin@example.com" to see error handling.
            {isEnhanced && " (Enhanced with JavaScript)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={action}
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                required
              />
              {displayError && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {displayError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={status === "pending"}
              className="w-full"
            >
              {status === "pending" ? "Subscribing..." : "Subscribe"}
            </Button>

            {displayError && (
              <div className="text-sm text-red-600 dark:text-red-400">
                <p className="mb-2 font-medium">Error</p>
                <p>{displayError}</p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {clientSuccess && successData && (
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
                {JSON.stringify({ ...successData, success: true }, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
