"use client";

import { useEffect, useRef, useState } from "react";
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

interface EventData {
  message: string;
  timestamp: number;
  count: number;
}

export default function EventIteratorPage() {
  const [duration, setDuration] = useState("10");
  const [isStreaming, setIsStreaming] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  const [error, setError] = useState<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);

  const startStreaming = async () => {
    if (isStreaming) return;

    setIsStreaming(true);
    setEvents([]);
    setError("");
    abortControllerRef.current = new AbortController();

    try {
      const iterator = typedClient.eventIterator({
        duration: parseInt(duration, 10),
      });

      for await (const event of iterator) {
        if (abortControllerRef.current?.signal.aborted) {
          break;
        }

        setEvents((prev) => [...prev, event]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const stopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  };

  const clearEvents = () => {
    setEvents([]);
    setError("");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-5xl px-4 py-8 lg:px-16 lg:py-32">
        <div className="flex flex-col gap-6 items-start text-left mb-10">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Event Iterator
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Test Server-Sent Events (SSE) with oRPC event iterators. Stream
            real-time updates from the server.
          </p>
        </div>

        <div className="space-y-6">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Event Iterator Demo</CardTitle>
              <CardDescription>
                Start streaming events from the server. Each event contains a
                message, timestamp, and count.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (seconds)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="60"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Enter duration in seconds"
                  />
                  <p className="text-xs text-muted-foreground">
                    How long to stream events (1-60 seconds)
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={startStreaming}
                    disabled={isStreaming}
                    className="flex-1"
                  >
                    {isStreaming ? "Streaming..." : "Start Streaming"}
                  </Button>
                  <Button
                    onClick={stopStreaming}
                    disabled={!isStreaming}
                    variant="outline"
                  >
                    Stop
                  </Button>
                  <Button onClick={clearEvents} variant="outline">
                    Clear
                  </Button>
                </div>

                {error && (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    <p className="mb-2 font-medium">Error</p>
                    <p>{error}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="max-w-4xl">
            <CardHeader>
              <CardTitle>Event Stream</CardTitle>
              <CardDescription>
                Real-time events received from the server ({events.length}{" "}
                events)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {events.length === 0 ? (
                <p className="text-muted-foreground">
                  {isStreaming
                    ? "Waiting for events..."
                    : "No events received yet. Click 'Start Streaming' to begin."}
                </p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {events.map((event, _index) => (
                    <div
                      key={`${event.timestamp}-${event.count}`}
                      className="p-3 border rounded-lg bg-muted/50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm">
                          Event #{event.count}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm">{event.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
