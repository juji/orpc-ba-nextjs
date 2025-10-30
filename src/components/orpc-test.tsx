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

export default function ORPCTest() {
  const [helloResult, setHelloResult] = useState<string>("");
  const [mathResult, setMathResult] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [loading, setLoading] = useState(false);

  const testHello = async () => {
    setLoading(true);
    try {
      const result = await orpcClient.hello({ name: name || undefined });
      setHelloResult(
        `${result.message} (at ${result.timestamp.toLocaleString()})`,
      );
    } catch (error) {
      setHelloResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ORPC Test Interface</CardTitle>
          <CardDescription>Test the ORPC procedures</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Hello Test */}
          <div className="space-y-2">
            <Label htmlFor="name">Hello Test</Label>
            <div className="flex gap-2">
              <Input
                id="name"
                placeholder="Enter your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button onClick={testHello} disabled={loading}>
                Test Hello
              </Button>
            </div>
            {helloResult && (
              <p className="text-sm text-muted-foreground">{helloResult}</p>
            )}
          </div>

          {/* Math Tests */}
          <div className="space-y-2">
            <Label>Math Tests</Label>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
