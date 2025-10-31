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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { orpcClient } from "@/lib/orpc/client";

export default function ErrorHandlingPage() {
  const [shouldError, setShouldError] = useState(true);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Form validation state
  const [formData, setFormData] = useState({
    name: "",
  });
  const [formResult, setFormResult] = useState<string>("");
  const [formResultType, setFormResultType] = useState<
    "success" | "error" | null
  >(null);
  const [formLoading, setFormLoading] = useState(false);

  const testErrorHandling = async () => {
    setLoading(true);
    try {
      const response = await orpcClient.errorHandling({ shouldError });
      setResult(`Success: ${response.message}`);
    } catch (error) {
      setResult(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const testFormValidation = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormResult("");
    setFormResultType(null);

    try {
      const response = await orpcClient.formValidation({
        name: formData.name,
      });
      setFormResult(`Success: ${response.message}`);
      setFormResultType("success");
    } catch (error: unknown) {
      // Display the raw error.data as JSON
      if (error && typeof error === "object" && "data" in error) {
        setFormResult(
          `${JSON.stringify((error as { data: unknown }).data, null, 2)}`,
        );
        setFormResultType("error");
      } else {
        setFormResult(
          `Error: ${error instanceof Error ? error.message : String(error)}`,
        );
        setFormResultType("error");
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex min-h-screen justify-center lg:justify-start">
      <div className="max-w-5xl px-4 lg:px-16 py-32">
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

        <div className="space-y-6">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Error Handling Test</CardTitle>
              <CardDescription>
                Test the error handling procedure with optional error
                triggering. The following throws error on invocation, resulting
                in Internal server error (500):
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

          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Validation Error</CardTitle>
              <CardDescription>
                Test form validation that may result in validation errors. Try
                submitting with invalid data to see validation errors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={testFormValidation} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    This field is validated on the server: minimum 2 characters,
                    maximum 5 characters.
                  </p>
                </div>
                <Button type="submit" disabled={formLoading}>
                  {formLoading ? "Validating..." : "Submit Form"}
                </Button>
                {formResult && formResultType && (
                  <div className="text-sm">
                    {formResultType === "success" ? (
                      <div className="text-green-600 dark:text-green-400">
                        <p className="mb-2 font-medium">Success</p>
                        <p>{formResult}</p>
                      </div>
                    ) : (
                      <div className="text-red-600 dark:text-red-400">
                        <p className="mb-2 font-medium">Error</p>
                        <pre className="overflow-auto p-3 border border-red-200 dark:border-red-800 rounded bg-red-50 dark:bg-red-950/20 text-xs">
                          {formResult}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
