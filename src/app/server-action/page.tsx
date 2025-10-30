"use client";

import { useServerAction } from "@orpc/react/hooks";
import { useState } from "react";
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
import { serverAction } from "@/lib/orpc/contracts/server-action";

interface User {
  id: string;
  email: string;
  createdAt: string;
}

export default function ServerActionPage() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { execute, data, error, status } = useServerAction(serverAction);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await execute({
      email: formData.email,
    });

    if (result[0]) {
      // Error occurred
      console.error("Server action error:", result[0]);
    } else {
      // Success
      console.log("Server action success:", result[1]);
      // Clear form on success
      setFormData({ email: "" });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
        </div>

        <div className="space-y-6">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Subscribe to Newsletter</CardTitle>
              <CardDescription>
                Submit an email using oRPC Server Actions. Try using
                "admin@example.com" to see error handling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                  {error && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {error.message}
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

                {error && (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    <p className="mb-2 font-medium">Error</p>
                    <p>{error.message}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {data && (
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
                    {JSON.stringify(data, null, 2)}
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
