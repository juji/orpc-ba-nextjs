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

export default function BasicPage() {
  const [mathResult, setMathResult] = useState<number | null>(null);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [loading, setLoading] = useState(false);

  const testAdd = async () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (Number.isNaN(numA) || Number.isNaN(numB)) {
      setMathResult(null);
      return;
    }

    setLoading(true);
    try {
      const result = await orpcClient.add({ a: numA, b: numB });
      setMathResult(result.result);
    } catch (error) {
      setMathResult(null);
      console.error("Math error:", error);
    } finally {
      setLoading(false);
    }
  };

  const testMultiply = async () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (Number.isNaN(numA) || Number.isNaN(numB)) {
      setMathResult(null);
      return;
    }

    setLoading(true);
    try {
      const result = await orpcClient.multiply({ a: numA, b: numB });
      setMathResult(result.result);
    } catch (error) {
      setMathResult(null);
      console.error("Math error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-5xl px-4 py-8 lg:px-16 lg:py-32">
        <div className="flex flex-col gap-6 items-start text-left mb-10">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Basic Math Operations
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Test basic addition and multiplication operations. Check the network
            tab in the developer panel to see the requests.
          </p>
        </div>

        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Math Tests</CardTitle>
            <CardDescription>Test basic math operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Numbers</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Number A"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  type="number"
                />
                <Input
                  placeholder="Number B"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={testAdd} disabled={loading}>
                Add
              </Button>
              <Button onClick={testMultiply} disabled={loading}>
                Multiply
              </Button>
            </div>
            {mathResult !== null && (
              <p className="text-sm text-muted-foreground">
                Result: {mathResult}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
