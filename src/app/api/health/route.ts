import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Health endpoint
 * Runs a minimal DB query: SELECT true as healthy
 * Returns 200 with { healthy: true } when the query succeeds
 * Returns 503 with { healthy: false, error } when an error occurs
 */
export async function GET() {
  try {
    // Use the underlying node-postgres pool attached to the drizzle client.
    // We access the `client` property at runtime to execute a raw query.
    // (Using `any` avoids TypeScript issues if the drizzle type doesn't
    // expose `client` in types.)
    // If your setup exposes the pool differently, adapt accordingly.
    const client = (db as any).client;

    if (!client) {
      throw new Error("Database client not available");
    }

    // Execute a minimal health check query
    const res = await client.query("SELECT true as healthy");

    // If the query returned rows and the value is truthy, return healthy
    const healthy = Boolean(res?.rows?.[0]?.healthy);

    return NextResponse.json({ healthy }, { status: healthy ? 200 : 503 });
  } catch (error: any) {
    console.error("Health check failed:", error);

    return NextResponse.json(
      {
        healthy: false,
        error: String(error?.message ?? error),
      },
      { status: 503 },
    );
  }
}

// Provide HEAD for lightweight checks (returns same status, no body)
export async function HEAD() {
  try {
    const client = (db as any).client;
    if (!client) throw new Error("Database client not available");
    const res = await client.query("SELECT true as healthy");
    const healthy = Boolean(res?.rows?.[0]?.healthy);
    return new Response(null, { status: healthy ? 200 : 503 });
  } catch (error) {
    return new Response(null, { status: 503 });
  }
}
