"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { typedClient } from "@/lib/orpc/client";

export default function ErrorHandlingPage() {
  const [shouldError, setShouldError] = useState(true);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testErrorHandling = async () => {
    setLoading(true);
    try {
      const response = await typedClient.errorHandling({ shouldError });
      setResult(`Success: ${response.message}`);
    } catch (error) {
      setResult(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-5xl px-4 py-8 lg:px-16 lg:py-32">
        <div className="flex flex-col gap-6 items-start text-left mb-10">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Error Handling
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Test error handling in ORPC procedures. This procedure demonstrates
            how errors are thrown and handled. Check the network tab in the
            developer panel to see the error responses.
          </p>
        </div>

        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Error Handling Test</CardTitle>
            <CardDescription>
              Test the error handling procedure with optional error triggering
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="shouldError"
                checked={shouldError}
                onChange={(e) => setShouldError(e.target.checked)}
                className="rounded border border-gray-300"
              />
              <Label htmlFor="shouldError">Should throw error</Label>
            </div>
            <Button onClick={testErrorHandling} disabled={loading}>
              {loading ? "Testing..." : "Test Error Handling"}
            </Button>
            {result && (
              <p className="text-sm text-muted-foreground">{result}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
