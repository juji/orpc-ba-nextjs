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
import { typedClient } from "@/lib/orpc/client";

export default function UsingGetPage() {
  const [helloResult, setHelloResult] = useState<string>("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const testHello = async () => {
    setLoading(true);
    try {
      const result = await typedClient.hello({ name: name || undefined });
      setHelloResult(
        `${result.message} (at ${result.timestamp.toLocaleString()})`,
      );
    } catch (error) {
      setHelloResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-5xl px-4 py-8 lg:px-16 lg:py-32">
        <div className="flex flex-col gap-6 items-start text-left mb-10">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Using GET Methods
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Test the hello procedure. This procedure is configured to use GET
            method, while ORPC by default uses POST for all other requests.
            Check the network tab in the developer panel to see the request.
          </p>
        </div>

        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Hello Test</CardTitle>
            <CardDescription>
              Test the hello procedure with optional name
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name (optional)</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <Button onClick={testHello} disabled={loading}>
              {loading ? "Loading..." : "Say Hello"}
            </Button>
            {helloResult && (
              <p className="text-sm text-muted-foreground">{helloResult}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
