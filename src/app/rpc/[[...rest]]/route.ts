import { OpenAPIGenerator } from "@orpc/openapi";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { onError } from "@orpc/server";
import {
  ResponseHeadersPlugin,
  SimpleCsrfProtectionHandlerPlugin,
} from "@orpc/server/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { auth } from "@/lib/auth";
import { orpcRouter } from "@/lib/orpc";

const handler = new OpenAPIHandler(orpcRouter, {
  plugins: [
    new ResponseHeadersPlugin(),
    new SimpleCsrfProtectionHandlerPlugin(),
  ],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

const openAPIGenerator = new OpenAPIGenerator({
  schemaConverters: [new ZodToJsonSchemaConverter()],
});

async function handleRequest(
  request: Request,
  { params }: { params: Promise<{ rest?: string[] }> },
) {
  const { rest } = await params;
  const restArray = rest || [];

  // Serve OpenAPI spec at /rpc/spec.json
  if (restArray.length === 1 && restArray[0] === "spec.json") {
    const spec = await openAPIGenerator.generate(orpcRouter, {
      info: {
        title: "ORPC Test Application",
        version: "1.0.0",
      },
      servers: [{ url: "/rpc" }],
    });

    return new Response(JSON.stringify(spec), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Serve Scalar API reference at /rpc (empty rest array)
  if (restArray.length === 0) {
    const html = `
      <!doctype html>
      <html>
        <head>
          <title>ORPC API Reference</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <div id="app"></div>

          <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
          <script>
            Scalar.createApiReference('#app', {
              url: '/rpc/spec.json',
            })
          </script>
        </body>
      </html>
    `;

    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  }

  // Extract user session from Better Auth
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { response } = await handler.handle(request, {
    prefix: "/rpc",
    context: {
      user: session?.user,
      session,
    } as Record<string, unknown>, // Provide authenticated user context
  });

  return response ?? new Response("Not found", { status: 404 });
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
